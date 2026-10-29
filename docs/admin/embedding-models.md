---
description: "Which embedding model each Index uses, how to choose a different one, and what happens when you change it."
---

# Embedding models

Each [Index](../concepts/glossary.md#index) uses an [embedding model](../concepts/glossary.md#embedding-model) to make its content searchable. NeoHive chooses the model when you create the Index, and you can change it afterward. This page lists the default models, the other models you can choose, and how to change the model of an Index.

## The default model for each Index

| Index | Default model |
|---|---|
| [Code Index](../concepts/glossary.md#code-index) or [Documentation Index](../concepts/glossary.md#documentation-index) | `nomic-embed-text-v2-moe` |
| [Files Index](../concepts/glossary.md#files-index) | `nomic-embed-text-v1.5` |
| [Knowledge Index](../concepts/glossary.md#knowledge-index) | `nomic-embed-text-v1.5` |

You can change the model of any Index except the Knowledge Index, which always uses `nomic-embed-text-v1.5`.

## Models you can choose

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

The `nomic-embed-code` models match code most closely, but they need a large GPU. In the dashboard, the list marks each model **Fits** or **Won't fit** for your machine. If a model won't fit, choose a smaller one.

## Change the model of an Index

{% hint style="warning" %}
Changing the model makes NeoHive embed every Memory in the Index again, which can take a long time on a large Index. Until a Memory is embedded again, it does not appear in search results. If the Index is a [Shared Index](../concepts/hives-indexes-memories.md#shared-index), this affects every Hive that uses it.
{% endhint %}

To change the model, do the following:

1. Open the Index, and then select the **Index Info** tab.
2. Under **Embedding model**, select a model.
3. Select **Save**.

A message box shows `Re-embedding with <model>` and the progress. If NeoHive has not used the model before, it downloads the model first, and the box shows `Waiting for the embedding model <model> to download` until the download finishes. If some Memories fail, select **Retry failed chunks** in the box.

## Several models in one Hive

If a Hive's Indexes use different models that do not fit in GPU memory together, the Hive page shows `Selected models exceed your VRAM budget`. Searches still work but take longer. To speed them up, choose smaller models, or use the same model for more of the Indexes.
