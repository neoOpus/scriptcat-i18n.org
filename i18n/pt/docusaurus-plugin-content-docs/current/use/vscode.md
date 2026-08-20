---
title: Desenvolver scripts com VSCode
---

O ScriptCat oferece uma extensão para VSCode que permite escrever scripts de usuário no VSCode. Após salvar, as alterações são sincronizadas automaticamente com o ScriptCat no navegador — sem necessidade de copiar e colar manualmente, melhorando muito a eficiência do desenvolvimento.

## Pré-requisitos

Você precisa instalar as duas ferramentas a seguir:

1. **Instale a extensão do ScriptCat no navegador** — Se ainda não instalou, siga o guia de [Início rápido](/docs/use/use/)
2. **Instale a extensão do ScriptCat no VSCode** — Pesquise por «[scriptcat-vscode](https://marketplace.visualstudio.com/items?itemName=CodFrm.scriptcat-vscode)» no marketplace de extensões do VSCode ou baixe-a do [repositório do GitHub](https://github.com/scriptscat/scriptcat-vscode)

## Estabelecer uma conexão

Depois de instalado, você precisa conectar a extensão do ScriptCat do navegador com o VSCode:

1. Clique no ícone do ScriptCat no navegador para abrir o painel de gerenciamento
2. Vá para **Ferramentas > Ferramentas de desenvolvedor**
3. Encontre **Conectar automaticamente ao serviço do VSCode**, ative-o e clique em **Conectar**

Uma vez conectado, um canal em tempo real é estabelecido entre o VSCode e o ScriptCat.

## Sincronizar scripts

Após o estabelecimento da conexão, você pode escolher uma das duas formas de sincronizar scripts:

### Opção 1: Modo de detecção automática (recomendado)

1. No VSCode, pressione `Ctrl + Shift + P` (`Cmd + Shift + P` no Mac) para abrir a paleta de comandos
2. Digite e selecione `scriptcat.autoTarget`
3. A partir de então, toda vez que você abrir ou salvar um arquivo `.user.js`, ele será sincronizado automaticamente com o ScriptCat

### Opção 2: Modo de script especificado

1. No VSCode, pressione `Ctrl + Shift + P` (`Cmd + Shift + P` no Mac) para abrir a paleta de comandos
2. Digite e selecione `scriptcat.target`
3. Especifique o caminho do arquivo de script a ser sincronizado

## Fluxo de trabalho de desenvolvimento

Após a configuração, o fluxo de trabalho de desenvolvimento é muito simples:

1. Escreva ou edite seu script `.user.js` no VSCode
2. Pressione `Ctrl + S` para salvar o arquivo
3. O script é sincronizado automaticamente com o ScriptCat no navegador
4. Mude para o navegador e atualize a página para ver o resultado

Todo o processo não exige etapas manuais — salvar tem efeito imediato.

## Perguntas frequentes

### E se não conseguir conectar?

- Certifique-se de que a extensão do ScriptCat no navegador esteja em execução
- Certifique-se de que a extensão do ScriptCat no VSCode esteja instalada e habilitada
- Verifique o status da conexão na página «Ferramentas de desenvolvedor» do painel de gerenciamento do ScriptCat

### O script não é atualizado depois de salvar?

- Certifique-se de que o nome do arquivo termine com `.user.js`
- Certifique-se de ter executado o comando `scriptcat.autoTarget` ou `scriptcat.target`
- Verifique o painel de saída do VSCode para ver se há mensagens de erro

### Preciso reconectar depois de reiniciar o VSCode?

Se «Conectar automaticamente ao serviço do VSCode» estiver ativado, o VSCode se reconectará automaticamente após um reinício — nenhuma etapa manual é necessária.
