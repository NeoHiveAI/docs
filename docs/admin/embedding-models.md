---
description: "Which embedding model each Index uses, how to choose a different one, and what happens when you change it."
---

# Embedding models

An [embedding model](../concepts/glossary.md#embedding-model) turns text and code into embeddings, which are lists of numbers that capture what the content means. NeoHive compares those numbers to find the content that matches your agent's search. Each [Index](../concepts/glossary.md#index) has its own embedding model, and NeoHive chooses one for you when you create the Index. This page explains the defaults, when a different model helps, and what happens when you switch.

## The default model for each Index

| Index | Default model |
|---|---|
| [Code Index](../concepts/glossary.md#code-index) or [Documentation Index](../concepts/glossary.md#documentation-index) | `nomic-embed-text-v2-moe` |
| [Files Index](../concepts/glossary.md#files-index) | `nomic-embed-text-v1.5` |
| [Knowledge Index](../concepts/glossary.md#knowledge-index) | `nomic-embed-text-v1.5` |

You cannot choose a model when you create an Index. To use a different model, change it on the Index afterward.

## Models you can choose

The **Embedding model** list on the **Index Info** tab shows each model's size, the memory it needs, and whether it fits your machine.

| Model | Memory needed | Good for |
|---|---|---|
| `embeddinggemma-300m` | About 0.5 GB | Documents and text, including languages other than English |
| `embeddinggemma-300m-code` | About 0.5 GB | Code, on machines with little memory |
| `nomic-embed-text-v1.5` | About 0.6 GB | General text |
| `Qwen3-Embedding-0.6B` | About 1.1 GB | Code, documents, and text |
| `nomic-embed-text-v2-moe` | About 1.8 GB | Code and text, in more than 100 languages |
| `nomic-embed-code-q6_k` | About 8 GB | Code, on a GPU with 8 GB of memory or more |
| `nomic-embed-code-q8_0` | About 9.5 GB | Code, with higher quality than `q6_k` |
| `nomic-embed-code` | About 16 GB | Code, with the highest quality, on a GPU with 16 GB or more |

The `nomic-embed-code` models match code most closely, but they need a large GPU. On a machine without one, keep the default.

## Fits and Won't fit

Next to each model, the list shows **Fits** or **Won't fit**. NeoHive compares the memory the model needs with the memory it can use on your machine:

- On a GPU backend, NeoHive can use 85% of the GPU's memory, or the GPU memory that is free, whichever is lower.
- On the CPU backend, NeoHive can use half of the machine's RAM.

To find out which backend you run, see [GPU and CPU](gpu-cpu.md). If you select a model that won't fit, the tab warns you that loading will likely fail. Choose a smaller model instead.

## Change the model of an Index

{% hint style="warning" %}
Changing the model makes NeoHive embed every Memory in the Index again. On a large Index, this can take a long time. Until a Memory is embedded again, it does not appear in search results.
{% endhint %}

To change the model, do the following:

1. Open the Index, and then select the **Index Info** tab.
2. Under **Embedding model**, select a model.
3. Select **Save**.

A message box shows `Re-embedding with <model>` and the progress. While the re-embed runs, you cannot start a sync, and **Trigger sync** shows **Re-embedding...**.

If some Memories fail, the box shows `<number> memories have not been embedded with <model>`. To try those Memories again, select **Retry failed chunks**.

## Several models in one Hive

When your agent searches a Hive, NeoHive searches every Index with that Index's own model. If the Indexes use different models that do not fit in GPU memory together, the Hive page shows `Selected models exceed your VRAM budget`. Searches still work, but NeoHive searches the Indexes one at a time, so they take longer. To search them in parallel again, choose smaller models or use the same model for more of your Indexes.
