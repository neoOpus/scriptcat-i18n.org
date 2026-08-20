---
title: Built-in Tools Reference
---

Agent comes with a set of built-in tools that the AI calls automatically during conversations. These tools are available by default in persistent conversations; script developers usually don't need to call them directly — the AI picks the right tool based on user intent.

Understanding what these tools can do helps you write better system prompts and custom tools.

## Web Data Fetching

### web_fetch

Fetch the content of a URL, with HTML-to-text extraction and LLM summarization support.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `url` | `string` | Yes | Target URL (http/https only) |
| `prompt` | `string` | No | Summary prompt (when provided, an LLM is used to distill the content) |
| `max_length` | `number` | No | max content characters |

**Behavior details:**
- 30-second request timeout
- HTML content automatically extracts the main body text (strips navigation, sidebars, etc.)
- JSON responses are parsed automatically
- Plain text is returned as-is
- When `prompt` is provided, the fetched content is sent to an LLM for summarization

**Return value:**
```json
{
  "url": "https://example.com",
  "content_type": "text/html",
  "content": "Extracted body content...",
  "truncated": false,
  "final_url": "https://example.com/redirected"
}
```

### web_search

Query a search engine and return structured search results.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `query` | `string` | Yes | Search keywords |
| `max_results` | `number` | No | Max number of results (default 5, cap 10) |

**Supported search engines:**

| Engine | Description | Configuration required |
|------|------|---------|
| DuckDuckGo | Default engine | None |
| Bing | Microsoft Bing Search | API key required |
| Baidu | Baidu Search | No API key required |
| Google Custom Search | Google Custom Search | API key + CSE ID required |

Search engines are configured on the management page → Agent → Settings.

**Return value:**
```json
[
  {
    "title": "Search result title",
    "url": "https://example.com/result",
    "snippet": "Result summary text..."
  }
]
```

### get_tab_content

Read the rendered page content of a specified tab, converted into structured Markdown annotated with CSS selectors.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `tab_id` | `number` | Yes | Tab ID |
| `selector` | `string` | No | CSS selector; only extract the matching part |
| `prompt` | `string` | No | summary prompt |
| `max_length` | `number` | No | max content characters |

Difference from `web_fetch`: `get_tab_content` reads the page **as already rendered by the browser** (including dynamic JS content), whereas `web_fetch` makes a fresh HTTP request.

**Return value:**
```json
{
  "tab_id": 123,
  "url": "https://example.com",
  "title": "Page title",
  "content": "Structured content...",
  "truncated": false,
  "used_selector": "main"
}
```

## Tab Management

### list_tabs

Query open tabs, with support for several filter conditions.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `url_pattern` | `string` | No | URL regex match |
| `title_pattern` | `string` | No | Title regex match |
| `active` | `boolean` | No | Only return the active tab |
| `window_id` | `number` | No | specified window |
| `audible` | `boolean` | No | Only return tabs currently playing audio |

### open_tab

Open a new tab, or navigate an existing one.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `url` | `string` | Yes | Target URL |
| `tab_id` | `number` | No | ID of an existing tab (if provided, that tab is navigated; otherwise a new tab is opened) |
| `active` | `boolean` | No | Whether to activate it (default `true`) |
| `window_id` | `number` | No | specified window |
| `wait_until_loaded` | `boolean` | No | Whether to wait for the page to finish loading (default `true`) |

### close_tab

Close a tab.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `tab_id` | `number` | Yes | Tab ID |

### activate_tab

Activate a tab and focus the window it's in.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `tab_id` | `number` | Yes | Tab ID |

## File System (OPFS)

### opfs_write

Write a file to the workspace.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `path` | `string` | Yes | file path |
| `content` | `string` | Yes | File content (data URL binary supported) |

### opfs_read

Read a file from the workspace. By default the file type is auto-detected: text files return their content, binary files return a blob URL.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `path` | `string` | Yes | file path |
| `mode` | `string` | No | `"text"` / `"blob"` / `"auto"` (default) — forces a specific return mode |
| `offset` | `number` | No | Starting line number (1-indexed), text mode only |
| `limit` | `number` | No | Number of lines to read, text mode only (pagination is required once text exceeds 200 lines) |

### opfs_list

List directory contents.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `path` | `string` | No | Directory path (defaults to the root directory) |

### opfs_delete

Delete a file or directory.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `path` | `string` | Yes | File/directory path |

## User Interaction

### ask_user

Ask the user a question, supporting either free-form input or a structured choice.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `question` | `string` | Yes | The question |
| `options` | `string[]` | No | List of choices (when provided, this becomes a multiple-choice question) |
| `multiple` | `boolean` | No | Whether multiple selections are allowed (default `false`) |

**Timeout:** returns `{ answer: null, reason: "timeout" }` after 5 minutes with no response.

**Return value:**
```json
{ "answer": "The user's answer text" }
```

### execute_script

Execute JavaScript code in a page or a sandbox.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `code` | `string` | Yes | JavaScript code |
| `target` | `string` | Yes | `"page"` or `"sandbox"` |
| `tab_id` | `number` | No | Which tab to target when `target` is `page` (defaults to the current active tab); ignored for sandbox |

**Execution environment comparison:**

| Environment | DOM | Page JS | Extension blob URL | Best for |
|------|-----|---------|---------------|---------|
| `target: "page"` (always MAIN world) | yes | yes | no | Reading/manipulating the DOM, calling page functions, reading page variables |
| `target: "sandbox"` | no | no | no | Pure computation |

> `page` mode always runs in the page's MAIN world, sharing `window` with the page — so it cannot access the extension's own blob URLs (e.g. the address `opfs_read` returns in blob mode). Use a SkillScript instead when you need to work with a blob URL.

## Sub-agents

### agent

Spawn an independent sub-agent to handle a complex sub-task.

| Parameter | Type | Required | Description |
|------|------|------|------|
| `prompt` | `string` | Yes | Description of the sub-task |
| `description` | `string` | No | A short label (a few words, for UI display) |
| `type` | `string` | No | Sub-agent type (see below), defaults to `"general"` |
| `tab_id` | `number` | No | Tab ID to pass to the sub-agent; the sub-agent will operate on that tab |

**Sub-agent types:**

| type | Description | Available tools |
|------|------|---------|
| `researcher` | Information retrieval (read-only) | web_search, web_fetch, page content reading |
| `page_operator` | Browser automation | Tab management, DOM manipulation, page interaction |
| `general` | General-purpose (default) | All tools |

**Characteristics:**
- A sub-agent has its own independent conversation context
- It **cannot** use `ask_user` or `agent` (to prevent recursion)
- A sub-agent's events are passed to the parent conversation via `sub_agent_event`

## Task Management

This group of tools manages a temporary task list within a conversation (in memory, not persisted).

### create_task

| Parameter | Type | Required | Description |
|------|------|------|------|
| `subject` | `string` | Yes | Task title |
| `description` | `string` | No | Detailed description |

### update_task

| Parameter | Type | Required | Description |
|------|------|------|------|
| `task_id` | `string` | Yes | Task ID |
| `status` | `string` | No | `"pending"` / `"in_progress"` / `"completed"` |
| `subject` | `string` | No | New title |
| `description` | `string` | No | New description |

### list_tasks

No parameters; returns a brief list of all tasks.

> The task-management tools are mainly for the AI to track its own progress while handling complex, multi-step tasks; task data is not persisted.
