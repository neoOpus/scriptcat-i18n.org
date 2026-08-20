---
title: Desarrollar scripts con VSCode
---

ScriptCat ofrece una extensión de VSCode que le permite escribir scripts de usuario en VSCode. Después de guardar, los cambios se sincronizan automáticamente con ScriptCat en el navegador — sin necesidad de copiar y pegar manualmente, lo que mejora enormemente la eficiencia del desarrollo.

## Requisitos previos

Debe instalar las siguientes dos herramientas:

1. **Instale la extensión de ScriptCat en su navegador** — Si aún no la ha instalado, siga la guía de [Inicio rápido](/docs/use/use/)
2. **Instale la extensión de ScriptCat en VSCode** — Busque «[scriptcat-vscode](https://marketplace.visualstudio.com/items?itemName=CodFrm.scriptcat-vscode)» en el mercado de extensiones de VSCode, o descárguela del [repositorio de GitHub](https://github.com/scriptscat/scriptcat-vscode)

## Establecer una conexión

Una vez instalado, debe conectar la extensión de ScriptCat de su navegador con VSCode:

1. Haga clic en el icono de ScriptCat en su navegador para abrir el panel de gestión
2. Vaya a **Herramientas > Herramientas de desarrollador**
3. Busque **Conectar automáticamente al servicio de VSCode**, actívelo y haga clic en **Conectar**

Una vez conectado, se establece un canal en tiempo real entre VSCode y ScriptCat.

## Sincronizar scripts

Después de establecer la conexión, puede elegir una de dos formas de sincronizar scripts:

### Opción 1: Modo de detección automática (recomendado)

1. En VSCode, presione `Ctrl + Shift + P` (`Cmd + Shift + P` en Mac) para abrir la paleta de comandos
2. Escriba y seleccione `scriptcat.autoTarget`
3. A partir de entonces, cada vez que abra o guarde un archivo `.user.js`, se sincronizará automáticamente con ScriptCat

### Opción 2: Modo de script especificado

1. En VSCode, presione `Ctrl + Shift + P` (`Cmd + Shift + P` en Mac) para abrir la paleta de comandos
2. Escriba y seleccione `scriptcat.target`
3. Especifique la ruta del archivo de script a sincronizar

## Flujo de trabajo de desarrollo

Una vez configurado, el flujo de trabajo de desarrollo es muy sencillo:

1. Escriba o edite su script `.user.js` en VSCode
2. Presione `Ctrl + S` para guardar el archivo
3. El script se sincroniza automáticamente con ScriptCat en el navegador
4. Cambie al navegador y actualice la página para ver el resultado

Todo el proceso no requiere pasos manuales — guardar surte efecto de inmediato.

## Preguntas frecuentes

### ¿Qué pasa si no se conecta?

- Asegúrese de que la extensión de ScriptCat de su navegador esté en ejecución
- Asegúrese de que la extensión de ScriptCat en VSCode esté instalada y habilitada
- Verifique el estado de la conexión en la página «Herramientas de desarrollador» del panel de gestión de ScriptCat

### ¿El script no se actualiza después de guardar?

- Asegúrese de que el nombre del archivo termine en `.user.js`
- Asegúrese de haber ejecutado el comando `scriptcat.autoTarget` o `scriptcat.target`
- Revise el panel de salida de VSCode para ver si hay mensajes de error

### ¿Necesito reconectar después de reiniciar VSCode?

Si «Conectar automáticamente al servicio de VSCode» está activado, VSCode se reconectará automáticamente después de un reinicio — no se requieren pasos manuales.
