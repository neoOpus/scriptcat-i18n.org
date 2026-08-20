---
title: Sviluppare script con VSCode
---

ScriptCat offre un'estensione per VSCode che consente di scrivere script utente direttamente in VSCode. Dopo il salvataggio, le modifiche vengono sincronizzate automaticamente con ScriptCat nel browser — senza bisogno di copiare e incollare manualmente, migliorando notevolmente l'efficienza dello sviluppo.

## Prerequisiti

È necessario installare i seguenti due strumenti:

1. **Installare l'estensione ScriptCat nel browser** — Se non l'avete ancora fatto, seguite la guida [Avvio rapido](/docs/use/use/)
2. **Installare l'estensione ScriptCat in VSCode** — Cercate «[scriptcat-vscode](https://marketplace.visualstudio.com/items?itemName=CodFrm.scriptcat-vscode)» nel marketplace delle estensioni di VSCode oppure scaricatela dal [repository GitHub](https://github.com/scriptscat/scriptcat-vscode)

## Stabilire una connessione

Una volta installato, dovete collegare l'estensione ScriptCat del browser con VSCode:

1. Fate clic sull'icona di ScriptCat nel browser per aprire il pannello di gestione
2. Andate su **Strumenti > Strumenti di sviluppo**
3. Trovate **Collegamento automatico al servizio VSCode**, attivatelo e fate clic su **Collega**

Una volta connessi, viene stabilito un canale in tempo reale tra VSCode e ScriptCat.

## Sincronizzare gli script

Dopo aver stabilito la connessione, potete scegliere uno dei due modi per sincronizzare gli script:

### Opzione 1: Modalità di rilevamento automatico (consigliata)

1. In VSCode, premete `Ctrl + Shift + P` (`Cmd + Shift + P` su Mac) per aprire la tavolozza dei comandi
2. Digitate e selezionate `scriptcat.autoTarget`
3. D'ora in poi, ogni volta che aprite o salvate un file `.user.js`, verrà sincronizzato automaticamente con ScriptCat

### Opzione 2: Modalità script specifico

1. In VSCode, premete `Ctrl + Shift + P` (`Cmd + Shift + P` su Mac) per aprire la tavolozza dei comandi
2. Digitate e selezionate `scriptcat.target`
3. Specificate il percorso del file di script da sincronizzare

## Flusso di lavoro di sviluppo

Una volta configurato, il flusso di lavoro di sviluppo è molto semplice:

1. Scrivete o modificate il vostro script `.user.js` in VSCode
2. Premete `Ctrl + S` per salvare il file
3. Lo script viene sincronizzato automaticamente con ScriptCat nel browser
4. Passate al browser e aggiornate la pagina per vedere il risultato

L'intero processo non richiede passaggi manuali — il salvataggio ha effetto immediato.

## Domande frequenti

### E se non si connette?

- Assicuratevi che l'estensione ScriptCat nel browser sia in esecuzione
- Assicuratevi che l'estensione ScriptCat in VSCode sia installata e abilitata
- Controllate lo stato della connessione nella pagina «Strumenti di sviluppo» del pannello di gestione di ScriptCat

### Lo script non viene aggiornato dopo il salvataggio?

- Assicuratevi che il nome del file termini con `.user.js`
- Assicuratevi di aver eseguito il comando `scriptcat.autoTarget` o `scriptcat.target`
- Controllate il pannello di output di VSCode per eventuali messaggi di errore

### Devo ricollegarmi dopo aver riavviato VSCode?

Se «Collegamento automatico al servizio VSCode» è attivato, VSCode si ricollegherà automaticamente dopo un riavvio — non sono necessari passaggi manuali.
