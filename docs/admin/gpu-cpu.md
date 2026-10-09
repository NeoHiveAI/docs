---
description: "How the NeoHive installer picks a GPU or CPU backend, how Apple Silicon gets GPU embedding, and how to force a backend."
---

# GPU and CPU

NeoHive runs its models on a backend, which is the type of processor it uses, such as a GPU or the CPU. A GPU makes indexing large repositories faster. Day-to-day recall is fast on any backend, and the CPU backend runs on every machine. The installer chooses the backend for you. If indexing is slow or your GPU sits unused, confirm which backend the installer chose, and change the backend if needed.

<figure><img src="../.gitbook/assets/admin-gpu-cpu.svg" alt="The installer checks these conditions in order and uses the first one that is true. If the machine is arm64 or aarch64, NeoHive uses CPU, and Apple Silicon also gets the Metal worker. If nvidia-smi works and a test container can reach the GPU, NeoHive uses CUDA. If nvidia-smi works but the test fails, NeoHive uses CPU and shows a toolkit warning. If rocm-smi works, NeoHive uses ROCm. If vulkaninfo works, NeoHive uses Vulkan. Otherwise, NeoHive uses CPU. If an image is missing, CUDA and ROCm fall back to Vulkan, then CPU. A backend forced with NEOHIVE_BACKEND never falls back."><figcaption></figcaption></figure>

{% hint style="success" %}
**Check:** To see which backend is running, run the following command:

```bash
docker ps --filter name=neohive
```

The tag in the `IMAGE` column names the backend, for example `neohivedev/neohive:cuda`, or `v1.6.3-cpu` for a versioned image.
{% endhint %}

## Apple Silicon uses the GPU anyway

Docker on a Mac cannot reach the GPU, so the container runs on CPU. On Apple Silicon, the installer also sets up the [Metal worker](../concepts/glossary.md#metal-worker), a program that runs directly on macOS. The worker runs embedding on the Mac's Metal GPU. Embedding is the step that turns text into numbers for search. With the worker, indexing is much faster.

- **The worker runs outside Docker,** from `~/.neohive/metal-worker/`, and starts again after a reboot.
- **The worker listens on `127.0.0.1` only,** port `50051` by default, so other machines on your network cannot reach it.
- **Models download to `~/.neohive/models/`** on first use. Logs go to `~/.neohive/logs/`.
- **If any part fails,** the installer warns you and NeoHive embeds on CPU inside the container.

The end of the install output tells you which embedding setup you have: `Embedding: native Metal worker on 127.0.0.1:50051`, or `Embedding: in-container CPU (no Metal worker)`.

To skip the worker, set `NEOHIVE_METAL_WORKER` when you run the installer. To move the worker to another port, set `NEOHIVE_METAL_WORKER_PORT`. For the values and defaults, see the [Installer](../reference/environment-variables.md#installer) variables.

## Force a backend

If the installer picks the wrong backend, or a GPU backend does not start, set `NEOHIVE_BACKEND` to `cpu`, `cuda`, `vulkan`, or `rocm`:

```bash
NEOHIVE_BACKEND=cpu \
  bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

A forced backend has no fallback. If the installer cannot download the image for that backend, the install stops with an error. The installer does not remember `NEOHIVE_BACKEND`, so set the variable again on every update.

## NVIDIA GPU but NeoHive runs on CPU

A working `nvidia-smi` on the host is not enough. The container reaches the GPU through the [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html). Without the toolkit, the installer's test container fails, and the installer shows this warning: `NVIDIA Container Toolkit probe failed - falling back to CPU backend.`

This problem happens most often on Docker Desktop and Windows Subsystem for Linux (WSL2). To fix the problem, do the following:

1. Install the NVIDIA Container Toolkit.
2. Restart Docker.
3. Run the installer again.

The installer no longer shows the warning, and the `IMAGE` column of `docker ps` shows a `cuda` tag.
