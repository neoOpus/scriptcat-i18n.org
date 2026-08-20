---
slug: /use/use
title: Avvio rapido
---

ScriptCat è un'estensione del browser in grado di eseguire script utente, compatibile con gli script di Tampermonkey e offre ulteriori funzionalità. Se trovate bug o avete suggerimenti, potete visitare il [Repository GitHub](https://github.com/scriptscat/scriptcat) per inviare un feedback.

## Installare l'estensione

Potete installare l'estensione dai seguenti store di estensioni:

| Browser       | Collegamento allo store                                                                                                                                                                                                                      | Stato         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Chrome        | [Versione stabile](https://chrome.google.com/webstore/detail/scriptcat/ndcooeababalnlpkfedmmbbbgkljhpjf) [Versione beta](https://chromewebstore.google.com/detail/%E8%84%9A%E6%9C%AC%E7%8C%AB-beta/jaehimmlecjmebpekkipmpmbpfhdacom?authuser=0&hl=zh-CN) | ✅ Disponibile  |
| Edge          | [Versione stabile](https://microsoftedge.microsoft.com/addons/detail/scriptcat/liilgpjgabokdklappibcjfablkpcekh) [Versione beta](https://microsoftedge.microsoft.com/addons/detail/scriptcat-beta/nimmbghgpcjmeniofmpdfkofcedcjpfi)                      | ✅ Disponibile  |
| Firefox       | [Versione stabile](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat/) [Versione beta](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat-pre/)                                                                                             | ✅ MV2         |

### Altri browser

Se il vostro browser non è nell'elenco precedente, potete scaricare il file `zip`/`crx` dalla pagina di [Github Release](https://github.com/scriptscat/scriptcat/releases) e installarlo manualmente.

### Installazione dell'estensione non pacchettizzata {#load-unpacked-extension-installation}

① Per prima cosa scaricate il file `zip` dalla pagina di [Github Release](https://github.com/scriptscat/scriptcat/releases) o [Download dalla community](https://bbs.tampermonkey.net.cn/thread-3068-1-1.html). Se si tratta di un file `crx`, cambiatene l'estensione in `zip`.

② Preparate una cartella per conservare il plugin ed estraete il file zip sopra indicato in quella cartella. Dopo l'estrazione, dovrebbe apparire così (**Nota: questa cartella non può essere eliminata o spostata, altrimenti l'estensione non funzionerà correttamente**) ![download-zip](./use.assets/download-zip.webp)

③ Aprite l'interfaccia di gestione delle estensioni del browser per caricare l'estensione non pacchettizzata (consultate [Abilitare la modalità sviluppatore per supportare manifest v3 ScriptCat](/docs/use/open-dev/) per attivare prima la modalità sviluppatore)

- 1. **Edge** ![edge-load-unpacked](./use.assets/edge-load-unpacked.webp)
- 2. **Chrome** ![chrome-load-unpacked](./use.assets/chrome-load-unpacked.webp)

④ Selezionate la cartella creata nel passaggio ② (al termine del caricamento, l'icona di ScriptCat apparirà nell'elenco delle estensioni nell'interfaccia di gestione delle estensioni; potete vederla anche facendo clic sul pulsante delle estensioni nell'angolo in alto a destra della barra degli indirizzi del browser)

- 1. **Edge** ![edge-load-unpacked-img](./use.assets/edge-load-unpacked-img.webp)
- 2. **Chrome** ![chrome-load-unpacked-img](./use.assets/chrome-load-unpacked-img.webp)

⑤ Fate clic sull'icona di ScriptCat nell'angolo in alto a destra, fate clic su `┆` > Ottieni script nell'angolo in alto a destra dell'interfaccia che appare e potrete andare al sito degli script per cercare e installare gli script.

Nota: le estensioni installate in questo modo non possono essere aggiornate automaticamente. Se avete bisogno di aggiornare, ripetete i passaggi precedenti per aggiornare l'estensione (sostituite i file e ricaricatela una volta).


## Ottenere script

> Oltre agli script, potete ottenere informazioni e tutorial sugli script dal [Forum cinese di Tampermonkey](https://bbs.tampermonkey.net.cn/) e dalla [Guida allo sviluppo di script](https://learn.scriptcat.org/).

### Sito di script di ScriptCat

Il [Sito di script di ScriptCat](https://scriptcat.org/) è il sito di script di questa estensione, dove potete pubblicare gli script che scrivete.

- Nuovo sito di script
- Script in background/script pianificati
- Interfaccia intuitiva

### Ricerca Userscript.Zone

La [Ricerca Userscript.Zone](https://www.userscript.zone/?utm_source=tm.net&utm_medium=scripts) è un nuovo sito web che consente di cercare script utente inserendo URL o domini appropriati.

- Grande quantità di risorse di script
- Facile trovare script utente adatti
- Mostra solo script utente provenienti da pagine di script utente recensite o almeno da pagine con funzionalità di commento

### GreasyFork

[GreasyFork](https://greasyfork.org/) è una piattaforma ampiamente utilizzata per ospitare e condividere script utente, che consente agli sviluppatori di pubblicare e agli utenti di installare script basati sul browser che migliorano o modificano la funzionalità dei siti web. Il sito è stato creato da Jason Barnabe ed è noto per l'enfasi su sicurezza e trasparenza open source, offrendo una vasta collezione di script per migliorare l'esperienza di navigazione.

Jason Barnabe è anche il creatore originale dell'estensione del browser Stylish. Tuttavia, [Stylish](https://userstyles.org/) è stata venduta nel 2016 ed è ora gestita da un'azienda diversa, senza alcun coinvolgimento diretto di Jason Barnabe nel suo sviluppo successivo.

- Grande quantità di risorse di script
- Ha la capacità di sincronizzare gli script da Github
- Modello di [sviluppo open source](https://github.com/JasonBarnabe/greasyfork) molto attivo

### GitHub/Gist

Potete [cercare risorse di script in Github e Gist.](https://gist.github.com/search?l=JavaScript&o=desc&q="%3D%3DUserScript%3D%3D"&s=updated)

## Tour di benvenuto

Dopo aver installato ScriptCat, l'apertura della dashboard avvierà automaticamente il tour di benvenuto (potete anche riaprirlo in qualsiasi momento dal "Centro assistenza" nella barra laterale sinistra). Il tour copre:

- [Installare script](/docs/use/script_installation/): installazione dai marketplace di script, incluso il supporto per [script in background](/docs/dev/background/).
- Gestire e operare: modificare, eseguire/interrompere, [UserConfig](/docs/dev/config/).
- [Backup](/docs/use/sync/) e [migrazione da altri gestori](/docs/use/from-other/migrate-from-tampermonkey/).
- [Sincronizzazione degli script](/docs/use/sync/).
- [Abbonamenti](/docs/dev/subscribe/).
