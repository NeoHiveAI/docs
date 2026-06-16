---
title: "Welcome"
description: "The context engineering layer that makes your coding agents aware of your codebase and your team's knowledge."
---

Coding agents are powerful. Without context, they're guessing: recommending deprecated libraries, hallucinating APIs that don't exist, and ignoring your team's conventions. NeoHive is the context engineering layer that makes Claude, Cursor, Copilot, and every other coding agent aware of your actual codebase.

## The problem

Your coding agent doesn't know your code. It doesn't know your team's conventions. It doesn't know that you migrated off that library last quarter, or that the function it just confidently called doesn't exist. Every session starts from zero, and you spend your time correcting instead of shipping.

Pasting code into chat windows doesn't scale. You're limited by context window size, it requires manual effort every time, and static files like `CLAUDE.md` become unsearchable walls of text as they grow.

## What NeoHive does

NeoHive runs as a local Docker container and connects to your coding agents via MCP. It indexes your repositories, learns your conventions, and feeds the right context to your agent at the right time.

- **Aware of your codebase.** NeoHive indexes your repositories and makes them searchable by meaning. Your agent finds the right code by understanding what it does, not by guessing at filenames.
- **Learns your team's knowledge.** Conventions, architectural decisions, debugging insights, and gotchas are stored as searchable, persistent knowledge. What one person teaches their agent benefits everyone.
- **Works across all your tools.** Claude Code, Cursor, Copilot, Windsurf, Codex. NeoHive provides context to whichever agent you're using. Your team isn't locked into one tool.
- **Private and local.** Everything runs inside the container on your machine. Zero outbound calls. No code leaves your environment.

Setup takes under 30 minutes from install to your first context-aware answer.

## Better with your whole team

NeoHive gets more powerful as more people use it. When one person corrects their agent, teaches it a convention, or debugs a tricky issue, that knowledge is available to every agent connected to the same project. A teammate who joins next month starts with all the context the team has already built up, no onboarding doc required.

This is the difference between per-user memory (which only helps you) and shared context (which helps everyone). NeoHive is designed around the team as the unit of knowledge, not the individual.

## Next steps

Head to [Getting Started](/getting-started/) to install NeoHive and connect your first agent.
