---
slug: /use/use
title: Schnellstart
---

ScriptCat ist eine Browsererweiterung, die Benutzerskripte ausführen kann, mit Tampermonkey-Skripten kompatibel ist und weitere Funktionen bietet. Wenn Sie Fehler finden oder Vorschläge haben, können Sie das [GitHub-Repository](https://github.com/scriptscat/scriptcat) besuchen, um Feedback zu geben.

## Erweiterung installieren

Sie können die Erweiterung aus den folgenden Erweiterungs-Shops installieren:

| Browser         | Shop-Link                                                                                                                                                                                                                                     | Status         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Chrome          | [Stabile Version](https://chrome.google.com/webstore/detail/scriptcat/ndcooeababalnlpkfedmmbbbgkljhpjf) [Beta-Version](https://chromewebstore.google.com/detail/%E8%84%9A%E6%9C%AC%E7%8C%AB-beta/jaehimmlecjmebpekkipmpmbpfhdacom?authuser=0&hl=zh-CN) | ✅ Verfügbar    |
| Edge            | [Stabile Version](https://microsoftedge.microsoft.com/addons/detail/scriptcat/liilgpjgabokdklappibcjfablkpcekh) [Beta-Version](https://microsoftedge.microsoft.com/addons/detail/scriptcat-beta/nimmbghgpcjmeniofmpdfkofcedcjpfi)                      | ✅ Verfügbar    |
| Firefox         | [Stabile Version](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat/) [Beta-Version](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat-pre/)                                                                                             | ✅ MV2         |

### Andere Browser

Wenn Ihr Browser nicht in der obigen Liste enthalten ist, können Sie die `zip`/`crx`-Datei von der Seite [Github Release](https://github.com/scriptscat/scriptcat/releases) herunterladen und manuell installieren.

### Entpackte Erweiterung laden {#load-unpacked-extension-installation}

① Laden Sie zunächst die `zip`-Datei von der Seite [Github Release](https://github.com/scriptscat/scriptcat/releases) oder [Community-Download](https://bbs.tampermonkey.net.cn/thread-3068-1-1.html) herunter. Wenn es sich um eine `crx`-Datei handelt, ändern Sie deren Endung in `zip`.

② Bereiten Sie einen Ordner für die Speicherung des Plugins vor und entpacken Sie die obige zip-Datei in diesen Ordner. Nach dem Entpacken sollte es so aussehen (**Hinweis: Dieser Ordner darf nicht gelöscht oder verschoben werden, da die Erweiterung sonst nicht ordnungsgemäß funktioniert**) ![download-zip](./use.assets/download-zip.webp)

③ Öffnen Sie die Erweiterungsverwaltung des Browsers, um die entpackte Erweiterung zu laden (siehe [Entwicklermodus aktivieren für manifest v3 ScriptCat](/docs/use/open-dev/), um zuerst den Entwicklermodus zu aktivieren)

- 1. **Edge** ![edge-load-unpacked](./use.assets/edge-load-unpacked.webp)
- 2. **Chrome** ![chrome-load-unpacked](./use.assets/chrome-load-unpacked.webp)

④ Wählen Sie den in Schritt ② erstellten Ordner aus (nach Abschluss des Ladens erscheint das ScriptCat-Symbol in der Erweiterungsliste der Erweiterungsverwaltung; Sie können es auch sehen, indem Sie auf die Erweiterungsschaltfläche in der oberen rechten Ecke der Adressleiste des Browsers klicken)

- 1. **Edge** ![edge-load-unpacked-img](./use.assets/edge-load-unpacked-img.webp)
- 2. **Chrome** ![chrome-load-unpacked-img](./use.assets/chrome-load-unpacked-img.webp)

⑤ Klicken Sie oben rechts auf das ScriptCat-Symbol, klicken Sie in der erscheinenden Oberfläche oben rechts auf `┆` > Skripte abrufen, und Sie können zur Skriptseite gehen, um Skripte zu suchen und zu installieren.

Hinweis: Auf diese Weise installierte Erweiterungen können nicht automatisch aktualisiert werden. Wenn Sie aktualisieren möchten, wiederholen Sie bitte die obigen Schritte, um die Erweiterung zu aktualisieren (Dateien ersetzen und einmal neu laden).


## Skripte abrufen

> Neben Skripten können Sie auch einige Skriptinformationen und Tutorials aus dem [Tampermonkey-Chinesischen Forum](https://bbs.tampermonkey.net.cn/) und dem [Skript-Entwicklungsleitfaden](https://learn.scriptcat.org/) erhalten.

### ScriptCat-Skriptseite

Die [ScriptCat-Skriptseite](https://scriptcat.org/) ist die Skriptseite dieser Erweiterung, auf der Sie selbst geschriebene Skripte veröffentlichen können.

- Neue Skriptseite
- Hintergrundskripte/geplante Skripte
- Benutzerfreundliche Oberfläche

### Userscript.Zone-Suche

Die [Userscript.Zone-Suche](https://www.userscript.zone/?utm_source=tm.net&utm_medium=scripts) ist eine neue Website, mit der Sie Benutzerskripte suchen können, indem Sie geeignete URLs oder Domains eingeben.

- Große Menge an Skriptressourcen
- Einfach geeignete Benutzerskripte finden
- Zeigt nur Benutzerskripte von geprüften Benutzerskriptseiten oder zumindest von Seiten mit Kommentarfunktion

### GreasyFork

[GreasyFork](https://greasyfork.org/) ist eine weit verbreitete Plattform zum Hosten und Teilen von Benutzerskripten, auf der Entwickler Skripte veröffentlichen und Benutzer browserbasierte Skripte installieren können, die die Funktionalität von Websites erweitern oder verändern. Die Website wurde von Jason Barnabe erstellt und ist für ihren Fokus auf Sicherheit und Open-Source-Transparenz bekannt; sie bietet eine große Sammlung von Skripten zur Verbesserung des Browsing-Erlebnisses.

Jason Barnabe ist auch der ursprüngliche Ersteller der Browsererweiterung Stylish. [Stylish](https://userstyles.org/) wurde jedoch 2016 verkauft und wird heute von einem anderen Unternehmen betrieben, ohne direkte Beteiligung von Jason Barnabe an der späteren Entwicklung.

- Große Menge an Skriptressourcen
- Verfügt über die Möglichkeit, Skripte von Github zu synchronisieren
- Sehr aktives [Open-Source-Entwicklungsmodell](https://github.com/JasonBarnabe/greasyfork)

### GitHub/Gist

Sie können [Skriptressourcen in Github und Gist suchen.](https://gist.github.com/search?l=JavaScript&o=desc&q="%3D%3DUserScript%3D%3D"&s=updated)

## Onboarding-Tour

Nach der Installation von ScriptCat startet das Öffnen des Dashboards automatisch die Onboarding-Tour (Sie können sie jederzeit über „Hilfezentrum" in der linken Seitenleiste erneut öffnen). Die Tour umfasst:

- [Skripte installieren](/docs/use/script_installation/): Installation aus Skript-Marktplätzen, einschließlich Unterstützung für [Hintergrundskripte](/docs/dev/background/).
- Verwalten und bedienen: Bearbeiten, Ausführen/Stoppen, [UserConfig](/docs/dev/config/).
- [Backup](/docs/use/sync/) und [Migration von anderen Managern](/docs/use/from-other/migrate-from-tampermonkey/).
- [Skript-Synchronisierung](/docs/use/sync/).
- [Abonnements](/docs/dev/subscribe/).
