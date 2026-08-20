---
title: MCP Integration
---

MCP ([Model Context Protocol](https://modelcontextprotocol.io/)) lets Agent connect to external MCP servers and automatically gain access to the tools, resources, and prompt templates they provide.

> Unlike Agent's other subsystems, MCP servers can currently **only be configured by the user on the management page** — there is no `CAT.agent.mcp` management API for scripts. All a script can observe is that tools from these servers get called automatically during conversations.

## Configuring an MCP server

Add one on the management page → **Agent → MCP**:

| Field | Description |
|------|------|
| Name | Display name for the server |
| URL | Streamable HTTP endpoint (JSON-RPC 2.0 over POST) |
| API Key | Optional, for authentication |
| Custom headers | Optional |
| Enabled | Whether the server is active |

ScriptCat's MCP client uses the **Streamable HTTP** transport, and supports protocol version `2025-03-26`.

An MCP server can provide three kinds of capability:

| Capability | Description |
|------|------|
| **Tools** | Automatically registered as tools Agent can call |
| **Resources** | Readable resources (text/binary) |
| **Prompts** | Prompt templates, supporting parameters |

## Using it in a conversation

Tools from enabled MCP servers automatically appear in the tool list available to Agent conversations, named using the pattern `mcp_{sanitized server name}_{toolName}` — the AI decides whether to call them based on user intent. This works similarly to how [Skills](../skill-install) load automatically; script developers usually don't need to worry about the underlying details.

To check whether a specific MCP tool is available, just ask the AI directly in a conversation, or check the discovered tool list in that server's details on the management page.
