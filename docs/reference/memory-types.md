---
description: "Every Memory type NeoHive accepts, what each is for, and which ones load at the start of a task."
---

# Memory types

Every [Memory](../concepts/glossary.md#memory) has a type, such as `directive` or `decision`, that says what kind of knowledge it holds. The type also decides whether `memory_context` loads the Memory at the start of a task. The type matters when you or your agent store a Memory with `memory_store`, or filter `memory_recall` results with `types`.

Your agent picks the type when it stores a Memory, usually without asking you. To choose the type yourself, name it in your request, for example "store this as a `directive`". Five types cover almost everything a person stores manually: `directive`, `convention`, `decision`, `insight`, and `error_pattern`. The following table shows what each type is for and whether `memory_context` returns it:

| Type | Use it for | Returned by `memory_context` |
|---|---|---|
| `directive` | A rule the team must follow. | Yes, listed first |
| `convention` | A preferred practice or style. | Yes, listed first |
| `decision` | A choice that was made, with the reasoning. | Yes |
| `insight` | A non-obvious discovery or pitfall. | Yes |
| `error_pattern` | A bug or pitfall, and how to avoid it. | Yes |
| `idiom` | A recurring way of writing something in this codebase or language. | Yes |
| `example_pattern` | A worked example or template. | Yes |
| `syntax_rule` | A syntax rule for a language. | Yes |
| `semantic_rule` | A rule about what a language construct means or does. | Yes |
| `stdlib_reference` | A reference entry for a library function. | Yes |
| `narrative` | General text that fits no other type. NeoHive gives this type to much of the content it indexes. | No |

`memory_context` lists `directive` and `convention` Memories first, under `## Directives & Conventions`, and the other returned types under `## Task-Relevant Context`. A type that `memory_context` does not return still comes back from `memory_recall`.

`memory_store` also accepts `session_summary` and `consolidated`, which NeoHive does not use. A Memory stored with either type never comes back from `memory_context`, so pick a type from the table instead.

## Importance

Every Memory also has an importance from `1` (trivial) to `10` (critical), where `5` is normal. Higher importance helps a Memory rank higher. Your agent picks the importance when it stores a Memory, and `memory_store` uses `5` if the agent leaves it out. To set the importance yourself, name the number in your request. For a rule your agent must not miss, store it as a `directive`, which `memory_context` lists first, and give it a high importance.

{% hint style="info" %}
Types are not only for Memories. [Code](../concepts/glossary.md#code-index), [Documentation](../concepts/glossary.md#documentation-index), and [Files Indexes](../concepts/glossary.md#files-index) hold [chunks](../concepts/glossary.md#chunk) of your files, and NeoHive gives each chunk a type and an importance. A chunk that states a rule, such as a line in your README, can come back from `memory_recall` and `memory_context` as a `directive`. For how Memories and chunks differ, see [Hives, Indexes, and Memories](../concepts/hives-indexes-memories.md#memories).
{% endhint %}
