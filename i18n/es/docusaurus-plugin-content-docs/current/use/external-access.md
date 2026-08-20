---
title: Acceso externo (CLI y clientes de IA)
sidebar_label: Acceso externo
---

**Acceso externo** permite que los programas locales de línea de comandos y los clientes de IA con capacidad
[MCP](https://modelcontextprotocol.io/) gestionen scripts en ScriptCat a través de [sctl](https://github.com/scriptscat/sctl).

```text
AI client ── stdio MCP ──▶ sctl mcp ── local control API ──▶ sctl serve ── WebSocket ──▶ ScriptCat
CLI ────────────────────────────────────────────────────────▲
```

`sctl serve` es un demonio local independiente que debe iniciar explícitamente. `sctl mcp` y los comandos de solicitud
nunca lo inician automáticamente. Las políticas de ScriptCat y la interfaz de confirmación del navegador siempre deciden
si se permite la divulgación del código fuente o una escritura; un programa externo no puede aprobar su propia solicitud.

:::warning El listener es local por defecto
sctl escucha en `127.0.0.1` por defecto. Solo escucha en otra interfaz cuando se pasa `--listen-address` explícitamente.
`ws://` no cifra el tráfico de negocios y no hay aislamiento por cliente remoto, así que use una dirección no predeterminada
solo en una red de confianza. La extensión y el demonio aún establecen una clave a largo plazo mediante un código de emparejamiento
de un solo uso y usan autenticación mutua en las conexiones posteriores.
:::

## 1. Instalar sctl

Instale la última versión con un comando — macOS y Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.sh | sh
```

o Windows PowerShell:

```powershell
irm https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.ps1 | iex
```

El instalador descarga el archivo de la versión con guiones `sctl-<version>-<os>-<arch>.<ext>` para su plataforma,
verifica su sha256 contra `checksums.txt` de la misma versión e instala `sctl` en `~/.local/bin`
(macOS/Linux) o `%LOCALAPPDATA%\sctl\bin` (Windows). `SCTL_VERSION` fija una versión específica; `SCTL_INSTALL_DIR`
anula el directorio de instalación. Si el directorio de instalación no está en su `PATH`, el instalador imprime la
pista exacta de `PATH` para su plataforma — nunca edita su perfil de shell ni su `PATH` de usuario por usted.

sctl es un único ejecutable. Si [GitHub Releases](https://github.com/scriptscat/sctl/releases) tiene un archivo
publicado para su plataforma, también puede descargarlo y extraerlo, y luego poner `sctl` (`sctl.exe` en Windows) en
el `PATH`.

```bash
sctl version
```

Una compilación desde el código fuente reporta `0.0.0-dev` para distinguirla de una compilación de versión con
metadatos de versión, commit y tiempo de compilación inyectados; esto no impide que se conecte a ScriptCat. Si no hay
una versión disponible, los colaboradores pueden compilarla desde el [repositorio de sctl](https://github.com/scriptscat/sctl).

## 2. Iniciar el demonio e inscribirse

La inscripción es un paso único. Después, la CLI y cada cliente MCP comparten el canal de confianza entre la extensión
y el demonio; no se emparejan por separado.

### 2.1 Elegir un directorio de datos

El demonio, la CLI y el proceso MCP deben usar el mismo directorio de datos. Almacena la clave de emparejamiento a largo
plazo, el token de control local y los registros. Elija una ruta absoluta privada para el usuario actual:

```text
/absolute/path/to/sctl-data
```

Establezca la misma variable de entorno para cada proceso de sctl:

```bash
export SCTL_DATA_DIR=/absolute/path/to/sctl-data
sctl serve
sctl status
sctl mcp
```

Un `--data-dir` explícito tiene prioridad sobre la variable de entorno.

Si no se establece ni `--data-dir` ni `SCTL_DATA_DIR`, sctl usa el directorio de datos de aplicación predeterminado por
usuario de la plataforma. No coloque el directorio de datos en un repositorio ni en una carpeta de sincronización
compartida, y nunca entregue su `pairing.key` o `control.token` a un modelo de IA.

### 2.2 Iniciar el demonio

Ejecute esto en una terminal y mantenga el proceso vivo:

```bash
sctl serve
```

La dirección predeterminada es `ws://127.0.0.1:8643`. El demonio nunca se inicia automáticamente mediante `connect`,
`status`, otro comando de la CLI o `sctl mcp`. Para uso persistente, ejecute el comando anterior con el gestor de
servicios de usuario de su sistema operativo.

Para escuchar explícitamente en todas las interfaces de red, ejecute:

```bash
sctl --listen-address 0.0.0.0:8643 serve
```

En el host del demonio, pase el mismo `--listen-address` a `connect`, `status`, otros comandos de la CLI y `sctl mcp`.
En el ajuste de **dirección de sctl** de ScriptCat, introduzca una dirección que la extensión pueda alcanzar realmente,
como `ws://192.168.1.10:8643`; no introduzca `0.0.0.0`.

### 2.3 Activar y emparejar en ScriptCat

1. Abra **Configuración → Herramientas → Acceso externo** en ScriptCat y active el interruptor.
2. Confirme que la **dirección de sctl** coincide con el demonio; normalmente mantenga la predeterminada `ws://127.0.0.1:8643`.
3. Mantenga `sctl serve` en ejecución y ejecute en otra terminal:

   ```bash
   sctl connect
   ```

4. Introduzca el código de terminal de 8 caracteres en el diálogo «Inscribir sctl».
5. Verifique la conexión:

   ```bash
   sctl status
   ```

El estado debe informar de una extensión conectada y mostrar la versión del demonio.

:::warning El código de emparejamiento solo está en la terminal
El código tiene el aspecto `A1B2-C3D4`, caduca después de 2 minutos y funciona una sola vez. No se envía a la extensión a
través del WebSocket. Nunca lo pegue en un chat de IA, un issue, un registro o una configuración de MCP; ejecute `connect`
de nuevo si caduca.
:::

## 3. Permisos y confirmación {#permissions}

| Capacidad | Comportamiento predeterminado |
|---|---|
| Listar scripts y leer metadatos | Devolver directamente |
| Leer o buscar el código fuente del script | Seguir la política de **lectura de código fuente** |
| Instalar, editar, activar, desactivar o eliminar un script | Seguir la política de **escritura** |

Ambas políticas ofrecen «Requiere aprobación» (predeterminado) y «Permitir directamente».

Con «Requiere aprobación», las solicitudes abren una página de confirmación en el navegador. Puede rechazar, permitir una
vez o elegir «Permitir para esta sesión». Los permisos de sesión están vinculados por script y tipo de operación, y se
borran cuando el navegador se reinicia, la extensión se recarga o el Acceso externo se detiene. Una solicitud caduca después
de 5 minutos sin decisión; la desconexión del solicitante o `Ctrl-C` también la anula.

«Permitir directamente» omite la página de confirmación para esa clase de operación. El código fuente puede contener claves
de API, cookies y otros secretos, mientras que las escrituras pueden cambiar scripts directamente, así que actívelo solo si
acepta ese riesgo.

## 4. Uso desde la línea de comandos

```bash
sctl get                         # Listar scripts
sctl get <uuid>                  # Leer metadatos
sctl get <uuid> -o source        # Imprimir el código fuente completo
sctl get <uuid> -o source --lines 20-80
sctl grep <uuid> "fetch("         # Búsqueda literal de código fuente
sctl grep <uuid> "pattern" -E    # Expresión regular
sctl install <url|file>
sctl edit <uuid> --replace OLD --with NEW
sctl enable <uuid>
sctl disable <uuid>
sctl delete <uuid>
sctl status
```

`grep` es literal por defecto; `-E` activa expresiones regulares, `-i` ignora mayúsculas y minúsculas, `-C N` añade
contexto y `-m N` limita las coincidencias. Ninguna coincidencia se considera éxito y sale con el código 0.

`edit` está anclado al contenido, nunca basado en números de línea. Cada `oldText` debe aparecer exactamente una vez por
defecto; `--replace-all` reemplaza cada coincidencia. También puede pasar un array `{oldText,newText,replaceAll?}` con
`-f <file>`. Solo las ediciones se envían a la extensión; no es necesario leer ni cargar primero todo el código fuente.

Las escrituras y la divulgación del código fuente esperan una decisión del navegador. Códigos de salida de la CLI:

| Código de salida | Significado |
|---|---|
| `0` | Aprobado y exitoso, o un comando de lectura se completó normalmente |
| `1` | El usuario rechazó la solicitud |
| `2` | La solicitud caducó, se canceló con `Ctrl-C` o la extensión se desconectó |
| `3` | Otros errores como argumentos, conexión o script faltante |

Ejecute `sctl <command> --help` para conocer todas las opciones.

## 5. Conectar un cliente de IA (MCP)

Primero asegúrese de que `sctl serve` esté en ejecución y de que `status` informe de una extensión conectada. Luego
configure el cliente MCP para iniciar un proceso `sctl mcp` separado. Use rutas absolutas del binario y de datos en los
clientes GUI:

```json
{
  "mcpServers": {
    "scriptcat": {
      "command": "/absolute/path/to/sctl",
      "env": {
        "SCTL_DATA_DIR": "/absolute/path/to/sctl-data"
      },
      "args": [
        "mcp",
        "--name",
        "my-ai-client"
      ]
    }
  }
}
```

Muchas aplicaciones GUI no expanden `~`, `$HOME` ni expresiones de shell. `--name` es una etiqueta de auditoría, no una
identidad autenticada ni un límite de autorización. El stdout de MCP está reservado para marcos de protocolo; no envuelva
sctl en un script que imprima un banner en stdout.

Herramientas actuales:

| Herramienta | Propósito | Política de confirmación |
|---|---|---|
| `scripts_list` | Listar resúmenes de scripts | Ninguna |
| `scripts_metadata_get` | Leer los metadatos de un script | Ninguna |
| `scripts_source_get` | Leer el código fuente por uuid y ventana de líneas opcional | Política de lectura de código fuente |
| `scripts_source_grep` | Buscar en el código fuente y devolver líneas coincidentes | Política de lectura de código fuente |
| `scripts_install_request` | Solicitar la instalación de un script | Política de escritura |
| `scripts_edit_request` | Solicitar una edición anclada al contenido | Política de escritura |
| `scripts_toggle_request` | Solicitar activar o desactivar | Política de escritura |
| `scripts_delete_request` | Solicitar la eliminación | Política de escritura |

## 6. Auditoría y revocación

- «Ver registro de auditoría» en la tarjeta de Acceso externo abre la página de registros filtrada por esta fuente.
- `sctl status` muestra la versión del demonio, la conectividad de la extensión y los eventos de seguridad recientes; `-o json` devuelve los eventos completos.
- «Detener el acceso externo» desconecta, elimina el estado de emparejamiento del lado de la extensión y borra los permisos de sesión. Después se requiere volver a inscribirse.
- Para deshabilitar solo un cliente de IA, elimine sctl de la configuración MCP de ese cliente; esto no revoca el acceso de otros clientes o de la CLI.

## 7. Solución de problemas {#troubleshooting}

**El demonio es inalcanzable**

Ejecute `sctl serve` primero. Los comandos de solicitud nunca inician el demonio automáticamente.

**Falla la autenticación del canal de control**

Confirme que `serve`, los comandos de la CLI y el proceso MCP resuelven el mismo directorio de datos absoluto. Verifique
tanto `SCTL_DATA_DIR` como cualquier `--data-dir` explícito y reinicie el cliente MCP.

**El estado dice «Conexión fallida»**

Confirme que el demonio está en ejecución, que la dirección de la extensión coincide con él y que el software de seguridad
local no está bloqueando `127.0.0.1:8643`.

**Un comando no devuelve resultados**

Revise el navegador por si hay una página de confirmación de divulgación de código fuente o de escritura. Presione `Ctrl-C`
para anular la solicitud.

**Encontrar registros**

Los registros están en `<data-dir>/logs/`. Si no se establece ni `--data-dir` ni `SCTL_DATA_DIR`, los valores
predeterminados son:

| Plataforma | Directorio de registros |
|---|---|
| macOS | `~/Library/Application Support/sctl/logs/` |
| Windows | `%LOCALAPPDATA%\sctl\logs\` |
| Linux | `~/.config/sctl/logs/` |
