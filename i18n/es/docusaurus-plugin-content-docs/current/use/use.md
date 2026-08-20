---
slug: /use/use
title: Inicio rápido
---

ScriptCat es una extensión de navegador que puede ejecutar scripts de usuario, es compatible con los scripts de Tampermonkey y ofrece más funciones. Si encuentra errores o tiene sugerencias, puede visitar el [Repositorio de GitHub](https://github.com/scriptscat/scriptcat) para enviar comentarios.

## Instalar la extensión

Puede instalar la extensión desde las siguientes tiendas de extensiones:

| Navegador     | Enlace de la tienda                                                                                                                                                                                                                          | Estado         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Chrome        | [Versión estable](https://chrome.google.com/webstore/detail/scriptcat/ndcooeababalnlpkfedmmbbbgkljhpjf) [Versión beta](https://chromewebstore.google.com/detail/%E8%84%9A%E6%9C%AC%E7%8C%AB-beta/jaehimmlecjmebpekkipmpmbpfhdacom?authuser=0&hl=zh-CN) | ✅ Disponible   |
| Edge          | [Versión estable](https://microsoftedge.microsoft.com/addons/detail/scriptcat/liilgpjgabokdklappibcjfablkpcekh) [Versión beta](https://microsoftedge.microsoft.com/addons/detail/scriptcat-beta/nimmbghgpcjmeniofmpdfkofcedcjpfi)                      | ✅ Disponible   |
| Firefox       | [Versión estable](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat/) [Versión beta](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat-pre/)                                                                                             | ✅ MV2         |

### Otros navegadores

Si su navegador no aparece en la lista anterior, puede descargar el archivo `zip`/`crx` desde la página de [Github Release](https://github.com/scriptscat/scriptcat/releases) e instalarlo manualmente.

### Instalación de la extensión sin empaquetar {#load-unpacked-extension-installation}

① Primero descargue el archivo `zip` desde la página de [Github Release](https://github.com/scriptscat/scriptcat/releases) o [Descarga de la comunidad](https://bbs.tampermonkey.net.cn/thread-3068-1-1.html). Si es un archivo `crx`, cambie su extensión a `zip`.

② Prepare una carpeta para almacenar el plugin y extraiga el archivo zip anterior en esa carpeta. Después de la extracción, debería verse así (**Nota: Esta carpeta no se puede eliminar ni mover, de lo contrario la extensión no funcionará correctamente**) ![download-zip](./use.assets/download-zip.webp)

③ Abra la interfaz de gestión de extensiones del navegador para cargar la extensión sin empaquetar (consulte [Habilitar el modo desarrollador para admitir manifest v3 ScriptCat](/docs/use/open-dev/) para activar primero el modo desarrollador)

- 1. **Edge** ![edge-load-unpacked](./use.assets/edge-load-unpacked.webp)
- 2. **Chrome** ![chrome-load-unpacked](./use.assets/chrome-load-unpacked.webp)

④ Seleccione la carpeta creada en el paso ② (después de completar la carga, el icono de ScriptCat aparecerá en la lista de extensiones de la interfaz de gestión de extensiones, y también puede verlo haciendo clic en el botón de extensiones en la esquina superior derecha de la barra de direcciones del navegador)

- 1. **Edge** ![edge-load-unpacked-img](./use.assets/edge-load-unpacked-img.webp)
- 2. **Chrome** ![chrome-load-unpacked-img](./use.assets/chrome-load-unpacked-img.webp)

⑤ Haga clic en el icono de ScriptCat en la esquina superior derecha, haga clic en `┆` > Obtener scripts en la esquina superior derecha de la interfaz que aparece, y podrá ir al sitio de scripts para buscar e instalar scripts.

Nota: Las extensiones instaladas de esta manera no pueden actualizarse automáticamente. Si necesita actualizar, repita los pasos anteriores para actualizar la extensión (reemplace los archivos y vuelva a cargar una vez).


## Obtener scripts

> Además de los scripts, también puede obtener información y tutoriales sobre scripts del [Foro chino de Tampermonkey](https://bbs.tampermonkey.net.cn/) y de la [Guía de desarrollo de scripts](https://learn.scriptcat.org/).

### Sitio de scripts de ScriptCat

El [Sitio de scripts de ScriptCat](https://scriptcat.org/) es el sitio de scripts de esta extensión, donde puede publicar los scripts que escriba.

- Nuevo sitio de scripts
- Scripts en segundo plano/scripts programados
- Interfaz fácil de usar

### Búsqueda de Userscript.Zone

La [Búsqueda de Userscript.Zone](https://www.userscript.zone/?utm_source=tm.net&utm_medium=scripts) es un nuevo sitio web que permite buscar scripts de usuario ingresando las URL o dominios apropiados.

- Gran cantidad de recursos de scripts
- Fácil encontrar scripts de usuario adecuados
- Solo muestra scripts de usuario de páginas revisadas o, al menos, de páginas con funcionalidad de comentarios

### GreasyFork

[GreasyFork](https://greasyfork.org/) es una plataforma ampliamente utilizada para alojar y compartir scripts de usuario, que permite a los desarrolladores publicar y a los usuarios instalar scripts basados en el navegador que mejoran o modifican la funcionalidad de los sitios web. El sitio fue creado por Jason Barnabe y es conocido por su énfasis en la seguridad y la transparencia de código abierto, y ofrece una gran colección de scripts para mejorar la experiencia de navegación.

Jason Barnabe también es el creador original de la extensión de navegador Stylish. Sin embargo, [Stylish](https://userstyles.org/) se vendió en 2016 y ahora es operado por una empresa diferente, sin participación directa de Jason Barnabe en su desarrollo posterior.

- Gran cantidad de recursos de scripts
- Tiene la capacidad de sincronizar scripts desde Github
- Modelo de [desarrollo de código abierto](https://github.com/JasonBarnabe/greasyfork) muy activo

### GitHub/Gist

Puede [buscar recursos de scripts en Github y Gist.](https://gist.github.com/search?l=JavaScript&o=desc&q="%3D%3DUserScript%3D%3D"&s=updated)

## Recorrido de bienvenida

Después de instalar ScriptCat, abrir el panel de control iniciará automáticamente el recorrido de bienvenida (también puede volver a abrirlo en cualquier momento desde el "Centro de ayuda" en la barra lateral izquierda). El recorrido cubre:

- [Instalar scripts](/docs/use/script_installation/): instalación desde mercados de scripts, incluido el soporte de [scripts en segundo plano](/docs/dev/background/).
- Administrar y operar: editar, ejecutar/detener, [UserConfig](/docs/dev/config/).
- [Copia de seguridad](/docs/use/sync/) y [migración desde otros administradores](/docs/use/from-other/migrate-from-tampermonkey/).
- [Sincronización de scripts](/docs/use/sync/).
- [Suscripciones](/docs/dev/subscribe/).
