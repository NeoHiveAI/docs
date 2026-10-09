---
description: "What NeoHive keeps on your machine, every outbound connection it makes, when each one happens, and whether you can turn it off."
---

# What stays on your machine

NeoHive runs on your own machine or on a shared server for your team. NeoHive stores and searches your content there. The NeoHive container still connects to a few outside services, for example to check your license.

An outbound connection is a request that NeoHive starts to another server. The following table lists each one, what it sends, and whether you can block it. Use the table for a security review, or when you set up a firewall for the NeoHive server.

<figure><img src="../.gitbook/assets/security-local-only.svg" alt="Your content stays in the NeoHive container on your machine. Usage metrics never carry files, Memories, or recall queries. Arrows leave the machine for the license check, usage metrics, the update check, model downloads, your data sources, dashboard fonts, and your agent's own model provider."><figcaption></figcaption></figure>

**Your content never leaves the machine NeoHive runs on.** Your content means your code, documents, [Memories](../concepts/glossary.md#memory), recall queries, and repository tokens. NeoHive clones, indexes, and embeds your repositories on that machine. NeoHive stores the clones and their [Indexes](../concepts/glossary.md#index) in the `neohive-data` Docker volume. However, NeoHive is not fully offline. The container makes the connections listed in the next section.

## Outbound connections

| Connection | Goes to | When | What it sends | Can you turn it off? |
|---|---|---|---|---|
| License check | `api.keygen.sh` | At start, once a day, about every hour as a heartbeat, and when the container stops. Also when you change or recheck your license key in the dashboard | Your license key, a random machine ID, and the container's platform and host name. The host name is the container's ID, not your computer's name | No. See the license warning later on this page |
| Usage metrics | A Grafana Cloud OpenTelemetry endpoint | Every minute while usage metrics are turned on. They are on by default | Metrics and traces, described after this table | Yes. On the **Settings** page, under **Anonymous Telemetry**, turn off **Share anonymous performance data with the NeoHive team**. NeoHive keeps working |
| Update check | `hub.docker.com` and `raw.githubusercontent.com` | A minute after start, then once a day. Also when you select the refresh button in the **NeoHive updates** panel | Nothing. The check reads the published version list and changelog | No setting exists. If you block both hosts, the dashboard stops showing new versions |
| Model download | `huggingface.co` | When an embedding model is not cached in the container yet. An update replaces the container, so the first use after an update downloads the model again. The PDF converter's models come with the container | Only the request for the file | No. The downloads stop once the model is cached |
| Data sources | `github.com`, `api.github.com`, `gitlab.com`, or your own GitLab host. A connection with an SSH key uses SSH on port `22` | When you add a connection or an Index, on each sync, and when NeoHive checks a connection. Syncs also run on a schedule | Your stored token or SSH key, to authenticate | Yes. Remove the Index and its connection |

Usage metrics send two kinds of data. Both carry the NeoHive version, a hashed license ID, and the random machine ID.

- **Metrics:** request counts and timings, [MCP](../concepts/glossary.md#mcp) tool names, [Hive](../concepts/glossary.md#hive) and Index IDs, counts of Memories, chunks, and files, embedding batch sizes and timings, and Node.js runtime statistics.
- **Traces:** the name, duration, and outcome of each request and tool call. A request's trace also holds the request path and query string, and the IP address and user agent of the agent or browser that sent the request. A failed request adds the error message and stack trace.

Usage metrics never include file contents, Memory text, recall query text, or tokens. Usage metrics record a Memory's length, not its words. A query string can still hold text you typed into the dashboard. For example, a search for a repository sends the search text.

NeoHive starts usage metrics before it reads your setting. When usage metrics are turned off, each start of the container still sends one batch of Node.js runtime statistics before they stop.

{% hint style="warning" %}
**The license check needs the internet at least once every 72 hours.** On a network with a strict firewall, allow outbound HTTPS to `api.keygen.sh`. For what happens when the check cannot reach the internet, see [Check your license status](../admin/licensing.md#check-your-license-status).
{% endhint %}

## Connections from other parts of your setup

These connections do not come from the container, but they involve NeoHive. They come from the installer, your browser, and the Claude Code plugin. Check them too when you set up a firewall.

| Connection | Goes to | When |
|---|---|---|
| The installer | `raw.githubusercontent.com`, Docker Hub, `api.keygen.sh` | When you run `install.sh` to install or update |
| The dashboard's fonts | `fonts.googleapis.com`, `fonts.gstatic.com` | When your browser opens `http://localhost:3577` |
| The dashboard's release notes | `cdn.headwayapp.co` and Headway's servers | When your browser opens the dashboard. The release notes in the sidebar load from Headway |
| The metrics page's charts | `cdn.jsdelivr.net` | When your browser opens `http://localhost:3577/metrics` |
| Smart prompt rewriting | The model provider that your `claude` CLI uses | Only after you run `/neohive:enable-smart-prompts`. The rewriting sends your prompt and the recalled results so a small model can rewrite and filter them |

On a Mac with Apple Silicon, the installer can run embedding in a separate NeoHive worker on the Mac itself, outside Docker. The worker still runs on your machine. The worker downloads its embedding model from `huggingface.co` the first time it needs the model.

The Claude Code plugin writes a log of each session's NeoHive calls, including query text, to `~/.claude/neohive/sessions/` on your computer. The plugin does not send this log anywhere.

{% hint style="info" %}
NeoHive returns context to your agent, and your agent sends that context to its own model provider as part of the conversation. Your agent's provider, not NeoHive, decides what happens to that context.
{% endhint %}
