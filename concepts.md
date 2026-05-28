# Core Concepts

NeoHive connects your coding agents to your codebase and your team's accumulated knowledge. It organizes this context into **projects**, **hives**, and **memories**.

## Projects

A project is a workspace. It keeps context separate between unrelated work. Your frontend app and your infrastructure tooling don't need to share the same knowledge.

You create projects through the NeoHive dashboard at `http://localhost:3577`. Each project gets its own MCP endpoint that your agents connect to.

Most people have one project per codebase or team. If two codebases share a lot of context (e.g., a monorepo), they can share a project. If they're unrelated, give them separate projects.

## Hives

A hive is a container for a specific kind of context within a project. Each hive has its own database and is tuned for its content type.

There are three kinds of hives:

- **Repo hives** hold indexed source code from a GitHub or GitLab repository. This is how NeoHive makes your agent aware of your actual codebase, letting it search your code by meaning, not just by filename or keyword. See [Indexing Your Codebase](codebase.md) for setup.

- **Document hives** hold uploaded files: markdown, text, PDFs. Use these for content that doesn't live in a git repository, like runbooks, onboarding guides, or design docs. Drag and drop files into a document hive through the dashboard.

- **Knowledge hives** are where your agents store and retrieve learned context: conventions, decisions, insights, corrections. A knowledge hive is created when you set up a project. Your agents read from and write to it during normal use without any intervention from you.

A project can have multiple hives of any type. When your agent searches for something, it searches across all hives in the project and merges the results. You don't need to tell it which hive to look in. A single query can return the relevant code, the relevant convention, and the relevant document together.

## Memories

A memory is a single piece of stored knowledge in a knowledge hive: a convention, a decision, an insight, a rule. Your agent creates and retrieves these as you work. When you tell your agent to remember something, or it discovers something worth keeping, it gets stored as a memory and comes back in future sessions when relevant.
