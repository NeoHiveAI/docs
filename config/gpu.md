---
description: "How NeoHive selects a GPU or CPU backend, and how to force CPU mode."
---

# GPU vs CPU

NeoHive uses your hardware to index and search your code and knowledge. It runs faster with a GPU but works fine on CPU.

## Auto-detection

The installer detects your hardware and picks the best backend automatically:

| Hardware | Backend |
|----------|---------|
| NVIDIA GPU | CUDA |
| AMD GPU | ROCm |
| Intel / other GPU | Vulkan |
| No GPU | CPU |

In most cases you don't need to configure anything.

{% hint style="info" %}
**macOS (Apple Silicon)** and ARM Linux hosts (e.g. AWS Graviton) run the CPU backend, which NeoHive is optimised for, so performance is strong with no GPU needed.
{% endhint %}

## Forcing a backend

If detection picks the wrong backend, or a GPU backend fails to start, set `NEOHIVE_BACKEND` to the one you want: `cpu`, `cuda`, `vulkan`, or `rocm`. Forcing CPU is the most common case:

```sh
NEOHIVE_BACKEND=cpu bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

A forced backend is used as-is. NeoHive won't fall back to a different one, so a value your machine can't run fails rather than quietly downgrading. CPU mode runs everywhere and is only slower for indexing large repositories; day-to-day use is fast on either backend. When the installer detects a backend problem, it suggests the CPU command for you.

## NVIDIA Container Toolkit

If you have an NVIDIA GPU but the container fails to start on the CUDA backend, the usual cause is a missing [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html). Having `nvidia-smi` on the host is not enough on its own, because the container needs the toolkit to reach the GPU. Install it, restart Docker, and run the installer again. This catches out Docker Desktop and WSL2 setups most often. The installer flags it when it detects the problem.
