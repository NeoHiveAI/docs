---
description: "Save a GitHub or GitLab connection, select a repository and branch, and create a Code or Documentation Index."
---

# Connect GitHub or GitLab

Create a token, save it as a connection, select the repository, and then select **Create Index**. The first sync starts automatically. An [Index](../../concepts/glossary.md#index) is one store of searchable context inside a [Hive](../../concepts/glossary.md#hive), and a Hive is the workspace your agent connects to.

<figure><img src="../../.gitbook/assets/context-connect.svg" alt="The Add an Index dialog in six steps. First, on the Hive page, select + next to Indexes. Second, select the GitHub or GitLab card. Third, select Code or Documentation as the content type. Fourth, select or save a connection. Fifth, search for the repository or paste its URL. Sixth, select Create Index to start the first sync."><figcaption></figcaption></figure>

## Create a token

Create a personal access token (PAT) on GitHub or GitLab with the scopes in the following tabs. You can also use an SSH key. Scopes are the permissions the token grants. The connection form's **Create a PAT** link opens the provider's token page with the token name and scopes filled in.

{% tabs %}
{% tab title="GitHub" %}
Create a classic personal access token with the `repo` scope. The token starts with `ghp_`.

```text
https://github.com/settings/tokens/new?scopes=repo&description=NeoHive
```
{% endtab %}

{% tab title="GitLab" %}
Create a personal access token with the `read_api` and `read_repository` scopes. The token starts with `glpat-`.

```text
https://gitlab.com/-/user_settings/personal_access_tokens?name=NeoHive&scopes=read_api,read_repository
```

If you host your own GitLab, first enter your instance's address in **GitLab Base URL**. The **Create a PAT** link then opens your own instance. If you use `gitlab.com`, leave the field blank.
{% endtab %}

{% tab title="SSH key" %}
In the connection form, select the **SSH** tab and paste an SSH private key into **SSH Private Key**. The key needs read access to the repository. For example, you can use a deploy key, which is a key added to a single repository.
{% endtab %}
{% endtabs %}

## Create the Index

To create the Index, do the following:

1. Open your Hive at `http://localhost:3577`.
2. Next to **Indexes**, select **+**.
3. Select **GitHub** or **GitLab**.
4. Under **Content type**, select **Code**. If the Index holds only docs, select **Documentation** instead.
5. To use a saved connection, select the connection under **Connection**, and then skip to step 9. To add a connection, select **Add a new connection**. If you have no saved connection, NeoHive shows the connection form instead.
6. Enter a **Name**, such as `Work GitHub`.
7. Paste the token you created in [Create a token](#create-a-token) into **Personal Access Token**.
8. Select **Save connection**. NeoHive checks the token with the provider and does not save a token that the provider rejects. If you already saved the same token or account, NeoHive warns you and offers **Add anyway**.
9. Under **Repository**, select the repository from the list, or paste its URL into **Search repositories or paste a URL...**. If the list does not show a pasted repository, select its **Use** row, such as **Use acme/api**.
10. Check **Index name** and **Branch**. NeoHive fills both in from the repository. The Index name must be unique in the Hive. To use another branch, select it from the list.
11. Select **Create Index**.

NeoHive opens the new Index page and starts the first sync. The page header shows the progress.

NeoHive saves the connection, so for your next repository you can select it under **Connection** instead of adding a new one.

{% hint style="success" %}
**Check:** Open the Index's **Sync Settings** tab. **Sync history** shows the first run. When the run finishes, its status reads `success`.
{% endhint %}

## After you create the Index

Open the **Index Info** tab, and then fill in **Description**. Your agent reads the description through `list_indexes`, so name what the repository covers. For example, write `Billing and payments services: Stripe webhooks, retries, nightly reconciliation` rather than `repo index`.

<details>
<summary>Optional: switch to an embedding model made for code</summary>

A new [Code Index](../../concepts/glossary.md#code-index) uses an [embedding model](../../concepts/glossary.md#embedding-model) that handles both code and text. A `nomic-embed-code` model matches code more closely and needs a large GPU. To switch models, use the **Embedding model** setting on the **Index Info** tab. Changing the model makes NeoHive embed the whole Index again. For the models and which ones fit your machine, see [Embedding models](../../admin/embedding-models.md).

</details>

To add, check, or replace a connection without creating an Index, use the **Data Sources** page. See [Data sources and credentials](../../admin/data-sources.md).
