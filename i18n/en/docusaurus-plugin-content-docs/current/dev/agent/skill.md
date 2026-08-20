---
title: Skill Management API
---

`@grant CAT.agent.skills`

The Skill management API lets a script query, install, remove, and call Skill extension packages.

For Skill development and packaging, see the [Skill Development Guide](../skill-dev). Official Skill examples: [scriptscat/skills](https://github.com/scriptscat/skills).

## list — list installed Skills

```javascript
const skills = await CAT.agent.skills.list();
```

**Returns `SkillSummary[]`:**

| Field | Type | Description |
|------|------|------|
| `name` | `string` | Skill name |
| `description` | `string` | Skill description |
| `toolNames` | `string[]` | Names of the SkillScript tools it contains |
| `referenceNames` | `string[]` | Names of the reference-material files it contains |
| `hasConfig` | `boolean` | Whether it declares configuration fields |
| `enabled` | `boolean` | Whether it's enabled (defaults to `true`) |
| `installtime` | `number` | Install timestamp |
| `updatetime` | `number` | Last-updated timestamp |

> Note: `version` and `installUrl` (used by the management page's update-check feature) are not returned through this script API — they're only used internally by the update-check logic and the management page UI.

## get — get Skill details

```javascript
const skill = await CAT.agent.skills.get(name);
```

Returns the full `SkillRecord`, or `null` if it doesn't exist.

**`SkillRecord` shape:**

Inherits all fields from `SkillSummary`, plus:

| Field | Type | Description |
|------|------|------|
| `prompt` | `string` | The Markdown body of `SKILL.cat.md` (the prompt given to the AI) |
| `config` | `Record<string, SkillConfigField>` | Configuration field definitions (schema) |

**`SkillConfigField` shape:**

| Field | Type | Description |
|------|------|------|
| `title` | `string` | Display title |
| `type` | `"text" \| "number" \| "select" \| "switch"` | Field type |
| `secret` | `boolean` | Whether it's sensitive (masked in the UI) |
| `required` | `boolean` | Whether it's required |
| `default` | `unknown` | Default value |
| `values` | `string[]` | Option list (`select` type only) |

## install — install a Skill

```javascript
const record = await CAT.agent.skills.install(skillMd, scripts?, references?);
```

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `skillMd` | `string` | Contents of the `SKILL.cat.md` file (required) |
| `scripts` | `Array<{ name, code }>` | List of SkillScript files |
| `references` | `Array<{ name, content }>` | List of reference-material files |

If a Skill with the same name already exists, this updates it.

```javascript
const record = await CAT.agent.skills.install(
  `---
name: my-search
description: Custom search tool
---

Use the search tool when the user needs to search.`,
  [{ name: "search.js", code: skillScriptCode }],
  [{ name: "api-docs.md", content: "# API Docs\n..." }]
);
```

## remove — uninstall a Skill

```javascript
const success = await CAT.agent.skills.remove(name);
```

Returns `true` if removed successfully, `false` if the Skill doesn't exist.

## call — call a SkillScript directly

```javascript
const result = await CAT.agent.skills.call(skillName, scriptName, params?);
```

Executes a SkillScript in the specified Skill directly, without going through an AI conversation.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `skillName` | `string` | Skill name (required) |
| `scriptName` | `string` | SkillScript name (required) |
| `params` | `Record<string, unknown>` | Parameters to pass in (matching the `@param` declarations) |

```javascript
// Call the search script inside a Skill directly
const results = await CAT.agent.skills.call(
  "my-search",
  "search",
  { query: "ScriptCat", limit: 5 }
);
```

> SkillScript execution has a timeout (300 seconds by default, customizable via `@timeout`).
