---
title: Scheduled Task API
---

`@grant CAT.agent.task`

The scheduled task API lets a script create Cron-expression-based scheduled tasks, with two execution modes.

## Execution modes

### Internal mode

Handled automatically by the Agent system:
- Automatically creates or resumes a conversation when the Cron schedule fires
- Sends the configured `prompt` to the LLM
- A model and Skills can be specified
- Execution history and token usage are recorded automatically

### Event mode

Handled by the script itself:
- An event notification is sent to the script when the Cron schedule fires
- The script listens for the event via `addListener`
- Handling logic is fully custom

## create — create a task

```javascript
const task = await CAT.agent.task.create(options);
```

**Parameters (`AgentTaskCreateOptions`):**

| Parameter | Type | Required | Description |
|------|------|------|------|
| `name` | `string` | Yes | Task name |
| `crontab` | `string` | Yes | Standard Cron expression (5 fields: minute hour day month weekday) |
| `mode` | `"internal" \| "event"` | Yes | Execution mode |
| `enabled` | `boolean` | No | Whether it's enabled, defaults to `true` |
| `notify` | `boolean` | No | Whether to send a browser notification when it fires |
| `prompt` | `string` | No | Prompt for internal mode |
| `modelId` | `string` | No | Model ID to use in internal mode |
| `skills` | `string[]` | No | Skills to load in internal mode |
| `maxIterations` | `number` | No | Max tool-call rounds for internal mode, defaults to `10` |

**Returns `AgentTask`:**

| Field | Type | Description |
|------|------|------|
| `id` | `string` | Task ID |
| `name` | `string` | Task name |
| `crontab` | `string` | Cron expression |
| `mode` | `string` | Execution mode |
| `enabled` | `boolean` | Whether it's enabled |
| `notify` | `boolean` | Whether notifications are sent |
| `nextruntime` | `number` | Next run timestamp |
| `lastruntime` | `number` | Last run timestamp |
| `conversationId` | `string` | Associated conversation ID in internal mode (optional) |
| `lastRunStatus` | `"success" \| "error"` | Status of the last run |
| `lastRunError` | `string` | Error message from the last run |
| `createtime` | `number` | Creation timestamp |

**Cron expression examples:**

| Expression | Description |
|--------|------|
| `* * * * *` | Every minute |
| `0 9 * * *` | Every day at 09:00 |
| `0 */2 * * *` | Every 2 hours |
| `30 8 * * 1-5` | Weekdays at 08:30 |
| `0 0 1 * *` | 00:00 on the 1st of every month |

## list — list all tasks

```javascript
const tasks = await CAT.agent.task.list();
```

Returns all tasks created by the current script.

## get — get task details

```javascript
const task = await CAT.agent.task.get(taskId);
```

Returns `undefined` if the task doesn't exist.

## update — update a task

```javascript
const task = await CAT.agent.task.update(taskId, partial);
```

**Updatable fields:**

```javascript
await CAT.agent.task.update(task.id, {
  name: "New name",
  crontab: "0 10 * * *",
  enabled: false,
  prompt: "New prompt",
  notify: true
});
```

`nextruntime` is automatically recalculated after an update.

## remove — delete a task

```javascript
const success = await CAT.agent.task.remove(taskId);
```

## runNow — run immediately

```javascript
await CAT.agent.task.runNow(taskId);
```

Triggers the task to run once immediately, without waiting for its Cron schedule (non-blocking, runs in the background).

## addListener — listen for task triggers

```javascript
const listenerId = await CAT.agent.task.addListener(taskId, callback);
```

Only used for **event mode** tasks. The callback runs when the Cron schedule fires.

**Callback parameter (`AgentTaskTrigger`):**

| Field | Type | Description |
|------|------|------|
| `taskId` | `string` | Task ID |
| `name` | `string` | Task name |
| `crontab` | `string` | Cron expression |
| `triggeredAt` | `number` | Trigger timestamp |

## removeListener — remove a listener

```javascript
await CAT.agent.task.removeListener(listenerId);
```

## Full examples

### Internal mode — the AI runs it automatically

```javascript
// ==UserScript==
// @name        Scheduled news digest
// @match       *://*/*
// @grant       CAT.agent.task
// ==/UserScript==

const task = await CAT.agent.task.create({
  name: "Daily news digest",
  crontab: "0 9 * * *",       // Every day at 9
  mode: "internal",
  prompt: "Please search today's tech news and save a short summary to OPFS",
  skills: ["web-search"],
  maxIterations: 10,
  notify: true
});

console.log("Task created, next run:", new Date(task.nextruntime));
```

### Event mode — the script handles it itself

```javascript
// ==UserScript==
// @name        Scheduled data collection
// @match       *://*/*
// @grant       CAT.agent.task
// @grant       CAT.agent.dom
// ==/UserScript==

const task = await CAT.agent.task.create({
  name: "Stock data collection",
  crontab: "*/30 9-15 * * 1-5", // Every 30 minutes, 9-15 on weekdays
  mode: "event",
  enabled: true,
  notify: false
});

await CAT.agent.task.addListener(task.id, async (trigger) => {
  console.log(`Task triggered: ${trigger.name} at ${new Date(trigger.triggeredAt)}`);

  // Custom collection logic
  await CAT.agent.dom.navigate("https://finance.example.com/stock");
  const content = await CAT.agent.dom.readPage({ selector: ".stock-table" });

  // Process the data...
  console.log("Collection complete");
});
```
