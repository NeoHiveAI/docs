---
description: "The habits, phrasing, and workflows that turn NeoHive from a passive index into compounding team memory."
---

# Getting the most out of NeoHive

NeoHive works out of the box, but it rewards a few small habits. Lean into these and it stops being a passive index and starts compounding into real institutional memory.

## Habits that unlock it

<table data-view="cards">
  <thead>
    <tr>
      <th width="52"></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><i class="fa-pencil"></i></td>
      <td><strong>Teach it as you go</strong></td>
      <td>The moment you correct the agent or make a decision, tell it to remember. A five-second "remember that…" saves the whole team from re-learning it later.</td>
    </tr>
    <tr>
      <td><i class="fa-magnifying-glass"></i></td>
      <td><strong>Ask like a teammate</strong></td>
      <td>When you want your agent to lean on the team's knowledge, describe the situation the way you'd explain it to a colleague — concrete beats vague.</td>
    </tr>
    <tr>
      <td><i class="fa-circle-check"></i></td>
      <td><strong>Let capture run</strong></td>
      <td>Don't skip the end-of-session capture. It's where the day's corrections and decisions become permanent, searchable memory.</td>
    </tr>
    <tr>
      <td><i class="fa-github"></i></td>
      <td><strong>Keep your repos fresh</strong></td>
      <td>Index the repositories you actually work in and let sync keep them current, so code answers reflect today's code — not last month's.</td>
    </tr>
    <tr>
      <td><i class="fa-star"></i></td>
      <td><strong>Use it as a team</strong></td>
      <td>The value compounds with people: one person's correction, decision, or gotcha instantly benefits every agent on the project.</td>
    </tr>
  </tbody>
</table>

## Working with your agent

NeoHive works _through_ your agent — you talk to it in plain language, and it handles the recalling and storing behind the scenes. A few habits make that far more effective:

- **Start fresh when the task changes.** Jumping from a billing bug to a frontend refactor? Start a new session, or re-run `/neohive:load-context`, so your agent loads context for what you're doing _now_ rather than what you were doing an hour ago. (Good practice with any AI assistant — and it means NeoHive front-loads the right memories.)
- **Ask like you'd ask a teammate.** When you want your agent to draw on the team's knowledge, describe the situation concretely instead of in a couple of keywords. The more grounded your ask, the better it can surface the right context.
- **Correct it out loud.** When it gets something wrong, tell it the right answer — that correction is captured, so it won't come back to bite the next person.

### Example prompts

A few things worth saying to your agent as you work:

* Before we start — what do we already know about the auth flow here?
* Have we hit flaky failures in the batch processor before? What fixed it?
* Remember that we always use idempotency keys on payment POST requests.
* That's out of date — we moved off Redis for sessions last month. Update it.
* I'm switching to the search-indexing work now — pull up anything relevant.

## Workflows

A few ways teams get outsized value from NeoHive:

### Onboard a teammate with zero handover

A new engineer connects their agent to the project and immediately inherits everything the team has taught NeoHive — conventions, decisions, and the reasons behind them. They ask "how do we handle auth here?" and get your team's real answer on day one, no onboarding doc required.

### Debug with institutional memory

Hit a gnarly bug? Ask whether it's been seen before: _"Have we run into flaky failures in the batch processor?"_ If someone debugged it last quarter and captured the insight, the fix — and the reasoning behind it — comes straight back instead of being re-discovered from scratch.

### Keep the whole team consistent

Establish a convention once — "we use snake_case for database columns" — and every agent on the project starts following it, not just yours. Standards stop living in someone's head or a stale doc and start being applied automatically.

## What builds up over time

After a few weeks, your project accumulates a real body of context:

- Your indexed codebase, kept fresh with periodic syncs
- The conventions your team follows
- Architectural decisions and why they were made
- Gotchas and pitfalls in specific parts of the code
- Debugging insights from past incidents

**You'll know it's working when** new sessions start informed — your agent stops recommending deprecated patterns, stops hallucinating APIs, and stops ignoring your conventions. Knowledge that used to live in someone's head or a buried Slack thread is now searchable, persistent, and shared across every agent your team uses.
