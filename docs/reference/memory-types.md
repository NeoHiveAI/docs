---
description: "Every Memory type NeoHive accepts, what each is for, and which ones load at the start of a task."
---

# Memory types

Pick the `type` for `memory_store`, or filter `memory_recall` with `types`.

Your agent picks the type for you in most cases. The first five cover almost everything a person stores by hand.

| Type | Use it for | `memory_context` section |
|---|---|---|
| `directive` | A rule the team must follow. | Directives & Conventions |
| `convention` | A preferred practice or style. | Directives & Conventions |
| `decision` | A choice that was made, with the reasoning. | Task-Relevant Context |
| `insight` | A non-obvious discovery or gotcha. | Task-Relevant Context |
| `error_pattern` | A bug or pitfall, and how to avoid it. | Task-Relevant Context |
| `idiom` | A recurring way of writing something in this codebase or language. | Task-Relevant Context |
| `example_pattern` | A worked example or template. | Task-Relevant Context |
| `syntax_rule` | A syntax rule for a language. | Task-Relevant Context |
| `semantic_rule` | A rule about what a language construct means or does. | Task-Relevant Context |
| `stdlib_reference` | A reference entry for a library function. | Task-Relevant Context |
| `narrative` | General text that fits no other type. Much indexed content lands here. | Not loaded |
| `session_summary` | Reserved. NeoHive never assigns it on its own. | Not loaded |
| `consolidated` | Reserved. NeoHive never assigns it on its own. | Not loaded |

`memory_context` puts rules first, so they arrive before any code does. Types marked **Not loaded** never come back from `memory_context`, but `memory_recall` still returns them.

## Importance

Every Memory also has an importance from `1` (trivial) to `10` (critical). `memory_store` defaults to `5`. Higher importance helps a Memory rank higher, so keep `8` and above for rules that must not be missed.

{% hint style="info" %}
When NeoHive indexes a file, it picks a type and importance for each piece from its wording. A piece with words like "always", "never", "must", "prefer", or "avoid" becomes a `directive` with importance `8` or more. That is why a stray "never" in a README can show up as a rule.
{% endhint %}

## Next step

See [Environment variables](environment-variables.md) for the settings you can change.
