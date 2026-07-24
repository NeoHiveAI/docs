---
description: >-
  The context engineering layer that makes your coding agents aware of your
  codebase and your team's knowledge.
---

# Welcome

NeoHive makes Claude, Cursor, Copilot, and every MCP agent aware of your actual codebase and your team's knowledge, indexed locally, on your machine.

## The problem

Your coding agent doesn't know your code. It doesn't know your team's conventions, that you migrated off that library last quarter, or that the function it just confidently called doesn't exist. Every session starts from zero, and you spend your time correcting instead of shipping.

Pasting code into chat windows doesn't scale: you're capped by the context window, it's manual every time, and static files like `CLAUDE.md` grow into unsearchable walls of text.

## What NeoHive does

NeoHive runs as a local Docker container and connects to your agents over MCP. It indexes your repositories, learns your conventions, and feeds the right context to your agent at the right moment.

<table data-view="cards"><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td><i class="fa-magnifying-glass">:magnifying-glass:</i></td><td><strong>Aware of your codebase</strong></td><td>Indexes your repositories and makes them searchable by meaning: your agent finds the right code by understanding what it does, not by guessing at filenames.</td></tr><tr><td><i class="fa-book-open">:book-open:</i></td><td><strong>Learns your team's knowledge</strong></td><td>Conventions, decisions, debugging insights, and gotchas are stored as searchable, persistent memory. What one person teaches their agent benefits everyone.</td></tr><tr><td><i class="fa-puzzle-piece">:puzzle-piece:</i></td><td><strong>Works across every tool</strong></td><td>Claude Code, Claude App, Cursor, Codex, Copilot, Windsurf: NeoHive feeds context to whichever agent you use. Your team isn't locked into one.</td></tr><tr><td><i class="fa-laptop">:laptop:</i></td><td><strong>Private and local</strong></td><td>Everything runs in a container on your machine. Zero outbound calls: no code leaves your environment.</td></tr></tbody></table>

Setup takes under 30 minutes, from install to your first context-aware answer.

## Better with your whole team

NeoHive gets more powerful as more people use it. When one person corrects their agent, teaches it a convention, or debugs a tricky issue, that knowledge is available to every agent connected to the same project. A teammate who joins next month starts with all the context the team has already built, no onboarding doc required.

That's the difference between per-user memory (which only helps you) and shared context (which helps everyone). NeoHive treats the team, not the individual, as the unit of knowledge.

## Start here

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Get Started</strong></td><td>Install NeoHive and connect your first agent in under 30 minutes.</td><td><a href="getting-started.md">getting-started.md</a></td></tr><tr><td><strong>Core Concepts</strong></td><td>Projects, hives, and how NeoHive organizes knowledge.</td><td><a href="concepts.md">concepts.md</a></td></tr><tr><td><strong>Indexing Your Codebase</strong></td><td>Connect your GitHub or GitLab repositories.</td><td><a href="codebase.md">codebase.md</a></td></tr><tr><td><strong>Migrating away from Markdown</strong></td><td>Bring your existing context files into NeoHive.</td><td><a href="migration.md">migration.md</a></td></tr></tbody></table>
