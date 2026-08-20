---
title: 模型查询 API
---

`@grant CAT.agent.model`

模型查询 API 提供对用户在管理页面配置的模型的只读访问。出于安全考虑，API Key 不会暴露给脚本。

## list — 获取所有模型

```javascript
const models = await CAT.agent.model.list();
```

**返回 `ModelSummary[]`：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 模型配置 ID |
| `name` | `string` | 用户自定义的显示名称（如 "GPT-4o"、"Claude Sonnet"） |
| `provider` | `"openai" \| "anthropic"` | 服务商类型 |
| `apiBaseUrl` | `string` | API 基础 URL |
| `model` | `string` | 发送给服务商 API 的模型标识（如 `gpt-4o`、`claude-sonnet-4-20250514`） |
| `maxTokens` | `number` | 最大输出 Token 数（未设置时省略） |

> 注意：返回的对象**不包含** `apiKey` 字段。

## get — 获取指定模型

```javascript
const model = await CAT.agent.model.get(modelId);
```

模型不存在时返回 `null`。

## getDefault — 获取默认模型 ID

```javascript
const defaultId = await CAT.agent.model.getDefault();
```

返回用户配置的默认模型 ID；未设置时返回空字符串。

## getSummary — 获取摘要模型 ID

```javascript
const summaryModelId = await CAT.agent.model.getSummary();
```

返回用户专门为摘要类任务（如自动压缩对话历史）配置的轻量模型 ID；未单独配置时，系统会退回使用默认模型，此时该方法返回空字符串。

## 使用场景

### 让用户选择模型

```javascript
// ==UserScript==
// @name        模型选择示例
// @grant       CAT.agent.model
// @grant       CAT.agent.conversation
// ==/UserScript==

const models = await CAT.agent.model.list();
const defaultId = await CAT.agent.model.getDefault();

// 展示列表供用户选择
const selectedModel = models.find(m => m.id === defaultId) || models[0];

const conv = await CAT.agent.conversation.create({
  model: selectedModel.id
});
```

### 获取指定模型的详情

```javascript
const model = await CAT.agent.model.get("my-model-id");
if (model) {
  console.log(`${model.name}（${model.provider}），最大输出 ${model.maxTokens ?? "未设置"} tokens`);
}
```
