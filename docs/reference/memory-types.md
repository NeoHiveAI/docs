---
description: "Every Memory type NeoHive accepts, what each is for, and which ones load at the start of a task."
---

# Memory types

Every [Memory](../concepts/glossary.md#memory) has a type, such as `directive` or `decision`, that says what kind of knowledge it holds. The type also decides whether `memory_context` loads the Memory at the start of a task. Check the following table to see what each `type` means when you or your agent store a Memory with `memory_store`, or filter `memory_recall` results with `types`.

Your agent picks the type when it stores a Memory, usually without asking you. To choose the type yourself, name it in your request, for example "store this as a `directive`". Five types cover almost everything a person stores manually: `directive`, `convention`, `decision`, `insight`, and `error_pattern`.

| Type | Use it for | `memory_context` section |
|---|---|---|
| `directive` | A rule the team must follow. | Directives & Conventions |
| `convention` | A preferred practice or style. | Directives & Conventions |
| `decision` | A choice that was made, with the reasoning. | Task-Relevant Context |
| `insight` | A non-obvious discovery or pitfall. | Task-Relevant Context |
| `error_pattern` | A bug or pitfall, and how to avoid it. | Task-Relevant Context |
| `idiom` | A recurring way of writing something in this codebase or language. | Task-Relevant Context |
| `example_pattern` | A worked example or template. | Task-Relevant Context |
| `syntax_rule` | A syntax rule for a language. | Task-Relevant Context |
| `semantic_rule` | A rule about what a language construct means or does. | Task-Relevant Context |
| `stdlib_reference` | A reference entry for a library function. | Task-Relevant Context |
| `narrative` | General text that fits no other type. NeoHive gives this type to much of the content it indexes. | Not loaded |
| `session_summary` | This type is reserved. NeoHive never assigns it on its own. | Not loaded |
| `consolidated` | This type is reserved. NeoHive never assigns it on its own. | Not loaded |

`memory_context` puts rules first, so they arrive before any code does. Types marked **Not loaded** never come back from `memory_context`, but `memory_recall` still returns them.

## Importance

Every Memory also has an importance from `1` (trivial) to `10` (critical). Higher importance helps a Memory rank higher. Your agent picks the importance when it stores a Memory, and `memory_store` uses `5` if the agent leaves it out. To set it yourself, name it in your request. Use `8` and above only for rules that must not be missed.

{% hint style="info" %}
Types are not only for Memories. Code, Documentation, and Files Indexes hold [chunks](../concepts/glossary.md#chunk) of your files, and NeoHive gives each chunk a type and an importance based on its wording. A chunk that reads like a rule, such as a README sentence with "never" in it, can come back from `memory_recall` and `memory_context` as a `directive`. For how Memories and chunks differ, see [Hives, Indexes, and Memories](../concepts/hives-indexes-memories.md#memories).
{% endhint %}
