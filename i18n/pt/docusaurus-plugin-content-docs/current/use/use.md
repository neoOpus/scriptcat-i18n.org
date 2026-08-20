---
slug: /use/use
title: Início rápido
---

O ScriptCat é uma extensão de navegador que pode executar scripts de usuário, é compatível com os scripts do Tampermonkey e oferece mais recursos. Se você encontrar bugs ou tiver sugestões, pode visitar o [Repositório do GitHub](https://github.com/scriptscat/scriptcat) para enviar comentários.

## Instalar a extensão

Você pode instalar a extensão nas seguintes lojas de extensões:

| Navegador     | Link da loja                                                                                                                                                                                                                               | Status         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| Chrome        | [Versão estável](https://chrome.google.com/webstore/detail/scriptcat/ndcooeababalnlpkfedmmbbbgkljhpjf) [Versão beta](https://chromewebstore.google.com/detail/%E8%84%9A%E6%9C%AC%E7%8C%AB-beta/jaehimmlecjmebpekkipmpmbpfhdacom?authuser=0&hl=zh-CN) | ✅ Disponível   |
| Edge          | [Versão estável](https://microsoftedge.microsoft.com/addons/detail/scriptcat/liilgpjgabokdklappibcjfablkpcekh) [Versão beta](https://microsoftedge.microsoft.com/addons/detail/scriptcat-beta/nimmbghgpcjmeniofmpdfkofcedcjpfi)                      | ✅ Disponível   |
| Firefox       | [Versão estável](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat/) [Versão beta](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat-pre/)                                                                                             | ✅ MV2         |

### Outros navegadores

Se o seu navegador não estiver na lista acima, você pode baixar o arquivo `zip`/`crx` da página de [Github Release](https://github.com/scriptscat/scriptcat/releases) e instalá-lo manualmente.

### Instalação da extensão não empacotada {#load-unpacked-extension-installation}

① Primeiro, baixe o arquivo `zip` da página de [Github Release](https://github.com/scriptscat/scriptcat/releases) ou [Download da comunidade](https://bbs.tampermonkey.net.cn/thread-3068-1-1.html). Se for um arquivo `crx`, altere a extensão dele para `zip`.

② Prepare uma pasta para armazenar o plugin e extraia o arquivo zip acima para essa pasta. Após a extração, deve ficar assim (**Observação: esta pasta não pode ser excluída ou movida, caso contrário a extensão não funcionará corretamente**) ![download-zip](./use.assets/download-zip.webp)

③ Abra a interface de gerenciamento de extensões do navegador para carregar a extensão não empacotada (consulte [Habilitar o modo desenvolvedor para suportar manifest v3 ScriptCat](/docs/use/open-dev/) para ativar primeiro o modo desenvolvedor)

- 1. **Edge** ![edge-load-unpacked](./use.assets/edge-load-unpacked.webp)
- 2. **Chrome** ![chrome-load-unpacked](./use.assets/chrome-load-unpacked.webp)

④ Selecione a pasta criada na etapa ② (após a conclusão do carregamento, o ícone do ScriptCat aparecerá na lista de extensões da interface de gerenciamento de extensões, e você também pode vê-lo clicando no botão de extensões no canto superior direito da barra de endereços do navegador)

- 1. **Edge** ![edge-load-unpacked-img](./use.assets/edge-load-unpacked-img.webp)
- 2. **Chrome** ![chrome-load-unpacked-img](./use.assets/chrome-load-unpacked-img.webp)

⑤ Clique no ícone do ScriptCat no canto superior direito, clique em `┆` > Obter scripts no canto superior direito da interface que aparece, e você poderá ir ao site de scripts para pesquisar e instalar scripts.

Observação: extensões instaladas dessa forma não podem ser atualizadas automaticamente. Se precisar atualizar, repita as etapas acima para atualizar a extensão (substitua os arquivos e recarregue uma vez).


## Obter scripts

> Além dos scripts, você também pode obter informações e tutoriais sobre scripts no [Fórum chinês do Tampermonkey](https://bbs.tampermonkey.net.cn/) e no [Guia de desenvolvimento de scripts](https://learn.scriptcat.org/).

### Site de scripts do ScriptCat

O [Site de scripts do ScriptCat](https://scriptcat.org/) é o site de scripts desta extensão, onde você pode publicar os scripts que escrever.

- Novo site de scripts
- Scripts em segundo plano/scripts agendados
- Interface amigável

### Pesquisa Userscript.Zone

A [Pesquisa Userscript.Zone](https://www.userscript.zone/?utm_source=tm.net&utm_medium=scripts) é um novo site que permite pesquisar scripts de usuário inserindo URLs ou domínios apropriados.

- Grande quantidade de recursos de scripts
- Fácil encontrar scripts de usuário adequados
- Mostra apenas scripts de usuário de páginas revisadas ou, pelo menos, de páginas com funcionalidade de comentários

### GreasyFork

O [GreasyFork](https://greasyfork.org/) é uma plataforma amplamente utilizada para hospedar e compartilhar scripts de usuário, permitindo que desenvolvedores publiquem e usuários instalem scripts baseados em navegador que aprimoram ou modificam a funcionalidade de sites. O site foi criado por Jason Barnabe e é conhecido por sua ênfase em segurança e transparência de código aberto, oferecendo uma grande coleção de scripts para melhorar a experiência de navegação.

Jason Barnabe também é o criador original da extensão de navegador Stylish. No entanto, o [Stylish](https://userstyles.org/) foi vendido em 2016 e agora é operado por uma empresa diferente, sem envolvimento direto de Jason Barnabe em seu desenvolvimento posterior.

- Grande quantidade de recursos de scripts
- Tem a capacidade de sincronizar scripts do Github
- Modelo de [desenvolvimento de código aberto](https://github.com/JasonBarnabe/greasyfork) muito ativo

### GitHub/Gist

Você pode [pesquisar recursos de scripts no Github e no Gist.](https://gist.github.com/search?l=JavaScript&o=desc&q="%3D%3DUserScript%3D%3D"&s=updated)

## Tour de boas-vindas

Após instalar o ScriptCat, abrir o painel de controle iniciará automaticamente o tour de boas-vindas (você também pode reabri-lo a qualquer momento no "Central de ajuda" na barra lateral esquerda). O tour cobre:

- [Instalar scripts](/docs/use/script_installation/): instalação em mercados de scripts, incluindo suporte a [scripts em segundo plano](/docs/dev/background/).
- Gerenciar e operar: editar, executar/parar, [UserConfig](/docs/dev/config/).
- [Backup](/docs/use/sync/) e [migração de outros gerenciadores](/docs/use/from-other/migrate-from-tampermonkey/).
- [Sincronização de scripts](/docs/use/sync/).
- [Assinaturas](/docs/dev/subscribe/).
