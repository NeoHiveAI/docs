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
**macOS (Apple Silicon)** and ARM Linux hosts (e.g. AWS Graviton) run the CPU backend — NeoHive is optimised for it, so performance is excellent with no GPU backend needed.
{% endhint %}

## Forcing CPU mode

If detection picks the wrong backend, or a GPU backend fails to start, force CPU mode:

```sh
NEOHIVE_BACKEND=cpu bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

CPU mode runs everywhere; it's just slower for indexing large repositories. Day-to-day use is fast on either backend. If the installer detects a backend issue, it suggests this command automatically.

## NVIDIA Container Toolkit

If you have an NVIDIA GPU and the container fails to start, make sure the [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) is installed. The installer will tell you if it's missing.
