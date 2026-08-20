---
title: Model Query API
---

`@grant CAT.agent.model`

The model query API provides read-only access to the models the user has configured on the management page. For security, the API key is never exposed to the script.

## list — list all models

```javascript
const models = await CAT.agent.model.list();
```

**Returns `ModelSummary[]`:**

| Field | Type | Description |
|------|------|------|
| `id` | `string` | Model config ID |
| `name` | `string` | User-defined display name (e.g. "GPT-4o", "Claude Sonnet") |
| `provider` | `"openai" \| "anthropic"` | Provider type |
| `apiBaseUrl` | `string` | API base URL |
| `model` | `string` | Model identifier sent to the provider API (e.g. `gpt-4o`, `claude-sonnet-4-20250514`) |
| `maxTokens` | `number` | Maximum output tokens (omitted if unset) |

> Note: the returned objects **do not include** an `apiKey` field.

## get — get a specific model

```javascript
const model = await CAT.agent.model.get(modelId);
```

Returns `null` if the model doesn't exist.

## getDefault — get the default model ID

```javascript
const defaultId = await CAT.agent.model.getDefault();
```

Returns the user's configured default model ID; returns an empty string if none is set.

## getSummary — get the summary model ID

```javascript
const summaryModelId = await CAT.agent.model.getSummary();
```

Returns the ID of the lightweight model the user has configured specifically for summarization tasks (such as auto-compacting conversation history). If none is configured separately, the system falls back to the default model, and this method returns an empty string.

## Usage scenarios

### Letting the user pick a model

```javascript
// ==UserScript==
// @name        Model picker example
// @grant       CAT.agent.model
// @grant       CAT.agent.conversation
// ==/UserScript==

const models = await CAT.agent.model.list();
const defaultId = await CAT.agent.model.getDefault();

// Show the list to the user and let them pick
const selectedModel = models.find(m => m.id === defaultId) || models[0];

const conv = await CAT.agent.conversation.create({
  model: selectedModel.id
});
```

### Getting details for a specific model

```javascript
const model = await CAT.agent.model.get("my-model-id");
if (model) {
  console.log(`${model.name} (${model.provider}), max output ${model.maxTokens ?? "unset"} tokens`);
}
```
