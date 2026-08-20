---
title: Preguntas frecuentes
---

## Modo desarrollador / Permisos de scripts de usuario

#### P: ScriptCat muestra «Modo desarrollador no habilitado» y los scripts no se ejecutan?

A partir de Chrome 120+ y versiones más recientes de Edge, los navegadores exigen que los usuarios activen manualmente los permisos para que los scripts se ejecuten. Consulte [Habilitar la compatibilidad con scripts de usuario del navegador](/docs/use/open-dev/) para las instrucciones de configuración.

Si ya está habilitado pero la advertencia persiste, intente reiniciar el navegador o recargar la extensión.

## Los scripts no funcionan

#### P: Instalé un script pero no tiene efecto?

1. **«Permitir scripts de usuario» no habilitado** — Consulte [Habilitar la compatibilidad con scripts de usuario del navegador](/docs/use/open-dev/)
2. **Arranque en frío** — Los scripts pueden no cargarse inmediatamente al abrir el navegador por primera vez. Intente actualizar la página
3. **Conflictos de extensiones** — Los bloqueadores de anuncios (p. ej., uBlock Origin) pueden causar errores en los scripts

#### P: El script funciona en Tampermonkey pero no en ScriptCat?

ScriptCat y Tampermonkey tienen algunas diferencias en la implementación de la API. Actualice a la versión más reciente. Si el problema persiste, presente un Issue en [GitHub](https://github.com/scriptscat/scriptcat/issues).

## Problemas de sincronización en la nube

> Para el uso básico de la sincronización, consulte [Sincronización y copia de seguridad](/docs/use/sync/).

#### P: ¿Problemas con la sincronización de OneDrive / Google Drive / WebDAV?

1. **Los scripts eliminados reaparecen** — Asegúrese de que «sincronización de eliminaciones» esté habilitada en todos los dispositivos

## Problemas de instalación de scripts

> Para saber cómo instalar scripts, consulte [Instalar scripts](/docs/use/script_installation/).

## Problemas de autorización de cookies

#### P: ¿GM_cookie no puede obtener cookies?

1. **La ventana emergente de autorización no aparece** — Asegúrese de que `GM_cookie` esté declarado correctamente en el `@grant` del script y use `@connect` para declarar los dominios a los que se necesita acceder

## Pérdida de datos de scripts

#### P: ¿Todos los scripts desaparecieron después de abrir el navegador?

1. **Retraso de inicialización** — ScriptCat puede seguir cargando datos cuando el navegador se inicia. Espere unos segundos o reinicie el navegador
2. **Software de limpieza** — Herramientas como 360 Security Guard o CCleaner pueden borrar los datos de las extensiones. Excluya los datos de las extensiones del navegador en la configuración de limpieza
3. **Se recomiendan copias de seguridad periódicas** — Use la función de exportación o la [sincronización en la nube](/docs/use/sync/) para respaldar regularmente scripts y ajustes
