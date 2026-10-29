---
description: "Who can reach a NeoHive instance, and how to run one instance for a whole team."
---

# Access and sharing

NeoHive runs on one machine, and anyone who can reach that machine on NeoHive's port, `3577` by default, can use it. NeoHive has no user accounts, roles, or logins, so everyone who connects can read and write everything and sees the same [Hives](../concepts/glossary.md#hive). Check who can reach the machine before you install NeoHive on a network that other people use.

This page explains who can reach a default install, and shows how to share one instance with your team.

A Hive is the workspace your agent connects to, and an [Index](../concepts/glossary.md#index) is one store of searchable context inside a Hive. For more terms, see the [NeoHive glossary](../concepts/glossary.md).

<figure><img src="../.gitbook/assets/admin-access.svg" alt="NeoHive serves the dashboard and every MCP endpoint over plain HTTP on port 3577. This machine always reaches NeoHive at localhost:3577. By default, other machines on the same network reach NeoHive at the machine's IP address. If you work alone, block port 3577 in your firewall. Agents outside your network should reach NeoHive only through an authenticating proxy you run, over HTTPS."><figcaption></figcaption></figure>

## A default install is open to your network

The installer publishes NeoHive's port on every network interface, not only on `localhost`. When the install finishes, the installer prints both addresses, for example:

```text
On this machine:    http://localhost:3577
From another host:  http://192.168.1.20:3577
```

On shared or public Wi-Fi, anyone on that network can open the second address. If only you use NeoHive, block inbound traffic to port `3577` at your network firewall. For details, see [Exposing NeoHive beyond your network](../security/network.md#the-default-install-is-reachable-from-your-network).

## Share one instance with your team

NeoHive stores [Memories](../concepts/glossary.md#memory) on the instance. When one person stores a convention as a Memory, every agent connected to the same Hive can recall that convention.

To share one instance with your team, do the following:

{% stepper %}
{% step %}
## Install on a shared machine

Choose a host that your team reaches over a trusted network, such as a company VPN. Install NeoHive on that host by following [Install NeoHive](../get-started/install.md). Note the host's IP address, such as `192.168.1.20`. A hostname such as `neohive.internal` also works.
{% endstep %}

{% step %}
## Open the dashboard by that address

Each teammate opens the host's address in a browser, for example `http://192.168.1.20:3577`. **Install Instructions** on each Hive page builds its commands from the address in the browser, so the commands already point at the shared host.
{% endstep %}

{% step %}
## Connect each agent

Each teammate runs the commands for their agent. Each Hive's [MCP](../concepts/glossary.md#mcp) endpoint looks like this:

```text
http://192.168.1.20:3577/hives/<hive-id>/mcp
```
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** each teammate's agent calls `list_indexes` and sees the same Indexes. **Tool usage** on the Hive page counts requests per kind of agent, so two teammates on Claude Code share one bar.
{% endhint %}

To reach NeoHive from outside a trusted network, put an authenticating proxy in front of NeoHive. An authenticating proxy is a server that checks who is connecting before it passes requests on. Do not open the port instead. For details, see [Exposing NeoHive beyond your network](../security/network.md).
