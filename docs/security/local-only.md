---
description: "What NeoHive keeps on your machine, every outbound connection it makes, when each one happens, and whether you can turn it off."
---

# What stays on your machine

NeoHive runs on your own machine or on a shared server for your team. NeoHive stores and searches your content there, but the NeoHive container still connects to a few outside services, for example to check your license.

An outbound connection is a request that NeoHive starts to another server. Before a security review or a firewall change, check what each connection sends and whether you can block it. The following diagram shows what stays on the machine and what leaves it:

<figure><img src="../.gitbook/assets/security-local-only.svg" alt="Your content stays in the NeoHive container. Arrows leave for the license, metrics, update, model, data source, dashboard asset, and provider connections."><figcaption></figcaption></figure>

**NeoHive keeps your content on the machine it runs on.** Your content means your code, documents, [Memories](../concepts/glossary.md#memory), and recall queries. NeoHive also stores your repository tokens there and sends each token only to its own provider. NeoHive clones, indexes, and embeds your repositories on that machine, and stores the clones and their [Indexes](../concepts/glossary.md#index) in the `neohive-data` Docker volume.

## Outbound connections

Your content stays on the machine, but the NeoHive container makes the following outbound connections:

| Connection | Goes to | When | What it sends | Can you turn it off? |
|---|---|---|---|---|
| License check | `api.keygen.sh` | At start, once a day, about every hour as a heartbeat, and when the container stops. Also when you change or recheck your license key in the dashboard | Your license key, a random machine ID, and the container's platform and host name. The host name is the container's ID, not your computer's name | No. NeoHive needs a successful license check at least once every 72 hours. For more information, see [Check your license status](../admin/licensing.md#check-your-license-status). |
| Usage metrics | A Grafana Cloud OpenTelemetry endpoint | Every minute while usage metrics are turned on. They're on by default | Counts, timings, and request details, described after this table | Yes. On the **Settings** page, under **Anonymous Telemetry**, turn off **Share anonymous performance data with the NeoHive team**. NeoHive keeps working |
| Update check | `hub.docker.com` and `raw.githubusercontent.com` | A minute after start, then once a day. Also when you click the refresh button in the **NeoHive updates** panel | Nothing. The check reads the published version list and changelog | No setting exists. If you block both hosts, the dashboard stops showing new versions |
| Model download | `huggingface.co` | When an embedding model isn't cached in the container yet. An update replaces the container, so the first use after an update downloads the model again. The PDF converter's models come with the container | Only the request for the file | No. The downloads stop after the model is cached |
| Data sources | `github.com`, `api.github.com`, `gitlab.com`, or your own GitLab host. A connection with an SSH key uses SSH on port `22` | When you add a connection or an Index, on each sync, and when NeoHive checks a connection. Syncs also run on a schedule | Your stored token or SSH key, to authenticate | Yes. Remove the Index and its connection |

Usage metrics never include file contents, Memory text, recall queries, or tokens. Instead, they record how NeoHive runs: the NeoHive version, a hashed license ID, the random machine ID, and counts and timings, such as how many Memories a [Hive](../concepts/glossary.md#hive) holds. For each request, they also record the IP address and user agent of the agent or browser that sent the request, and the request's path and query string. The query string can hold text that you typed into the dashboard, such as a repository search. When a request fails, usage metrics add its error message and stack trace.

Each start of the container sends one batch of runtime statistics before NeoHive reads your setting, even when usage metrics are turned off.

{% hint style="warning" %}
**The license check needs the internet at least once every 72 hours.** On a network with a strict firewall, allow outbound HTTPS to `api.keygen.sh`. For more information about what happens when the check can't reach the internet, see [Check your license status](../admin/licensing.md#check-your-license-status).
{% endhint %}

## Connections from other parts of your setup

These connections don't come from the container, but they involve NeoHive. They come from the installer, your browser, and the agent plugins. If you set up a firewall, check the following connections too:

| Connection | Goes to | When |
|---|---|---|
| The installer | `raw.githubusercontent.com`, Docker Hub, `api.keygen.sh` | When you run `install.sh` to install or update |
| The dashboard's fonts | `fonts.googleapis.com`, `fonts.gstatic.com` | When your browser opens `http://localhost:3577` |
| The dashboard's release notes | `cdn.headwayapp.co` and Headway's servers | When your browser opens the dashboard. The release notes in the sidebar load from Headway |
| The metrics page's charts | `cdn.jsdelivr.net` | When your browser opens `http://localhost:3577/metrics` |
| Smart prompt rewriting | The model provider that your `claude` CLI uses | Only after you run `/neohive:enable-smart-prompts`. The rewriting sends your prompt and the recalled results so a small model can rewrite and filter them |

On a Mac with Apple Silicon, the installer can run embedding in a separate NeoHive worker on the Mac itself, outside Docker. The worker still runs on your machine. The worker downloads its embedding model from `huggingface.co` the first time it needs the model.

The Claude Code plugin writes a log of each session's NeoHive calls, including query text, to `~/.claude/neohive/sessions/` on your computer. The plugin doesn't send this log anywhere.

{% hint style="info" %}
NeoHive returns context to your agent, and your agent sends that context to its own model provider as part of the conversation. Your agent's provider, not NeoHive, decides what happens to that context.
{% endhint %}
