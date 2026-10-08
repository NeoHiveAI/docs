---
description: >-
  Every Memory type NeoHive accepts, what each is for, and which ones load at
  the start of a task.
---

# Memory types

Use this page to choose the `type` for a [Memory](glossary.md#memory) you store with `memory_store`, or to filter `memory_recall` results with `types`.

In most cases, your agent chooses the type for you. The first five types cover almost everything a person stores manually.

| Type               | Use it for                                                                                       | `memory_context` section |
| ------------------ | ------------------------------------------------------------------------------------------------ | ------------------------ |
| `directive`        | A rule the team must follow.                                                                     | Directives & Conventions |
| `convention`       | A preferred practice or style.                                                                   | Directives & Conventions |
| `decision`         | A choice that was made, with the reasoning.                                                      | Task-Relevant Context    |
| `insight`          | A non-obvious discovery or pitfall.                                                              | Task-Relevant Context    |
| `error_pattern`    | A bug or pitfall, and how to avoid it.                                                           | Task-Relevant Context    |
| `idiom`            | A recurring way of writing something in this codebase or language.                               | Task-Relevant Context    |
| `example_pattern`  | A worked example or template.                                                                    | Task-Relevant Context    |
| `syntax_rule`      | A syntax rule for a language.                                                                    | Task-Relevant Context    |
| `semantic_rule`    | A rule about what a language construct means or does.                                            | Task-Relevant Context    |
| `stdlib_reference` | A reference entry for a library function.                                                        | Task-Relevant Context    |
| `narrative`        | General text that fits no other type. NeoHive gives this type to much of the content it indexes. | Not loaded               |
| `session_summary`  | This type is reserved. NeoHive never assigns it on its own.                                      | Not loaded               |
| `consolidated`     | This type is reserved. NeoHive never assigns it on its own.                                      | Not loaded               |

`memory_context` puts rules first, so they arrive before any code does. Types marked **Not loaded** never come back from `memory_context`, but `memory_recall` still returns them.

## Importance

Every Memory also has an importance from `1` (trivial) to `10` (critical). `memory_store` defaults to `5`. Higher importance helps a Memory rank higher. Use `8` and above only for rules that must not be missed.

{% hint style="info" %}
When NeoHive indexes a file, it gives each piece of the file a type and an importance. The choice depends on the piece's wording. A piece with words like "always", "never", "must", "prefer", or "avoid" becomes a `directive` with importance `8` or more. As a result, a stray "never" in a README can appear as a rule.
{% endhint %}

## Next step

See [Environment variables](environment-variables.md) for the settings you can change.
