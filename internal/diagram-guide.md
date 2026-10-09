# NeoHive diagram guide

**Scope:** how to make the SVG diagrams in the NeoHive user docs, the files in `docs/.gitbook/assets/`. It covers the canvas, the header, colors, type, shapes, arrows, file names, alt text, and the checks to run before you commit. It does not cover screenshots or GIFs, and it does not cover the wording on the page around a diagram, which follows `internal/style-guide.md`.

**Provenance:** written on 2026-10-08 from the diagrams in `docs/.gitbook/assets/` at that date, and from the logo in `frontend/src/lib/icons/NeoHiveIcon.svelte` in the MemVec repository. Every diagram shares the header exactly. For other tokens, where the existing diagrams used more than one value, this guide picks the most common one and names the older variants, so new diagrams converge on one value.

![The NeoHive diagram system on one page. Anatomy: a sketch of the canvas with the logo, title, one-line subtitle, divider, and side margins, next to the exact values, such as the logo at translate(40,26) scale(0.0793), the title at x=88 y=52 in 24px, the subtitle at x=88 y=74 in 12px capitals, the divider at y=96, margins from x=40 to x=960, and content from about y=116. Color: violet for the main flow and labels, lavender for a Hive's border, orchid for the Knowledge Index and Memories, green for done, the right way, and checks that pass, teal for recall, sync, and automatic steps, amber for manual steps and warnings, gray for order only, ink for titles, and muted gray for captions. Shapes: a container with rx 12 holds a card with rx 10, which holds an inner card with rx 8, which holds a chip with rx 6, showing that nesting means holds, plus a card with a teal accent bar. Lines: a solid violet arrow means always happens, a dashed violet arrow means optional, automatic, or forbidden, a dashed amber arrow means a failure branch, a gray arrow means order only, a teal arrow means something comes back to the agent or a sync, and a dashed border means something outside NeoHive itself. Type: label 10.5, title 15, body 12.5, item 12, muted 11.5, mono for code, and 9px as the smallest size.](diagram-guide.svg)

`diagram-guide.svg` shows this guide on one page, and it follows every rule here. When you change a value in this guide, change the image in the same commit, or the two disagree and readers trust the wrong one.

## What a diagram is for (Must Follow)

- **Draw a diagram only when it shows a relationship that text cannot show at a glance.** Good subjects are what holds what, what flows where, and what happens in what order. A diagram that restates a list or a table adds a second copy to keep in sync and teaches nothing new.
- **Make every diagram graphical, never a box of bullet points.** Show the idea with shapes, nesting, arrows, and position. A box full of sentences is a table drawn by hand, harder to read and harder to edit than the table it replaces.
- **Show one idea per diagram.** When a page needs two ideas, make two diagrams. A diagram that tries to show a whole system becomes too small to read at the page width.
- **Explain a topic in the diagram on its owner page only.** Check `internal/topic-owners.md` first. A diagram on a summary page repeats the owner page's diagram and drifts from it.

## Canvas and header (Must Follow)

Every diagram starts from the same canvas and header. All existing diagrams match it exactly, so a reader moving between pages sees one visual system.

| Element | Value |
| --- | --- |
| Width | `width="1000"` with `viewBox="0 0 1000 <height>"`. Choose the height to fit the content. |
| Background | `<rect width="1000" height="<height>" fill="#FAF9FD"/>` |
| Side margins | Content runs from `x=40` to `x=960`. Nothing crosses those lines. |
| Logo | The group at `translate(40,26) scale(0.0793)`, shown in the template later in this guide |
| Title | `x="88" y="52"`, `font-size="24"`, `font-weight="800"`, `letter-spacing="-0.5"`, `fill="#1A1A2E"`, written in sentence case |
| Subtitle | `x="88" y="74"`, `font-size="12"`, `font-weight="600"`, `letter-spacing="1.1"`, `fill="#7008E7"`, written in capitals, one line stating the diagram's point. Keep code identifiers in their own case, as in `neohive-data`. |
| Divider | `<line x1="40" y1="96" x2="960" y2="96" stroke="#E4DFF1"/>` |
| First content | Starts at least 8px below the divider, usually at about `y=116` and never lower than `y=140` |
| Footer (optional) | A divider from `x=40` to `x=960` about 40px above the bottom, then one caption line under it at `x=40`, in the `.muted` style (11.5px, `#737373`) |

- **Copy the logo paths verbatim from `NeoHiveIcon.svelte`.** Never redraw, trace, or hand-edit the logo. A redrawn logo drifts from the brand, and the drift is invisible until two diagrams sit side by side.
- **Keep the subtitle to one line.** It states the one idea of the diagram, for example "A HIVE HOLDS INDEXES. AN INDEX HOLDS MEMORIES AND CHUNKS OF YOUR FILES." A second line pushes the divider down and breaks the shared header.

## Template (Quick Reference)

Start every new diagram from this skeleton. Replace `<height>` in all three places.

```xml
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="1000" height="<height>" viewBox="0 0 1000 <height>" font-family="'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif">
  <style>@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700;800&amp;family=IBM+Plex+Mono:wght@400;500;600&amp;display=swap');
    .mono { font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    .lbl { font-size: 10.5px; font-weight: 700; letter-spacing: 1.1px; }
    .title { font-size: 15px; font-weight: 700; fill: #1A1A2E; }
    .body { font-size: 12.5px; fill: #4A4458; }
    .item { font-size: 12px; fill: #1A1A2E; }
    .muted { font-size: 11.5px; fill: #737373; }
  </style>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#7C3AED"/></marker>
    <marker id="arrT" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#009689"/></marker>
    <marker id="arrA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#BB4D00"/></marker>
    <marker id="arrG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#008236"/></marker>
    <marker id="arrM" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#A1A1A1"/></marker>
  </defs>
  <rect width="1000" height="<height>" fill="#FAF9FD"/>

  <!-- Header. Logo paths copied verbatim from frontend/src/lib/icons/NeoHiveIcon.svelte. -->
  <g transform="translate(40,26) scale(0.0793)" fill="none" stroke-width="20"><path d="M274.811 240.3L142.406 316.428L10.0002 240.3V87.665L142.406 11.5352L274.811 87.665V240.3Z" stroke="#7C3AED"/><path d="M406.428 315.818L274.023 391.946L141.617 315.818V163.183L274.023 87.0532L406.428 163.183V315.818Z" stroke="#A78BFA"/><path d="M274.811 391.336L142.406 467.464L10.0002 391.336V238.701L142.406 162.571L274.811 238.701V391.336Z" stroke="#C084FC"/></g>
  <text x="88" y="52" font-size="24" font-weight="800" letter-spacing="-0.5" fill="#1A1A2E">Diagram title</text>
  <text x="88" y="74" font-size="12" font-weight="600" letter-spacing="1.1" fill="#7008E7">ONE LINE THAT STATES THE DIAGRAM'S POINT</text>
  <line x1="40" y1="96" x2="960" y2="96" stroke="#E4DFF1"/>

  <!-- Content starts at about y=116. -->
</svg>
```

## Color (Must Follow)

Each color carries one meaning across every diagram. A reader who has learned that teal means "comes back to you" on one page reads it the same way on the next.

| Color | Hex | Use it for |
| --- | --- | --- |
| Violet | `#7C3AED` | The main flow, primary arrows, and section labels |
| Deep violet | `#7008E7` | The subtitle, and code or paths in `.mono` |
| Lavender | `#A78BFA` | A Hive's border, and secondary outlines |
| Orchid | `#C084FC` | The Knowledge Index and Memories |
| Light lavender | `#C4B4FF` | An older, lighter variant of lavender on the Index cards in `get-started-connect.svg`. Use lavender `#A78BFA` for Index cards in new work. |
| Green | `#008236`, border `#BFF2D3`, fill `#D9F7E5` | A good outcome, the way the app shows success and **Connected**: done, the right way in a comparison, a check that passes, a healthy or kept state such as **ACTIVE** or **KEPT**, and the safe setup |
| Teal | `#009689`, border `#99E6DC`, fill `#F0FDFA` | Content moving: coming in from outside (a repository, a sync) or coming back to the agent (recall), steps that run automatically, and Memory type tags such as **CONVENTION**. The app has no teal, so never use teal for success. |
| Amber | `#BB4D00`, border `#FFE1B2`, fill `#FFF5E6` | A caution, the way the app shows warnings: something the reader must do by hand, warnings such as "never open this port", failure branches such as a `401` reply, the wrong way in a before-and-after comparison, and the **ERROR_PATTERN** tag |
| Gray | `#A1A1A1` | Neutral "then" arrows that only show order, with the `arrM` marker |
| Ink | `#1A1A2E` | Titles and item text |
| Body | `#4A4458` | Body text |
| Muted | `#737373` | Captions, footers, and secondary notes |
| Panel fills | `#FFFFFF`, `#F5F3FF`, `#FAF9FD` | Cards, containers such as a Hive, and the background |
| Borders | `#E5E5E5`, `#E4DFF1`, `#DDD6FF` | Card edges, dividers, and container edges |
| Timeline, dividers, and placeholders | `#D9D4E6`, `#EEEAF6`, `#F0EDF7` | `#D9D4E6` for a timeline's line, `#EEEAF6` for a thin divider inside a card, and `#F0EDF7` for the gray bars that stand for text in a drawing of a screen |

- **Copy every color from the NeoHive app.** The diagrams use the colors the app renders, taken from `frontend/src/app.css` in the `NeoHiveAI/MemVec` repository. Violet `#7C3AED`, lavender `#A78BFA`, ink `#1A1A2E`, muted `#737373`, border `#E5E5E5`, card white `#FFFFFF`, and background `#FAF9FD` are the app's tokens `--primary`, dark-mode `--primary`, `--foreground`, `--muted-foreground`, `--border`, `--card`, and `--sidebar`. Green and amber copy the app's success and warning styling: `text-green-700`, `border-green-500/25`, and `bg-green-500/15`, and `text-amber-700`, `border-amber-500/30`, and `bg-amber-500/10`, with each see-through color blended over white. Orchid `#C084FC` comes from the logo. The app is built with Tailwind CSS 4, so take any other palette color, such as deep violet `violet-700`, from Tailwind 4, not Tailwind 3: the two versions use the same names for slightly different colors, and a Tailwind 3 hex does not match what the app shows. When a color changes in the app, change it in this table, in every diagram, and in `internal/diagram-guide.svg`, or the docs stop matching the product.
- **Never add a color outside this table.** A new color has no meaning the reader has learned, so it reads as decoration or as a mistake. If an idea needs a new meaning, add the color to this table first, with its meaning.
- **Never rely on color alone.** Pair each color with a label, such as **AUTOMATIC** or **YOU DO THIS**. Readers who cannot tell the colors apart, and readers of the alt text, get the meaning from the label.

## Type (Must Follow)

| Class | Size and weight | Use it for |
| --- | --- | --- |
| `.lbl` | 10.5px, 700, letter-spacing 1.1px, capitals | Small labels above a title, such as **HIVE** or **INDEX** |
| `.title` | 15px, 700 | The name of a card or step |
| `.body` | 12.5px | One or two short lines under a title |
| `.item` | 12px | Entries inside a card, such as file names or Memory text |
| `.muted` | 11.5px, `#737373` | Captions and the footer note |
| `.mono` | IBM Plex Mono | Code, paths, URLs, tool names, environment variables |

- **Use the sizes in this table in new work.** Older diagrams also use `.lbl` at 11px, `.body` at 12px or 13px, `.title` at 14px or 16px, `.item` at 10.5px or 11px, and a `.small` class equal to `.muted`. Leave those as they are, because each diagram is consistent within itself.
- **Use Instrument Sans for all text except code, and IBM Plex Mono for code.** These are the NeoHive brand fonts, loaded by the `@import` in the template.
- **Keep every text size at 9px or larger.** Readers see a 1000-wide diagram scaled down to fit the page, and smaller still on a phone, so smaller text becomes unreadable. The smallest text in any existing diagram is 9px.
- **Write diagram text in plain English, following `internal/style-guide.md`.** Capitalize Hive, Index, and Memory, use sentence case for titles, and use no em-dashes. Diagram text is read by the same readers as the page around it.

## Shapes and lines (Must Follow)

| Shape | Corner radius | Use it for |
| --- | --- | --- |
| Outer container, such as a machine or a Hive | `rx="12"` | Things that hold other things |
| Card | `rx="10"` | One thing, such as an Index, a step, or a service |
| Inner card | `rx="8"` | A thing inside a card |
| Chip | `rx="6"` | A file name, a Memory, or a code sample inside a card |
| Field in a drawing of a screen | `rx="5"` | An input or a dropdown, as in `admin-playground.svg` |
| Placeholder bar | `rx="4"` | A gray bar standing for a line of text in a drawing of a screen |
| Accent bar | half the width (`rx="1.75"` on a 3.5px bar) | A colored strip down the left edge of a card, in the color of the card's meaning from the color table, such as green for the right way and amber for the wrong way |
| Pill label | half the height | A label that sits on a line, such as the sync label in `context-repositories.svg` |

- **Use nesting to mean "holds".** A box drawn inside another box means the outer thing contains the inner one, such as Indexes inside a Hive. Never place boxes inside each other for layout alone, because the reader will read containment into it.
- **Use a solid arrow for something that always happens, and a dashed line for something optional, automatic, or forbidden.** Label every dashed line, so the reader knows which of those meanings it carries. Use these dash patterns, so one pattern always means one thing:

| Pattern | Use it for |
| --- | --- |
| `5 4` | An optional, automatic, or forbidden flow |
| `4 3` | A failure branch, in amber, such as a `401` or a failed check |
| `6 4` | The border of something outside NeoHive itself: another Hive's Index, your agent's model, or an add-on you run, such as an authenticating proxy |
| `3 3` | A divider or a placeholder inside a card |

Some older diagrams use `4 4`, or `5 4` on a border. Use the table in new work.

- **Copy marker definitions from the template.** Use `arr` for violet arrows, `arrG` for green, `arrT` for teal, `arrA` for amber, and `arrM` for gray. Older diagrams also use other names for the same markers, such as `arv` and `art`. Keep those as they are, and use the template's names in new work. The marker sets the arrowhead's color, so a violet line with a teal arrowhead looks like two different flows.
- **Use a dashed border for something outside NeoHive itself,** such as a Shared Index that another Hive owns, your agent's model provider, or a proxy you run in front of NeoHive. Label it, for example **YOU RUN THIS**.

## Layout and overlap (Must Follow)

- **Do not let elements overlap.** Text never touches other text, a box edge, a line, or an arrow, and boxes are either fully inside one another or apart. Overlaps make labels hard to read and look like mistakes.
- **Two overlaps are allowed on purpose.** An arrow may cross a container's edge to show something entering or leaving it, such as an outbound connection leaving "Your machine". A timeline line may run behind its numbered stops.
- **Stop a line at a label's edge instead of running it behind the label.** A line hidden behind a label still counts as an overlap, and it shows through when the label's fill changes.
- **Leave at least 8px between any text and the side edges of the box around it, and aim for 12px.** Fonts render slightly wider in some browsers, so a tighter gap overlaps for some readers. Every existing diagram meets 8px at the sides, and most leave 12px or more.
- **Measure the longest string in each box before you settle the box width.** Text overflowing its box is a common diagram bug, and it only shows up when the diagram is rendered.
- **Place numbered badges beside the element they point to, never on its corner.** A badge on a corner covers the element's edge.

## Files, alt text, and commits (Must Follow)

- **Name the file `<top-level-folder>-<page>.svg`,** such as `admin-playground.svg` for `docs/admin/playground.md`. Drop any folder in between, as in `context-sync.svg` for `docs/context/repositories/sync.md`. For a folder's `README.md`, use the folder name, as in `get-started-connect.svg`. Add a short suffix for a second diagram on the same page, as in `get-started-what-is-neohive-parts.svg`. The name tells the next writer which page uses the file, so an unused diagram is easy to spot. Two diagrams predate this rule, `how-it-works.svg` and `hives-indexes-memories.svg`. Leave their names as they are, because a rename only creates churn in GitBook.
- **Reference the diagram from the page with a `<figure>` block,** for example `<figure><img src="../.gitbook/assets/admin-playground.svg" alt="..."><figcaption></figcaption></figure>`. This is the form every existing page uses.
- **Write alt text that says everything the diagram shows,** following the style guide's alt text rule. Readers who cannot see the image get the whole idea from the alt text, and no step may exist only in the image.
- **Commit a new diagram in the same commit as the page that uses it, or earlier.** If the file is missing when GitBook imports the page, the image can stay broken on the site even after a later commit adds the file.
- **When a diagram changes, check every page that uses it.** Search the docs for the file name. The diagram must still match the text around it on each page.

## Check before you commit (Quick Reference)

Render the diagram in a browser at its real size and look at it. Diagram bugs, such as overflowing text, overlapping labels, and arrowheads hidden behind boxes, are invisible in the source and obvious in the render.

```bash
google-chrome \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --window-size=1000,<height> \
  --virtual-time-budget=4000 \
  --screenshot=/tmp/diagram.png \
  "file://$PWD/docs/.gitbook/assets/<name>.svg"
```

| Check | How to check |
| --- | --- |
| **The header matches the template.** | Compare the logo group, title, subtitle, and divider lines with the template, character for character. |
| **No element overlaps another.** | Look at every label, arrow, and box edge in the render. The only allowed overlaps are an arrow crossing a container's edge and a timeline line behind its stops. |
| **Every color is in the color table.** | Search the file for `#` and compare each value with the table. |
| **No text is smaller than 9px.** | Search the file for `font-size`. |
| **The alt text covers the whole diagram.** | Read the alt text without the image. You should still understand the idea. |
| **The page uses the diagram, and the diagram matches the page.** | Search `docs/` for the file name. |
