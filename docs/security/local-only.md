---
description: "What NeoHive keeps on your machine, every outbound connection it makes, when each one happens, and whether you can turn it off."
---

# What stays on your machine

This page lists every outbound connection NeoHive makes, what each one sends, and which ones you can block.

<figure><img src="../.gitbook/assets/security-local-only.svg" alt="Your content stays in the NeoHive container on your machine. Arrows leave the machine for the license check, usage metrics, the update check, model downloads, your data sources, dashboard fonts, and your agent's own model provider."><figcaption></figcaption></figure>

**Your content never leaves your machine.** Your content means your code, documents, [Memories](../concepts/glossary.md#memory), recall queries, and repository tokens. NeoHive clones, indexes, and embeds your repositories on your machine. NeoHive stores the clones and their [Indexes](../concepts/glossary.md#index) in the `neohive-data` Docker volume. However, NeoHive is not fully offline. The container makes the connections listed in the next section.

## Outbound connections

| Connection | Goes to | When | What it sends | Can you turn it off? |
|---|---|---|---|---|
| License check | `api.keygen.sh` | At start, once a day, about every hour as a heartbeat, and when the container stops | Your license key, a random machine ID, and the container's platform and host name | No. See the license warning later on this page |
| Usage metrics | A Grafana Cloud OpenTelemetry endpoint | Every minute while usage metrics are turned on. They are on by default | Metrics: request counts and timings; [MCP](../concepts/glossary.md#mcp) tool names; [Hive](../concepts/glossary.md#hive) and Index IDs; counts of Memories, chunks, and files; and Node.js runtime statistics. Traces: the name, duration, and outcome of each request and tool call, with the request path and the error message when one fails. Both carry the NeoHive version, a hashed license ID, and the random machine ID | Yes. On the **Settings** page, under **Anonymous Telemetry**, turn off **Share anonymous performance data with the NeoHive team**. NeoHive keeps working |
| Update check | `hub.docker.com` and `raw.githubusercontent.com` | A minute after start, then once a day | Nothing. The check reads the published version list and changelog | No setting exists. If you block both hosts, the dashboard stops showing new versions |
| Model download | `huggingface.co` | When an embedding model or the PDF converter's model is not cached in the container yet. An update replaces the container, so the first use after an update downloads the models again | Only the request for the file | No. The downloads stop once the model is cached |
| Data sources | `github.com`, `api.github.com`, `gitlab.com`, your own GitLab host, or your Jira site | When you add a connection or an Index, on each sync or import, and when NeoHive checks a connection | Your stored token, to authenticate | Yes. Remove the Index and its connection |

Usage metrics never include file contents, Memory text, recall query text, or tokens. Usage metrics record a Memory's length, not its words.

{% hint style="warning" %}
**The license check needs the internet at least once every 72 hours.** If `api.keygen.sh` is unreachable, NeoHive keeps running for 72 hours from the last successful check. After that, NeoHive stops at its next daily check. On a network with a strict firewall, allow outbound HTTPS to `api.keygen.sh`.
{% endhint %}

## Connections from other parts of your setup

These connections do not come from the container, but they involve NeoHive.

| Connection | Goes to | When |
|---|---|---|
| The installer | `raw.githubusercontent.com`, Docker Hub, `api.keygen.sh` | When you run `install.sh` to install or update |
| The dashboard's fonts | `fonts.googleapis.com`, `fonts.gstatic.com` | When your browser opens `http://localhost:3577` |
| Smart prompt rewriting | The Anthropic API, through the `claude` CLI | Only after you run `/neohive:enable-smart-prompts`. The rewriting sends your prompt and the recalled results so a small model can rewrite and filter them |

On a Mac with Apple Silicon, the installer can run embedding in a separate NeoHive worker on the Mac itself, outside Docker. The worker still runs on your machine.

The Claude Code plugin writes a log of each session's NeoHive calls, including query text, to `~/.claude/neohive/sessions/` on your computer. The plugin does not send this log anywhere.

{% hint style="info" %}
NeoHive returns context to your agent, and your agent sends that context to its own model provider as part of the conversation. Your agent's provider, not NeoHive, decides what happens to that context.
{% endhint %}

## Next step

Continue to [Credentials and secrets](credentials.md).
