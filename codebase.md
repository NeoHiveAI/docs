# Indexing Your Codebase

NeoHive can index your GitHub or GitLab repositories so your agents can search your source code by meaning. Instead of grepping for a function name, your agent can ask "how does the sync engine handle retries?" and get back the relevant code — grounded in what's actually in your codebase.

## Adding a repository

1. Open the NeoHive dashboard at `http://localhost:3577`
2. Navigate to your project
3. Create a new **repo hive**
4. Enter the repository URL and provide credentials (a personal access token or SSH key)
5. Start the initial sync

The initial sync clones the repository and indexes every file. This can take a few minutes for large repos — you'll see progress in the dashboard as it runs.

### What gets indexed

NeoHive indexes code files, markdown, and other text-based content. Binary files, images, and vendored dependencies are skipped automatically. The index understands the structure of your code, not just keywords — so your agent can find relevant code by describing what it does.

## Keeping it fresh

Once a repo hive is set up, NeoHive keeps it in sync automatically. It runs periodic syncs on a schedule (configurable in the dashboard) and only re-indexes files that have changed since the last sync. You don't need to trigger this manually.

## Using indexed code

Once your codebase is indexed, your agent searches it naturally alongside stored knowledge. When you ask a question like:

> "Where do we handle webhook retries?"

> "Show me how the authentication middleware works"

> "What does the billing module do when a payment fails?"

Your agent queries NeoHive, which returns relevant code snippets from the indexed repository alongside any related conventions, decisions, or insights stored in your knowledge hives. The results come back as a single merged list — your agent doesn't need to know whether the answer came from code or from stored knowledge.
