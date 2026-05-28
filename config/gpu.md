# GPU vs CPU

NeoHive runs locally and uses your hardware to index and search your code and knowledge. This runs faster with a GPU but works fine on CPU.

## Auto-detection

The installer automatically detects your hardware and selects the best backend:

- **NVIDIA GPU** — uses CUDA
- **AMD GPU** — uses ROCm
- **Intel/other GPU** — uses Vulkan
- **No GPU** — falls back to CPU

**macOS (Apple Silicon):** Macs with M-series chips run the CPU backend. NeoHive is optimised for Apple Silicon, so performance is excellent — no GPU backend needed. The same applies to ARM Linux hosts like AWS Graviton.

In most cases, you don't need to configure anything.

## Forcing CPU mode

If GPU detection picks the wrong backend, or the GPU backend fails to start, force CPU mode:

```sh
NEOHIVE_BACKEND=cpu bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

CPU mode runs everywhere but is slower for indexing large repositories. Day-to-day use is fast on either backend.

If the installer detects a backend issue, it will suggest this command automatically.

## NVIDIA Container Toolkit

If you have an NVIDIA GPU and the container fails to start, make sure the [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) is installed. The installer will tell you if it's missing.
