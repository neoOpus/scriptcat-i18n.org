---
title: Domande frequenti
---

## Modalità sviluppatore / Permessi degli script utente

#### D: ScriptCat mostra «Modalità sviluppatore non abilitata» e gli script non vengono eseguiti?

A partire da Chrome 120+ e versioni più recenti di Edge, i browser richiedono agli utenti di abilitare manualmente i permessi affinché gli script possano essere eseguiti. Fare riferimento a [Abilitare il supporto agli script utente del browser](/docs/use/open-dev/) per le istruzioni di configurazione.

Se è già abilitata ma l'avviso persiste, provare a riavviare il browser o a ricaricare l'estensione.

## Gli script non funzionano

#### D: Ho installato uno script ma non ha alcun effetto?

1. **«Consenti script utente» non abilitato** — Vedere [Abilitare il supporto agli script utente del browser](/docs/use/open-dev/)
2. **Avvio a freddo** — Gli script potrebbero non caricarsi immediatamente alla prima apertura del browser. Provare ad aggiornare la pagina
3. **Conflitti di estensioni** — I blocca-pubblicità (es. uBlock Origin) possono causare errori negli script

#### D: Lo script funziona in Tampermonkey ma non in ScriptCat?

ScriptCat e Tampermonkey presentano alcune differenze nell'implementazione delle API. Aggiornare all'ultima versione. Se il problema persiste, aprire un Issue su [GitHub](https://github.com/scriptscat/scriptcat/issues).

## Problemi di sincronizzazione cloud

> Per l'uso di base della sincronizzazione, vedere [Sincronizzazione e backup](/docs/use/sync/).

#### D: Problemi con la sincronizzazione OneDrive / Google Drive / WebDAV?

1. **Gli script eliminati ricompaiono** — Assicurarsi che la «sincronizzazione delle eliminazioni» sia abilitata su tutti i dispositivi

## Problemi di installazione degli script

> Per sapere come installare gli script, vedere [Installare script](/docs/use/script_installation/).

## Problemi di autorizzazione dei cookie

#### D: GM_cookie non riesce a ottenere i cookie?

1. **Il popup di autorizzazione non appare** — Assicurarsi che `GM_cookie` sia dichiarato correttamente nel `@grant` dello script e usare `@connect` per dichiarare i domini a cui si deve accedere

## Perdita di dati degli script

#### D: Tutti gli script sono scomparsi dopo aver aperto il browser?

1. **Ritardo di inizializzazione** — ScriptCat potrebbe essere ancora in fase di caricamento dei dati all'avvio del browser. Attendere qualche secondo o riavviare il browser
2. **Software di pulizia** — Strumenti come 360 Security Guard o CCleaner possono cancellare i dati delle estensioni. Escludere i dati delle estensioni del browser nelle impostazioni di pulizia
3. **Backup regolari consigliati** — Usare la funzione di esportazione o la [sincronizzazione cloud](/docs/use/sync/) per eseguire regolarmente il backup di script e impostazioni
