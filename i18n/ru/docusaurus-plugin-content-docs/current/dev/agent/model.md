---
title: API запроса моделей
---

`@grant CAT.agent.model`

API запроса моделей предоставляет доступ только для чтения к моделям, настроенным пользователем на странице управления. В целях безопасности API-ключ никогда не передаётся скрипту.

## list — список всех моделей

```javascript
const models = await CAT.agent.model.list();
```

**Возвращает `ModelSummary[]`:**

| Поле | Тип | Описание |
|------|------|------|
| `id` | `string` | ID конфигурации модели |
| `name` | `string` | Отображаемое имя, заданное пользователем (например, "GPT-4o", "Claude Sonnet") |
| `provider` | `"openai" \| "anthropic"` | Тип провайдера |
| `apiBaseUrl` | `string` | Базовый URL API |
| `model` | `string` | Идентификатор модели, отправляемый в API провайдера (например, `gpt-4o`, `claude-sonnet-4-20250514`) |
| `maxTokens` | `number` | Максимальное число токенов на выходе (отсутствует, если не задано) |

> Примечание: возвращаемые объекты **не содержат** поля `apiKey`.

## get — получить конкретную модель

```javascript
const model = await CAT.agent.model.get(modelId);
```

Возвращает `null`, если модель не найдена.

## getDefault — получить ID модели по умолчанию

```javascript
const defaultId = await CAT.agent.model.getDefault();
```

Возвращает настроенный пользователем ID модели по умолчанию; если не задан — пустую строку.

## getSummary — получить ID модели для сводок

```javascript
const summaryModelId = await CAT.agent.model.getSummary();
```

Возвращает ID облегчённой модели, отдельно настроенной пользователем для задач суммаризации (например, автоматического сжатия истории диалога). Если такая модель не задана, система использует модель по умолчанию, а этот метод вернёт пустую строку.

## Сценарии использования

### Выбор модели пользователем

```javascript
// ==UserScript==
// @name        Пример выбора модели
// @grant       CAT.agent.model
// @grant       CAT.agent.conversation
// ==/UserScript==

const models = await CAT.agent.model.list();
const defaultId = await CAT.agent.model.getDefault();

// Показать список пользователю для выбора
const selectedModel = models.find(m => m.id === defaultId) || models[0];

const conv = await CAT.agent.conversation.create({
  model: selectedModel.id
});
```

### Получение сведений о конкретной модели

```javascript
const model = await CAT.agent.model.get("my-model-id");
if (model) {
  console.log(`${model.name} (${model.provider}), макс. вывод ${model.maxTokens ?? "не задано"} токенов`);
}
```
