---
title: Acesso externo (CLI e clientes de IA)
sidebar_label: Acesso externo
---

**Acesso externo** permite que programas locais de linha de comando e clientes de IA com capacidade
[MCP](https://modelcontextprotocol.io/) gerenciem scripts no ScriptCat por meio do [sctl](https://github.com/scriptscat/sctl).

```text
AI client ── stdio MCP ──▶ sctl mcp ── local control API ──▶ sctl serve ── WebSocket ──▶ ScriptCat
CLI ────────────────────────────────────────────────────────▲
```

`sctl serve` é um daemon local separado que você deve iniciar explicitamente. `sctl mcp` e os comandos de solicitação nunca
o iniciam automaticamente. As políticas do ScriptCat e a interface de confirmação do navegador sempre decidem se a divulgação
do código-fonte ou uma gravação é permitida; um programa externo não pode aprovar sua própria solicitação.

:::warning O listener é local por padrão
O sctl escuta em `127.0.0.1` por padrão. Ele só escuta em outra interface quando `--listen-address` é passado explicitamente.
`ws://` não criptografa o tráfego de negócios e não há isolamento por cliente remoto, então use um endereço não padrão apenas
em uma rede confiável. A extensão e o daemon ainda estabelecem uma chave de longo prazo por meio de um código de emparelhamento
de uso único e usam autenticação mútua nas conexões posteriores.
:::

## 1. Instalar o sctl

Instale a versão mais recente com um comando — macOS e Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.sh | sh
```

ou Windows PowerShell:

```powershell
irm https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.ps1 | iex
```

O instalador baixa o arquivo da versão com nome hifenizado `sctl-<version>-<os>-<arch>.<ext>` para sua plataforma, verifica
seu sha256 contra `checksums.txt` da mesma versão e instala o `sctl` em `~/.local/bin` (macOS/Linux) ou `%LOCALAPPDATA%\sctl\bin`
(Windows). `SCTL_VERSION` fixa uma versão específica; `SCTL_INSTALL_DIR` substitui o diretório de instalação. Se o diretório
de instalação não estiver no seu `PATH`, o instalador imprime a dica exata de `PATH` para sua plataforma — ele nunca edita seu
perfil de shell ou o `PATH` do usuário por você.

O sctl é um único executável. Se [GitHub Releases](https://github.com/scriptscat/sctl/releases) tiver um arquivo publicado
para sua plataforma, você também pode baixá-lo e extraí-lo e, em seguida, colocar `sctl` (`sctl.exe` no Windows) no `PATH`.

```bash
sctl version
```

Uma compilação direta do código-fonte relata `0.0.0-dev` para distingui-la de uma compilação de versão com metadados de
versão, commit e tempo de compilação injetados; isso não impede que ela se conecte ao ScriptCat. Se não houver versão
disponível, os contribuidores podem compilá-la a partir do [repositório sctl](https://github.com/scriptscat/sctl).

## 2. Iniciar o daemon e fazer a inscrição

A inscrição é uma etapa única. Depois disso, a CLI e cada cliente MCP compartilham o canal confiável extensão-para-daemon;
eles não fazem emparelhamento separadamente.

### 2.1 Escolher um diretório de dados

O daemon, a CLI e o processo MCP devem usar o mesmo diretório de dados. Ele armazena a chave de emparelhamento de longo prazo,
o token de controle local e os logs. Escolha um caminho absoluto privado para o usuário atual:

```text
/absolute/path/to/sctl-data
```

Defina a mesma variável de ambiente para cada processo do sctl:

```bash
export SCTL_DATA_DIR=/absolute/path/to/sctl-data
sctl serve
sctl status
sctl mcp
```

Um `--data-dir` explícito tem precedência sobre a variável de ambiente.

Se nem `--data-dir` nem `SCTL_DATA_DIR` forem definidos, o sctl usa o diretório de dados de aplicativo padrão por usuário da
plataforma. Não coloque o diretório de dados em um repositório ou em uma pasta de sincronização compartilhada e nunca entregue
seu `pairing.key` ou `control.token` a um modelo de IA.

### 2.2 Iniciar o daemon

Execute isto em um terminal e mantenha o processo ativo:

```bash
sctl serve
```

O endereço padrão é `ws://127.0.0.1:8643`. O daemon nunca é iniciado automaticamente por `connect`, `status`, outro comando
CLI ou `sctl mcp`. Para uso persistente, execute o comando acima com o gerenciador de serviços de usuário do seu sistema
operacional.

Para escutar explicitamente em todas as interfaces de rede, execute:

```bash
sctl --listen-address 0.0.0.0:8643 serve
```

No host do daemon, passe o mesmo `--listen-address` para `connect`, `status`, outros comandos CLI e `sctl mcp`. Na
configuração de **endereço sctl** do ScriptCat, insira um endereço que a extensão possa realmente alcançar, como
`ws://192.168.1.10:8643`; não insira `0.0.0.0`.

### 2.3 Ativar e emparelhar no ScriptCat

1. Abra **Configurações → Ferramentas → Acesso externo** no ScriptCat e ative o interruptor.
2. Confirme que o **endereço sctl** corresponde ao daemon; normalmente mantenha o padrão `ws://127.0.0.1:8643`.
3. Mantenha `sctl serve` em execução e execute em outro terminal:

   ```bash
   sctl connect
   ```

4. Insira o código de terminal de 8 caracteres na caixa de diálogo «Inscrever sctl».
5. Verifique a conexão:

   ```bash
   sctl status
   ```

O status deve informar uma extensão conectada e mostrar a versão do daemon.

:::warning O código de emparelhamento é somente para terminal
O código tem a aparência `A1B2-C3D4`, expira após 2 minutos e funciona uma única vez. Ele não é enviado à extensão pelo
WebSocket. Nunca o cole em um chat de IA, issue, log ou configuração MCP; execute `connect` novamente se ele expirar.
:::

## 3. Permissões e confirmação {#permissions}

| Capacidade | Comportamento padrão |
|---|---|
| Listar scripts e ler metadados | Retornar diretamente |
| Ler ou pesquisar o código-fonte do script | Seguir a política de **leitura de código-fonte** |
| Instalar, editar, ativar, desativar ou excluir um script | Seguir a política de **gravação** |

Ambas as políticas oferecem "Exigir aprovação" (padrão) e "Permitir diretamente".

Com "Exigir aprovação", as solicitações abrem uma página de confirmação no navegador. Você pode rejeitar, permitir uma vez ou
escolher "Permitir para esta sessão". As permissões de sessão são vinculadas por script e tipo de operação e são limpas quando
o navegador reinicia, a extensão é recarregada ou o Acesso externo é interrompido. Uma solicitação expira após 5 minutos sem
decisão; a desconexão do solicitante ou `Ctrl-C` também a anula.

"Permitir diretamente" ignora a página de confirmação para essa classe de operação. O código-fonte pode conter chaves de API,
cookies e outros segredos, enquanto as gravações podem alterar scripts diretamente, então ative-o apenas se aceitar esse risco.

## 4. Uso pela linha de comando

```bash
sctl get                         # Listar scripts
sctl get <uuid>                  # Ler metadados
sctl get <uuid> -o source        # Imprimir código-fonte completo
sctl get <uuid> -o source --lines 20-80
sctl grep <uuid> "fetch("         # Pesquisa literal no código-fonte
sctl grep <uuid> "pattern" -E    # Expressão regular
sctl install <url|file>
sctl edit <uuid> --replace OLD --with NEW
sctl enable <uuid>
sctl disable <uuid>
sctl delete <uuid>
sctl status
```

`grep` é literal por padrão; `-E` ativa expressões regulares, `-i` ignora maiúsculas/minúsculas, `-C N` adiciona contexto e
`-m N` limita correspondências. Nenhuma correspondência é considerada sucesso e sai com código 0.

`edit` é ancorado ao conteúdo, nunca baseado em números de linha. Cada `oldText` deve ocorrer exatamente uma vez por padrão;
`--replace-all` substitui cada correspondência. Você também pode passar um array `{oldText,newText,replaceAll?}` com `-f <file>`.
Apenas as edições são enviadas à extensão; não é necessário ler ou carregar todo o código-fonte primeiro.

As gravações e a divulgação de código-fonte aguardam uma decisão do navegador. Códigos de saída da CLI:

| Código de saída | Significado |
|---|---|
| `0` | Aprovado e bem-sucedido, ou um comando de leitura concluído normalmente |
| `1` | O usuário rejeitou a solicitação |
| `2` | A solicitação expirou, foi cancelada com `Ctrl-C` ou a extensão se desconectou |
| `3` | Outros erros, como argumentos, conexão ou script ausente |

Execute `sctl <command> --help` para conhecer todas as opções.

## 5. Conectar um cliente de IA (MCP)

Primeiro, certifique-se de que `sctl serve` esteja em execução e que `status` informe uma extensão conectada. Em seguida,
configure o cliente MCP para iniciar um processo `sctl mcp` separado. Use caminhos absolutos de binário e de dados em clientes GUI:

```json
{
  "mcpServers": {
    "scriptcat": {
      "command": "/absolute/path/to/sctl",
      "env": {
        "SCTL_DATA_DIR": "/absolute/path/to/sctl-data"
      },
      "args": [
        "mcp",
        "--name",
        "my-ai-client"
      ]
    }
  }
}
```

Muitos aplicativos GUI não expandem `~`, `$HOME` ou expressões de shell. `--name` é um rótulo de auditoria, não uma identidade
autenticada ou um limite de autorização. O stdout do MCP é reservado para frames de protocolo; não envolva o sctl em um script
que imprima um banner no stdout.

Ferramentas atuais:

| Ferramenta | Finalidade | Política de confirmação |
|---|---|---|
| `scripts_list` | Listar resumos de scripts | Nenhuma |
| `scripts_metadata_get` | Ler os metadados de um script | Nenhuma |
| `scripts_source_get` | Ler o código-fonte por uuid e janela de linhas opcional | Política de leitura de código-fonte |
| `scripts_source_grep` | Pesquisar no código-fonte e retornar linhas correspondentes | Política de leitura de código-fonte |
| `scripts_install_request` | Solicitar a instalação de um script | Política de gravação |
| `scripts_edit_request` | Solicitar uma edição ancorada ao conteúdo | Política de gravação |
| `scripts_toggle_request` | Solicitar ativação ou desativação | Política de gravação |
| `scripts_delete_request` | Solicitar exclusão | Política de gravação |

## 6. Auditoria e revogação

- "Ver log de auditoria" no cartão de Acesso externo abre a página de logs filtrada para esta fonte.
- `sctl status` mostra a versão do daemon, a conectividade da extensão e os eventos de segurança recentes; `-o json` retorna os eventos completos.
- "Parar acesso externo" desconecta, exclui o estado de emparelhamento do lado da extensão e limpa as permissões de sessão. A reinscrição é necessária depois.
- Para desativar apenas um cliente de IA, remova o sctl da configuração MCP desse cliente; isso não revoga o acesso de outros clientes ou da CLI.

## 7. Solução de problemas {#troubleshooting}

**O daemon está inacessível**

Execute `sctl serve` primeiro. Os comandos de solicitação nunca iniciam o daemon automaticamente.

**A autenticação do canal de controle falha**

Confirme se `serve`, os comandos CLI e o processo MCP resolvem o mesmo diretório de dados absoluto. Verifique tanto
`SCTL_DATA_DIR` quanto qualquer `--data-dir` explícito e reinicie o cliente MCP.

**O status diz "Falha na conexão"**

Confirme se o daemon está em execução, se o endereço da extensão corresponde a ele e se o software de segurança local não está
bloqueando `127.0.0.1:8643`.

**Um comando não retorna**

Verifique no navegador se há uma página de confirmação de divulgação de código-fonte ou de gravação. Pressione `Ctrl-C` para
anular a solicitação.

**Encontrar logs**

Os logs estão em `<data-dir>/logs/`. Se nem `--data-dir` nem `SCTL_DATA_DIR` forem definidos, os padrões são:

| Plataforma | Diretório de logs |
|---|---|
| macOS | `~/Library/Application Support/sctl/logs/` |
| Windows | `%LOCALAPPDATA%\sctl\logs\` |
| Linux | `~/.config/sctl/logs/` |
