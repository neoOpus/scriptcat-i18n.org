---
title: Conversation API
---

`@grant CAT.agent.conversation`

The Conversation API is the core of the Agent system, letting a script create AI conversations, send messages, and receive replies.

## Creating a conversation

```javascript
const conv = await CAT.agent.conversation.create(options?);
```

### ConversationCreateOptions

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `id` | `string` | auto-generated | Conversation ID, used to resume an existing conversation |
| `system` | `string` | — | Custom system prompt, appended after the built-in prompt |
| `model` | `string` | default model | Model ID (obtained after configuring it on the management page) |
| `maxIterations` | `number` | `20` | Maximum tool-call loop count within a single conversation turn |
| `skills` | `"auto" \| string[]` | — | `"auto"` loads all Skills automatically, or an array of specific Skill names |
| `tools` | `ToolDefinition[]` | — | Custom tool list (see below) |
| `commands` | `Record<string, CommandHandler>` | — | Custom conversation commands |
| `ephemeral` | `boolean` | `false` | An ephemeral conversation that isn't persisted to storage |
| `cache` | `boolean` | `true` | Enable prompt caching (reduces token usage) |

### Custom tools

A script can register its own tools for the AI to call:

```javascript
const conv = await CAT.agent.conversation.create({
  tools: [{
    name: "get_weather",
    description: "Get weather information for the specified city",
    parameters: {
      type: "object",
      properties: {
        city: {
          type: "string",
          description: "City name"
        },
        unit: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description: "Temperature unit"
        }
      },
      required: ["city"]
    },
    handler: async (args) => {
      // args = { city: "Beijing", unit: "celsius" }
      const data = await fetchWeather(args.city, args.unit);
      return { temperature: data.temp, condition: data.condition };
    }
  }]
});
```

A tool's `parameters` follows the [JSON Schema](https://json-schema.org/) spec. The AI uses `description` to understand when and how to call the tool.

### Custom commands

Custom commands starting with `/` can be registered:

```javascript
const conv = await CAT.agent.conversation.create({
  commands: {
    "/export": async (args) => {
      // Triggered when the user types "/export pdf"
      await exportToPdf(args);
      return "Export complete";
    }
  }
});
```

Built-in commands: `/new` (clear conversation history) — this can be overridden by a custom handler.

## Getting an existing conversation

```javascript
const conv = await CAT.agent.conversation.get(conversationId);
// Returns null if the conversation doesn't exist
```

## ConversationInstance methods

### chat — synchronous chat

```javascript
const reply = await conv.chat(content, options?);
```

Sends a message and waits for the complete reply. The AI may call tools while replying; `chat` waits for all tool execution to finish before returning the final result.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `content` | `string \| ContentBlock[]` | Message content, either text or multimodal content blocks |
| `options.tools` | `ToolDefinition[]` | Extra tools to append for this call only (merged with the tools passed at creation) |

**Returns `ChatReply`:**

| Field | Type | Description |
|------|------|------|
| `content` | `string \| ContentBlock[]` | The AI's reply content |
| `thinking` | `string` | The model's thinking process (only some models support this) |
| `toolCalls` | `ToolCall[]` | Record of tool calls made during this reply |
| `usage` | `{ inputTokens, outputTokens }` | Token usage |
| `command` | `boolean` | Whether this reply was triggered by a command |

### chatStream — streaming chat

```javascript
const stream = await conv.chatStream(content, options?);
for await (const chunk of stream) {
  // Handle streaming events
}
```

Receives the AI's reply in real time — useful when you need to display output incrementally.

**`StreamChunk` event types:**

| type | Fields | Description |
|------|------|------|
| `content_delta` | `content: string` | Incremental text content |
| `thinking_delta` | `thinking: string` | Incremental thinking content |
| `tool_call` | `toolCall: ToolCall` | Tool call info (fired on state changes) |
| `content_block` | `block: ContentBlock` | A content block (image, file, etc.) |
| `done` | `usage: { inputTokens, outputTokens }` | Conversation turn complete |
| `error` | `error: string, errorCode?: string` | Error |

**Error codes (`errorCode`):**

| Code | Description |
|--------|------|
| `rate_limit` | API rate limit hit; usually retried automatically |
| `auth` | Authentication failed; check the API key |
| `tool_timeout` | Tool execution timed out |
| `max_iterations` | Hit the maximum tool-call loop count |
| `api_error` | Other API error |

### getMessages — get message history

```javascript
const messages = await conv.getMessages();
```

Returns a `ChatMessage[]` containing every message in the conversation.

**`ChatMessage` shape:**

| Field | Type | Description |
|------|------|------|
| `id` | `string` | Message ID |
| `role` | `"user" \| "assistant" \| "system" \| "tool"` | Message role |
| `content` | `string \| ContentBlock[]` | Message content |
| `thinking` | `{ content: string }` | Thinking process (assistant messages — note this is an object, not a plain string) |
| `error` | `string` | Error message if this turn errored |
| `modelId` | `string` | Model ID used for this message |
| `durationMs` | `number` | Total response duration in ms |
| `parentId` | `string` | Parent message ID (for branching) |
| `toolCalls` | `ToolCall[]` | Record of tool calls (assistant messages) |
| `toolCallId` | `string` | The corresponding tool call ID (tool messages) |
| `usage` | `{ inputTokens, outputTokens }` | Token usage |
| `createtime` | `number` | Creation timestamp |

### clear — clear the conversation

```javascript
await conv.clear();
```

Clears all message history in the conversation.

### save — persist the conversation

```javascript
await conv.save();
```

Saves the conversation's metadata to storage. Ephemeral conversations (`ephemeral: true`) aren't saved by default; calling this method converts one to a persisted conversation.


### Instance properties

| Property | Type | Description |
|------|------|------|
| `id` | `string` | Conversation ID |
| `title` | `string` | Conversation title |
| `modelId` | `string` | The model ID in use |

## Multimodal content

Message content can be a plain text string, or a `ContentBlock[]` array to support multimodal input:

```javascript
// Send text + an image
await conv.chat([
  { type: "text", text: "Please analyze what's in this image" },
  { type: "image", attachmentId: "img-id", mimeType: "image/png" }
]);
```

### ContentBlock types

| type | Required fields | Description |
|------|---------|------|
| `text` | `text: string` | Text content |
| `image` | `attachmentId: string, mimeType: string` | Image; requires a vision-capable model |
| `file` | `attachmentId: string, mimeType: string, name: string` | File |
| `audio` | `attachmentId: string, mimeType: string` | Audio |

## Ephemeral vs. persisted conversations

| Feature | Persisted conversation (default) | Ephemeral conversation |
|------|-------------------|---------------------|
| Message storage | Persisted to OPFS | In memory only |
| Built-in tools | All available | Not included; provide your own via `tools` |
| Conversation list | Visible | Not visible |
| Prompt caching | supported | Can be disabled |
| Use case | General-purpose conversations | Lightweight, one-off tasks and quick Q&A |

## Context management

### Auto-compact

When the conversation's context usage exceeds **80%** of the model's context window, the system automatically calls the LLM to generate a summary of the history, replacing older messages to free up space.

### Prompt caching

Enabled by default. For Anthropic models, the system prompt and message history are cached, significantly reducing token usage and latency for repeated turns.

Can be disabled via `cache: false`:

```javascript
const conv = await CAT.agent.conversation.create({ cache: false });
```

## Full example

```javascript
// ==UserScript==
// @name        Smart translation assistant
// @match       *://*/*
// @grant       CAT.agent.conversation
// @grant       CAT.agent.dom
// ==/UserScript==

// Create a conversation with a custom tool
const conv = await CAT.agent.conversation.create({
  system: "You are a translation assistant. The user will give you web page content — please translate it into Chinese.",
  tools: [{
    name: "get_selection",
    description: "Get the text the user has selected on the page",
    parameters: { type: "object", properties: {} },
    handler: async () => {
      return { text: window.getSelection()?.toString() || "No text selected" };
    }
  }]
});

// Stream the translation result
const stream = await conv.chatStream("Please get the selected text and translate it into Chinese");
let result = "";
for await (const chunk of stream) {
  if (chunk.type === "content_delta") {
    result += chunk.content;
    // Update the UI in real time
    updateTranslationUI(result);
  }
}
```
