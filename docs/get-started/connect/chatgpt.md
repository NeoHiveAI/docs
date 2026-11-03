---
description: "Connect the ChatGPT desktop app to a Hive as a custom MCP server."
---

# ChatGPT

To connect ChatGPT, you add your [Hive](../../concepts/glossary.md#hive) (your team's NeoHive workspace) to the ChatGPT desktop app as a custom [MCP](../../concepts/glossary.md#mcp) server. ChatGPT has no NeoHive plugin, so you add instructions that tell ChatGPT when to use NeoHive's tools.

Before you start, you need the ChatGPT desktop app and a running NeoHive server that has a Hive. The desktop app connects from your computer, so it can reach a NeoHive server at `localhost`.

## Add the MCP server

ChatGPT has no configuration file to paste into. Instead, you fill in a form, and the dashboard shows the value for each field. To add the Hive to ChatGPT, do the following:

1. Open the Hive in the dashboard.
2. Go to **Install Instructions**.
3. Click **ChatGPT**.
4. In the ChatGPT desktop app, open **Settings**, click **Plugins**, and then click **Add MCP server**.
5. In **Connect to a custom MCP**, fill in the fields with the values from the dashboard:

   | Field | Value |
   |---|---|
   | **Name** | The Hive's name |
   | **Type** | **Streamable HTTP** |
   | **URL** | The Hive's MCP endpoint, such as `http://localhost:3577/hives/<hive-id>/mcp` |
   | **Headers** | Click **Add header**, and then enter `x-mcp-client` in **Key** and `chatgpt` in **Value** |

6. Click **Save**.

NeoHive appears under **Servers**. The header tells NeoHive which app connected, so the dashboard can mark **ChatGPT** as connected.

{% hint style="info" %}
If NeoHive sits behind a proxy that checks a token, also add the header your proxy expects under **Headers**, such as `Authorization` with the value `Bearer <your-token>`. For more information, see [Expose NeoHive beyond your network](../../security/network.md).
{% endhint %}

## Tell ChatGPT to use NeoHive

Without instructions, ChatGPT calls NeoHive's tools only when you ask it to. To make ChatGPT check NeoHive on its own, open **Settings**, click **Personalization**, and paste the instructions from [Tell your agent to use NeoHive](README.md#tell-your-agent-to-use-neohive) into your custom instructions.

{% hint style="success" %}
**Check:** ChatGPT can reach the Hive.

In a new chat, ask ChatGPT: `List my NeoHive Indexes.` ChatGPT calls `list_indexes` and lists the [Indexes](../../concepts/glossary.md#index), or content stores, in the Hive. The dashboard's **Install Instructions** panel also marks **ChatGPT** as connected.

If ChatGPT doesn't call the tool, compare the **URL** in ChatGPT with the endpoint in the dashboard. Then see [Agent can't connect](../../troubleshooting/connection.md).

If ChatGPT lists the Indexes but the dashboard doesn't mark **ChatGPT** as connected, open the server in ChatGPT and check that the header has the key `x-mcp-client` and the value `chatgpt`.
{% endhint %}

## Next step

ChatGPT is connected, so you can skip the pages for other agents. Continue with [Your first session](../first-session.md).
