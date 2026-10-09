# NeoHive docs style guide

This is the official style reference for the NeoHive documentation site. Follow it whenever you write or review a page in the docs.

**Scope:** the public NeoHive docs site, which is the GitBook site built from the `docs/` directory of the `NeoHiveAI/docs` repository. That covers page text, headings, tables, callouts, image alt text, and the `description:` frontmatter of every page. It does not cover text inside the NeoHive app (dashboard labels, tooltips, empty states, error messages, and the in-app guides in `frontend/src/lib/content/guides/`), release notes, code comments, or the internal docs in `internal/`.

**Provenance:** based on the Google developer documentation style guide (https://developers.google.com/style), checked against its highlights page on 2026-10-04, its abbreviations page (https://developers.google.com/style/abbreviations) on 2026-10-07, and its cross-references page (https://developers.google.com/style/cross-references) on 2026-10-08. Where this guide is stricter than Google's, the stricter rule wins. Plain English comes first, ahead of every other rule here.

## Plain English (Critical)

Every other rule in this guide serves this section. If a sentence follows every formatting rule but a new user cannot understand it on the first read, the sentence is wrong.

| Rule | Explanation |
| --- | --- |
| **Write complete sentences.** | Every sentence has a subject and a verb and makes sense on its own. Fragments like "Not supported." or "Saved to dashboard." leave the reader to guess what is not supported or what was saved, and a guess is often wrong. |
| **Keep sentences short: aim for 20 words or fewer.** | Put one idea in each sentence. A long sentence with several clauses makes the reader hold the start in mind while they parse the end, and readers working in a second language often lose track of the meaning. In a table, apply the limit to each cell. |
| **Use the simplest word that is accurate.** | Write "use", not "utilize"; "start", not "initiate"; "help", not "facilitate"; "about", not "approximately". Formal words slow the reader down and add nothing. |
| **Explain a technical term the first time you use it, or replace it.** | Say what the thing does in everyday words, for example "an embedding (a list of numbers that captures what a piece of text means)". An unexplained term blocks a new user, and they leave the page to look it up. |
| **Spell out an abbreviation the first time it appears on a page, unless most readers already know it.** | This follows Google's abbreviations rule. Write "Server-Sent Events (SSE)", then "SSE" afterwards. Readers who land on a page from search never saw the page where you defined it. If the first mention is in a heading, spell the abbreviation out in the paragraph after the heading. |
| **Do not spell out the abbreviations NeoHive readers already know.** | These are MCP, API, URL, CLI, HTTP, SSH, GPU, CPU, CI, and VPN. NeoHive readers are developers who run coding agents, so expanding these terms on every page adds noise. Keep spelling out PAT and OCR, because fewer readers know them. "Personal access token" is also the name GitHub and GitLab show on screen. Every abbreviation on this list has a glossary entry for readers who look it up. When you add an abbreviation to the list, add its glossary entry too. |
| **Link the first mention of MCP on each page to the glossary.** | Write `[MCP](concepts/glossary.md#mcp)`. MCP is central to NeoHive and newer than the other known abbreviations, so some readers still need the definition. Do not link the other known abbreviations. Google treats a known term as needing no help, and links on everyday words such as URL make a page harder to read. |
| **Write coherent paragraphs.** | Open each paragraph with the sentence that states its point, and make each later sentence follow from the one before. A paragraph that jumps between ideas forces the reader to rebuild the logic you skipped. |
| **Name the thing instead of writing "it" or "this".** | Write "The sync finishes in a few minutes", not "This finishes in a few minutes". A pronoun with an unclear target is the most common cause of misread instructions. |
| **Say exactly what happens.** | Write "NeoHive deletes the Index and you cannot recover it", not "The Index may be affected". Vague wording hides the one fact the reader needed. |

| Instead of this | Write this |
| --- | --- |
| In order to initiate the synchronization process, utilize the Trigger sync button. | To start a sync, select **Trigger sync**. |
| Not available for Knowledge Indexes. | You cannot share a Knowledge Index. |
| Should the connection fail, a retry will be attempted. | If the connection fails, NeoHive tries again. |
| It is recommended that you back up your data. | Back up your data first. |
| NeoHive runs in a Docker container. You manage Hives from a dashboard. (Two facts side by side, with no point that links them.) | You run NeoHive yourself, so your content stays on a machine you control. NeoHive runs in a Docker container, and the same container serves the dashboard where you manage your Hives. |

## Page structure (Must Follow)

| Rule | Explanation |
| --- | --- |
| **Open every page with an introduction that answers three questions.** | What is this thing, in plain words? Why or when does the reader need it? What does this page help them do? A page that opens with a one-line summary assumes the reader already knows the topic, and a reader from search does not. |
| **Keep each paragraph to one idea and about three to five sentences.** | Short paragraphs are easy to scan. A paragraph that covers two ideas becomes a slab of text, so split it. |
| **Vary how introductions are worded.** | Do not open every page with the same stock sentences, such as "You need this page when..." followed by "This page helps you...". A template repeated on every page reads as a form, and readers learn to skip it. Write each introduction for its own topic. |
| **Explain each topic in full on one page only. Elsewhere, summarize it and link to that page.** | Before you explain a topic, look it up in `internal/topic-owners.md` in the `NeoHiveAI/docs` repository, which names the page that owns each topic. When you add, move, rename, or delete a page, update that file in the same change. An out-of-date map lets the next writer explain a topic a second time. On other pages, give a one or two sentence summary, then link to the full page, for example "For the full explanation, see [Hives, Indexes, and Memories](../concepts/hives-indexes-memories.md)." Two full explanations of one topic drift apart as each is edited, and the reader cannot tell which is right. If no page covers the topic and it needs more than a short summary, give it its own page. |
| **Do not set a word limit for a page. Limit its scope instead.** | Explain as much as the topic needs. Each page covers one task or one idea, so length stays reasonable. When a page grows long because it covers two topics, split it into two pages. Do not cut needed explanation to make a page shorter. |
| **Reference pages can have a shorter introduction.** | A reference page, such as a list of commands or settings, is for looking things up. Its introduction still says what the list covers and when the reader needs it, in two or three sentences. |

## Voice and tone (Must Follow)

| Rule | Explanation |
| --- | --- |
| **Address the reader as "you".** | Write "You can share an Index with another Hive", not "Users can share an Index" or "We let you share an Index". Second person tells the reader the instruction is for them. |
| **Use active voice.** | Write "NeoHive saves your changes", not "Your changes are saved". Passive voice hides who does the action, so the reader cannot tell whether they need to do something. |
| **Use present tense.** | Write "The page shows your results", not "The page will show your results". The future tense makes a normal, immediate result sound delayed or uncertain. |
| **Be friendly and direct, not chatty.** | Contractions such as "don't" and "you're" are fine. Jokes, exclamation marks, and slang are not, because they do not translate and they become tiresome on repeat reads. |
| **Do not call a task easy or simple.** | Avoid "simply", "just", "easy", and "obviously". A reader who is stuck now also feels slow, and the word adds no information. |
| **Do not write "please" in instructions.** | Write "Enter your token", not "Please enter your token". "Please" lengthens every step and makes a required action sound optional. |
| **Do not pre-announce features.** | Describe what NeoHive does today. A promise of a future feature goes stale, and readers plan around it. An on-screen label such as **Coming soon** may be quoted, because it describes what the reader sees. |

## Writing for a global audience (Must Follow)

| Rule | Explanation |
| --- | --- |
| **Use standard American spelling and punctuation.** | Pick one variant and keep it, because mixed spelling ("color" and "colour") looks careless and confuses translation tools. Quoted on-screen labels are the exception: copy them exactly, even when the app spells them differently. |
| **Avoid idioms, metaphors, and cultural references.** | Write "start", not "kick off"; "check", not "sanity check". Idioms often make no sense when read literally or machine-translated. |
| **Avoid Latin abbreviations.** | Write "for example" instead of "e.g.", "that is" instead of "i.e.", and "and so on" instead of "etc.". Many readers do not know what these abbreviations mean, and screen readers pronounce them inconsistently. |
| **Write dates so they cannot be misread.** | Write "October 4, 2026" or "2026-10-04", never "04/10/2026". The numeric form means April in some countries and October in others. |
| **Use inclusive, neutral language.** | Write "allowlist" and "blocklist", "primary" and "replica", and "they" for a person whose gender you do not know. Exclusionary terms push readers away from the product. |

## NeoHive terms (Must Follow)

| Rule | Explanation |
| --- | --- |
| **Capitalize product objects: Hive, Index, Memory, Shared Index.** | Also capitalize the Index kinds: Code Index, Documentation Index, Files Index, and Knowledge Index. They are names of things in the app, and the capital letter tells the reader the word means the NeoHive object, not the everyday word "memory" or "index". |
| **Keep "index" lowercase when it is a verb or describes something.** | Write "NeoHive indexes your repository", "the indexed files", and "the `index` parameter". Write "the Index page" with a capital, because that page belongs to the Index object. Capitalizing the verb makes the reader look for an object that the sentence never names. |
| **Keep "memory" lowercase when it means the general capability.** | Write "the plugin tells your agent when to use memory". Capitalize it only for a stored Memory. |
| **Never use "Hive" for an Index, or "Index" for a Hive.** | A Hive is the workspace with one MCP endpoint. An Index is one store of content inside a Hive. Older releases used "Hive" for what is now an Index, and only the glossary's older-names section should mention that meaning. |
| **Call the product NeoHive, never HiveMind or MemVec.** | Those older names survive only inside the code, in API headers, table names, and `MEMVEC_` variables. A reader who sees them cannot tell whether they are reading about the same product. |
| **Link the first mention of each NeoHive term on a page to its glossary entry.** | Readers often arrive on a page from search, so they may not have read the page that defines a Hive or an Index. Link the term to its glossary entry, for example `[Hive](concepts/glossary.md#hive)`. GitBook shows a preview of the entry when the reader hovers over the link, so the reader gets the definition without leaving the page. Link only the first mention on each page. Google's cross-references rule says not to link the same destination twice on one page, because each extra link adds a decision for the reader. You can still explain the term in words beside the link. The Index kinds count as separate terms, so "Code or Documentation Index" links both: `[Code](glossary.md#code-index) or [Documentation Index](glossary.md#documentation-index)`. Do not link the terms on `concepts/hives-indexes-memories.md`, which defines them itself. Skip a mention in a heading, image alt text, code, or a bold interface label, where a link does not work or changes how the label looks. Link the first mention in ordinary text instead. |
| **Write tool names exactly as the agent shows them, in code font.** | For example, `memory_recall` and `/neohive:load-context`. A reader copies these, and any change in spelling breaks the copy. |

## Consistency (Must Follow)

| Rule | Explanation |
| --- | --- |
| **Describe each fact the same way on every page.** | For example, every page says NeoHive keeps your content "on the machine it runs on". When two pages describe one fact in different words, the reader wonders whether they mean different things. |
| **Title a section by what NeoHive does, then state the limits in the body.** | Write "What stays on your machine", and then list the outbound calls under it. A heading such as "What leaves your machine" reads as the opposite of the promise on the Welcome page, even when the body is accurate. |
| **When you change how the docs say something, search every page and image for the old wording.** | Check page text, headings, `description:` frontmatter, alt text, and the text inside SVG files in `.gitbook/assets/`. Old wording left in one place makes two pages disagree, and the reader cannot tell which page is right. |
| **Match the public website's wording wherever the website is accurate.** | For example, describe NeoHive as "a self-hosted memory that your team's coding agents share", as `https://www.neohive.ai/` does. Readers often arrive from the website, and different words for the same product make them wonder whether the docs describe the same thing. Keep the docs' own capitalization of Hive, Index, and Memory even though the website writes "hive". |
| **Never copy a website claim that the docs or the product contradict.** | Check each claim against the docs and the source code first. The docs describe what NeoHive does today. A false security claim, such as "makes no external requests", can lead a reader to deploy NeoHive somewhere it is not safe. Report the claim to the website's owner instead of repeating it. |
| **State only facts you can check, and do not overstate them.** | Write "a Memory that nobody recalls ranks lower", not "prunes itself", when NeoHive never deletes the Memory. If neither the docs nor the source code confirms a fact, leave it out. A reader acts on every claim, and an overstated one fails them at the worst moment. |
| **Send readers who need a license to the NeoHive team's request form, not to an email address.** | Write "request a license from the [NeoHive team](https://www.neohive.ai/download/)". The form on that page is where people request an access key, so every page names one way to get a license. Keep `hello@neohive.ai` for support requests, such as sending a diagnostics bundle. When you quote an error message that contains the email address, quote it exactly, and put the link in the fix instead. |

## Procedures and instructions (Must Follow)

| Rule | Explanation |
| --- | --- |
| **Use a numbered list for any task with more than one step.** | Numbers let the reader keep their place after they switch to the app and back. A GitBook stepper counts as a numbered list. |
| **Put one action in each step.** | Two actions in one step get one of them skipped. |
| **Put the goal or condition before the action.** | Write "To delete an Index, select **Delete Index**", not "Select **Delete Index** to delete an Index". The reader needs to know whether the step applies to them before they act. |
| **Start each step with a verb.** | Write "Select **Save**", not "The **Save** button should now be selected". |
| **Label optional steps.** | Begin the step with "Optional:" so the reader knows they can skip it. |
| **Say why a required step is needed when it looks skippable.** | Add one sentence that names what fails without it, for example "Setup shows **Connected** only after Claude Code connects, and Claude Code does not connect until you approve the server." A reader who thinks a step is optional skips it, and the later step that depends on it fails with no clue why. |
| **Say what the reader sees when a step succeeds.** | For example: "NeoHive opens the new Index page." Without a result, the reader cannot tell whether the step worked. |
| **Introduce every list with a complete sentence.** | For example: "To add a repository, do the following:". A list with no lead-in sentence starts without context. |
| **Show the command or value a step asks the reader to use.** | Write "Run the command that setup shows. The command looks like this:" followed by the command, not only "Copy the command that setup shows". The reader can check that they copied the right thing, and a reader without the app open can still follow the page. |
| **Keep an example when it shows the reader how to do something. Cut it when the task does not need it.** | On a page that teaches how to use NeoHive, such as a walkthrough or a page about phrasing requests, keep concrete example prompts even when they name a specific codebase. "Where do we handle payment retries?" shows how to phrase a request, and readers adapt it to their own code. On a page where the reader only needs to finish a task, such as installing or connecting, cut a codebase-specific example that the task does not use, because the reader cannot use it and it only adds length. Before you remove an example, say what it shows the reader, and keep it if nothing else on the page shows that. |
| **Do not make the reader add or explain what the app already provides.** | When the dashboard's command already includes a flag such as `--scope project`, show it in the command and move on. Explain why the flag matters on the page that owns the topic. A step that explains a setting the reader does not have to touch reads as a task to do and slows them down. |

```text
To add a repository to a Hive, do the following:

1. Open your Hive.
2. Next to Indexes, select +.
3. Select GitHub or GitLab.
4. Under Content type, select Code.
5. Select Create Index.

NeoHive opens the new Index page and starts the first sync.
```

## Interface text and formatting (Must Follow)

| Rule | Explanation |
| --- | --- |
| **Put interface element names in bold, spelled exactly as they appear on screen.** | Write "Select **Trigger sync**". Keep the app's spelling and capitalization even when it breaks another rule in this guide. If the label in the doc does not match the screen, the reader cannot find the button. |
| **Use "select" for clicking, tapping, and choosing.** | "Select" works for a mouse, a touch screen, and a keyboard. "Click" excludes readers who do not use a mouse. |
| **Do not describe an element by its position or color.** | Write "Select **Export**", not "Select the blue button on the right". Layouts change between screen sizes, and readers using screen readers or who cannot see color get nothing from the description. If an element has no label, name what it is, such as "the bell icon". |
| **Do not describe a disabled or "Coming soon" element on a task page.** | When the screen already labels an option **Coming soon** and the reader cannot select it, the screen has told them everything. A sentence repeating it interrupts the task. Mention an option that is not available yet only on the page a reader checks to find out whether it exists, such as the list of data sources. |
| **Do not document how a feature works until readers can use it.** | A feature that is gated or shows **Coming soon**, such as Jira today, gets one line on the page that lists what exists (the data sources list) and nothing anywhere else. Leave its fields, tokens, checks, network calls, and stored data out of every other page, security and reference pages included. A reader cannot act on them, and they read as a promise the product does not keep yet. When the feature ships, document it then, from the released code. |
| **Use sentence case for titles and headings.** | Write "Connect a repository", not "Connect A Repository". Sentence case is easier to read and matches how labels appear in the app. This includes the section titles in `SUMMARY.md`. |
| **Keep page titles and navigation titles the same.** | When you change a page's `# H1`, change its entry in `SUMMARY.md` and the text of every link to it. A reader who follows a link expects to land on a page with the same name. |
| **Use code font only for text the reader types or reads literally.** | This covers commands, file names, environment variables, and values to enter, for example `config.json`. Code font on ordinary words makes them look like something to type. |
| **Give every fenced code block a language.** | Use `bash`, `json`, `toml`, `text`, and so on. Without a language, GitBook shows no syntax highlighting. |
| **Never put a secret in an example that writes a file the reader commits.** | Use a variable that the tool fills in at run time, in single quotes so the shell does not fill it in first: `'Authorization: Bearer ${NEOHIVE_TOKEN}'`. A token typed into a command that writes `.mcp.json` lands in a file the docs tell teams to commit, and anyone with the repository can then use it. |
| **Use the serial comma.** | Write "files, folders, and links". Without the last comma, the final two items can read as one item. |

## Links and images (Must Follow)

| Rule | Explanation |
| --- | --- |
| **Make link text describe where the link goes.** | Write "Read about [sharing an Index](https://example.com)", not "[Click here](https://example.com)". Screen reader users often move from link to link, and "click here" tells them nothing. |
| **Add alt text to every image.** | Describe what the image shows that matters to the task, for example "The Hive page with the Indexes list and its + button highlighted". Alt text follows every rule in this guide, including NeoHive terms and the serial comma. Readers who cannot see the image otherwise miss the information. |
| **Never put information only in an image.** | Every instruction in a screenshot or diagram must also appear in the text. Images go out of date, cannot be searched, and cannot be translated. |
| **Make every diagram by following `internal/diagram-guide.md` in the `NeoHiveAI/docs` repository.** | That guide sets the canvas, header, logo, colors, type, shapes, and the overlap rules, and it lists the checks to run before you commit. Diagrams made without it drift apart, and a reader moving between pages stops trusting what a color or a dashed line means. |
| **Commit a new image in the same commit as the page that uses it, or earlier.** | GitBook imports a page when its commit arrives. If the image file is not there yet, the image can stay broken on the site even after a later commit adds the file. |
| **Add a "Next step" section only when the reader should skip ahead of the menu.** | GitBook already shows **Previous** and **Next** buttons in menu order on every page. A "Next step" section that names the same page repeats the button. One that names a different page contradicts it unless it says why. When the reader should skip pages, for example after the Quickstart, name the pages to skip and the page to go to: "You have installed NeoHive and connected Claude Code, so you can skip **Install NeoHive** and **Connect your agent**." |
| **Make every card in a card table clickable.** | Add a hidden link column to the table: `<th data-hidden data-card-target data-type="content-ref"></th>`, with one link to a page in each row. A card without that column looks clickable but does nothing when selected, and readers think the site is broken. |
| **Link each card to the page that explains what the card describes.** | A card that says "Knows your codebase" opens the page about how NeoHive finds code. Do not link two cards on one page to the same page, because the second card then offers nothing new. |
| **Use six cards in a card table, or another multiple of six.** | GitBook shows three cards per row on a wide screen and two on a narrower one. Only a multiple of six fills every row at both widths. Three cards leave one card alone on the second row at two per row, and four cards leave one alone at three per row. A card alone on a row looks like a mistake. |
| **Give every card an icon, and put related cards next to each other.** | Use a Font Awesome icon in the first column, for example `<i class="fa-rocket">:rocket:</i>`. A table where some cards have icons and others do not looks unfinished. Order cards so the ones about the same subject sit side by side at both three and two cards per row, because readers scan a row as one group. |
| **Do not put a link or a call to action inside a card's text.** | The whole card is already a link, and a link inside a link behaves differently in each browser. Do not add "Select this card to learn more" either. Every card is clickable, so the sentence adds nothing, and one card that says it while the others do not makes the set look inconsistent. Write every card in one table in the same pattern, in one or two sentences, for example each one stating what NeoHive does. |
| **Do not copy the whole menu onto an overview page.** | The sidebar already shows every section on every page. Pick the few pages a new reader needs first. A copied menu goes out of date the first time `SUMMARY.md` changes, and nothing warns you. |

## Notes and warnings (Must Follow)

Use a callout only when the reader must not miss the information. Too many callouts teach readers to skip all of them.

| Label | GitBook style | Use it when |
| --- | --- | --- |
| **Note** | `{% hint style="info" %}` | The information is useful but not required to finish the task. |
| **Caution** | `{% hint style="warning" %}` | The action can cause a problem the reader can fix, such as a sync that skips some files. |
| **Warning** | `{% hint style="danger" %}` | The action can cause a problem the reader cannot undo, such as deleting a Hive or restoring over existing data. |
| **Check** | `{% hint style="success" %}` | The reader can confirm that a task worked. |

Put a caution or warning before the step it applies to, not after. A reader who has already performed the step cannot use the warning.

## Documenting errors (Must Follow)

| Rule | Explanation |
| --- | --- |
| **Quote the error exactly as NeoHive shows it, in code font.** | Readers search the docs by pasting the message. A paraphrased message never matches their search. |
| **Say what caused the error, in plain words.** | Write "NeoHive could not reach GitHub", not "upstream unavailable". The error text alone gives the reader nothing to act on. |
| **Say what the reader can do next.** | For example: "Check the token on the **Data Sources** page, and then select **Trigger sync**." An explanation without a next step leaves the reader stuck. |
| **Do not blame the reader.** | Write "The token has expired", not "You entered an expired token". |

## Common words to replace (Quick Reference)

| Avoid | Use |
| --- | --- |
| utilize | use |
| initiate, commence | start |
| terminate | end, stop |
| facilitate | help |
| prior to | before |
| in order to | to |
| click on, hit | select |
| via | through, by using |
| e.g., i.e., etc. | for example, that is, and so on |
| simply, just, easy | (remove) |
| please | (remove) |
| above, below (for page location) | earlier, later, or a link |

## Before you publish (Quick Reference)

| Check | How to check |
| --- | --- |
| **Read every sentence aloud.** | If you run out of breath or stumble, split the sentence. |
| **Every sentence is complete.** | Each one needs a subject and a verb. |
| **Every term is explained or common.** | Ask whether a new user would know the word. |
| **Every procedure is numbered.** | Each step starts with a verb and holds one action. |
| **Every interface label matches the screen.** | Compare each bold label with the app, letter for letter. |
| **Every image has alt text.** | No step exists only in an image. |
| **Every paragraph makes one point.** | The first sentence states the point, and each later sentence follows from it. A run of separate facts is a list, not a paragraph. |
| **No topic is explained twice.** | Look the topic up in `internal/topic-owners.md`. If another page owns it, cut your text to a one or two sentence summary and a link. Update the map when you add, move, rename, or delete a page. |
| **Each NeoHive term is linked once, at its first mention.** | Hive, Index, Memory, Shared Index, each Index kind, and MCP link to the glossary on first mention only. Other known abbreviations stay plain. |
| **Every claim can be checked.** | Each fact appears in the docs or the source code. A website claim that the docs contradict stays out. |
| **Every diagram passes the checks in the diagram guide.** | Run the checks at the end of `internal/diagram-guide.md`, including rendering the SVG in a browser. |
| **New images are committed no later than their page.** | Put the image in the same commit as the page that uses it, or in an earlier one. |
| **Every example earns its place.** | On a teaching page, each example shows the reader how to do something. On a task page, every example is something the reader uses to finish the task. |
| **No page explains a feature readers cannot use yet.** | Search the page for the name of each gated or **Coming soon** feature, such as Jira. Only the data sources list may mention one. |
| **No page has an em-dash.** | Search the page for the em-dash character. Replace each one with a colon, a comma, parentheses, or a new sentence. |
