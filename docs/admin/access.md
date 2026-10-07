---
description: "Who can reach a NeoHive instance, and how to run one instance for a whole team."
---

# Access and sharing

This page explains who can reach your NeoHive instance and how to point a whole team at one shared instance.

NeoHive has no user accounts, roles, or logins. Anyone who can reach port `3577` can read and write everything, and everyone sees the same Hives. A Hive is the workspace your agent connects to, and an Index is one store of searchable context inside a Hive. For more terms, see the [NeoHive glossary](../concepts/glossary.md).

<figure><img src="../.gitbook/assets/admin-access.svg" alt="NeoHive serves the dashboard and every Model Context Protocol (MCP) endpoint over plain HTTP on port 3577. This machine always reaches NeoHive at localhost:3577. By default, other machines on the same network reach NeoHive at the machine's IP address. If you work alone, block port 3577 in your firewall. Agents outside your network should reach NeoHive only through an authenticating proxy you run, over HTTPS."><figcaption></figcaption></figure>

## A default install is open to your network

The installer publishes port `3577` on every network interface, not only `localhost`. The installer prints both addresses when it finishes:

```text
On this machine:    http://localhost:3577
From another host:  http://<this-machine-ip>:3577
```

On shared or public Wi-Fi, anyone on that network can open the second address. If only you use NeoHive, block inbound traffic to port `3577` in your firewall.

## Share one instance with your team

NeoHive stores Memories on the instance. When one person stores a convention as a Memory, every agent connected to the same Hive can recall that convention.

To share one instance with your team, do the following:

{% stepper %}
{% step %}
## Install on a shared machine

Choose a host that your team reaches over a trusted network, such as a company virtual private network (VPN). Note the host's address, for example `neohive.internal`.
{% endstep %}

{% step %}
## Open the dashboard by that address

Each teammate opens `http://neohive.internal:3577`. **Install Instructions** builds its commands from the address in the browser, so the commands already point at the shared host.
{% endstep %}

{% step %}
## Connect each agent

Each teammate runs the commands for their agent. Each Hive's Model Context Protocol (MCP) endpoint looks like this:

```text
http://neohive.internal:3577/hives/<hive-id>/mcp
```
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** each teammate's agent calls `list_indexes` and sees the same Indexes. **Tool usage** on the Hive page counts requests per kind of agent, so two teammates on Claude Code share one bar.
{% endhint %}

To reach NeoHive from outside a trusted network, put an authenticating proxy in front of NeoHive. An authenticating proxy is a server that checks who is connecting before it passes requests on. Do not open the port instead. For details, see [Exposing NeoHive beyond your network](../security/network.md).

## Next step

To check what your Hives return before your agents rely on them, continue to [Test queries in the Playground](playground.md).
