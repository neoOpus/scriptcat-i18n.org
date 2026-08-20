---
title: Perguntas frequentes
---

## Modo desenvolvedor / Permissões de scripts de usuário

#### P: O ScriptCat mostra "Modo desenvolvedor não ativado" e os scripts não são executados?

A partir do Chrome 120+ e das versões mais recentes do Edge, os navegadores exigem que os usuários ativem manualmente as permissões para que os scripts sejam executados. Consulte [Ativar o suporte a scripts de usuário do navegador](/docs/use/open-dev/) para obter as instruções de configuração.

Se já estiver ativado, mas o aviso persistir, tente reiniciar o navegador ou recarregar a extensão.

## Os scripts não funcionam

#### P: Instalei um script, mas ele não tem efeito?

1. **"Permitir scripts de usuário" não ativado** — Consulte [Ativar o suporte a scripts de usuário do navegador](/docs/use/open-dev/)
2. **Inicialização a frio** — Os scripts podem não carregar imediatamente quando o navegador é aberto pela primeira vez. Tente atualizar a página
3. **Conflitos de extensões** — Bloqueadores de anúncios (ex.: uBlock Origin) podem causar erros nos scripts

#### P: O script funciona no Tampermonkey, mas não no ScriptCat?

O ScriptCat e o Tampermonkey têm algumas diferenças na implementação da API. Atualize para a versão mais recente. Se o problema persistir, abra um Issue no [GitHub](https://github.com/scriptscat/scriptcat/issues).

## Problemas de sincronização na nuvem

> Para o uso básico da sincronização, consulte [Sincronização e backup](/docs/use/sync/).

#### P: Problemas com a sincronização do OneDrive / Google Drive / WebDAV?

1. **Scripts excluídos reaparecem** — Certifique-se de que a "sincronização de exclusões" esteja ativada em todos os dispositivos

## Problemas de instalação de scripts

> Para saber como instalar scripts, consulte [Instalar scripts](/docs/use/script_installation/).

## Problemas de autorização de cookies

#### P: O GM_cookie não consegue obter cookies?

1. **O pop-up de autorização não aparece** — Certifique-se de que `GM_cookie` esteja declarado corretamente no `@grant` do script e use `@connect` para declarar os domínios que precisam ser acessados

## Perda de dados de scripts

#### P: Todos os scripts desapareceram depois de abrir o navegador?

1. **Atraso de inicialização** — O ScriptCat pode ainda estar carregando dados quando o navegador inicia. Aguarde alguns segundos ou reinicie o navegador
2. **Software de limpeza** — Ferramentas como 360 Security Guard ou CCleaner podem limpar os dados das extensões. Exclua os dados das extensões do navegador nas configurações de limpeza
3. **Backups regulares recomendados** — Use o recurso de exportação ou a [sincronização na nuvem](/docs/use/sync/) para fazer backup regular de scripts e configurações
