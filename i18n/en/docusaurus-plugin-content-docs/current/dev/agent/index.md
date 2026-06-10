---
id: agent
sidebar_position: 1
---

# Agent Intelligent Assistant

ScriptCat v1.4 introduces the Agent system, which provides userscripts with AI capabilities, including AI conversation, browser automation, file management, and scheduled tasks.

## Key Capabilities

| Capability | Grant | Description |
|------------|-------|-------------|
| [Conversation](./agent-conversation) | `@grant CAT.agent.conversation` | Create AI conversations, send messages, stream responses, and use custom tools. |
| [DOM Operations](./agent-dom) | `@grant CAT.agent.dom` | Page navigation, screenshots, clicking, filling forms, scrolling, and DOM monitoring. |
| [Skill](./agent-skill) | `@grant CAT.agent.skills` | Install, uninstall, and call Skill extension packages. |
| [Scheduled Tasks](./agent-task) | `@grant CAT.agent.task` | Cron-based scheduled tasks and event listening. |
| [Model Info](./agent-model) | `@grant CAT.agent.model` | Query configured model information (read-only). |
| [OPFS Files](./agent-opfs) | `@grant CAT.agent.opfs` | Read and write files in the Agent workspace. |
| [MCP](./agent-mcp) | `@grant CAT.agent.mcp` | Manage MCP server connections. |

Scripts call these capabilities through the `CAT.agent.*` namespace. All APIs require the corresponding `@grant` permission.

## Concepts

### Skill

Skills are extension packages for the Agent system, consisting of prompts, tool scripts, and reference materials. They allow injecting domain-specific knowledge and custom tool capabilities into the AI.

### Tools (Function Calling)

Agents use "Tools" to interact with the external world. A tool is a function that the AI can choose to call based on the user's intent.

## Quick Example

```javascript
// ==UserScript==
// @name        Agent Hello World
// @grant       CAT.agent.conversation
// ==/UserScript==

(async () => {
  const conv = await CAT.agent.conversation.create();
  const response = await conv.sendMessage("Hello, who are you?");
  console.log(response.content);
})();
```

## Getting Started

- **Skill Installation** — Programmatically install skills via `CAT.agent.skills.install()`
- **Using Built-in Tools** — Learn about the [standard tools](./agent-builtin-tools) provided by the system.
