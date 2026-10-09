# NeoHive diagram guide

**Scope:** how to make the SVG diagrams in the NeoHive user docs, the files in `docs/.gitbook/assets/`. It covers the canvas, the footer, fonts, colors, type, shapes, arrows, file names, alt text, and the checks to run before you commit. It does not cover screenshots or GIFs, and it does not cover the wording on the page around a diagram, which follows `internal/style-guide.md`.

**Provenance:** first written on 2026-10-08 from the diagrams in `docs/.gitbook/assets/` at that date, and from the logo in `frontend/src/lib/icons/NeoHiveIcon.svelte` in the MemVec repository. Restyled on 2026-10-09: the header moved to a footer, the fonts are embedded in each file, the corners are sharper, the weights are one step lighter, box fills alternate by nesting level, only the outermost boxes have a border, and green, teal, and amber are softer. Every diagram in `docs/.gitbook/assets/` was converted, so they all match this guide.

![The NeoHive diagram system on one page. Anatomy: a sketch of the canvas with no header, content starting at the top, and a footer row with the diagram title at the bottom left and the NeoHive logo and name at the bottom right, next to the exact values: width 1000, background #FAFAFA, margins from x=40 to x=960, first content at y=32, the footer title at x=40, 14px above the bottom, in 12px weight 600, the logo at scale 0.036 with the name in 11px, and fonts embedded with @font-face. Color: violet for the main flow and labels, green for done, the right way, and checks that pass, teal for recall, sync, and automatic steps, amber for manual steps and warnings, gray for order only, ink for titles, muted gray for captions, white and box gray for boxes at alternating nesting levels, and a light gray border for outer boxes only. Shapes: an outer box with rx 3 and a border holds a gray card with rx 2, which holds a white inner card with rx 2, which holds a gray chip with rx 1.5, showing that nesting means holds, plus a card with a teal accent bar. Lines: a solid violet arrow means always happens, a dashed violet arrow means optional, automatic, or forbidden, a dashed amber arrow means a failure branch, a gray arrow means order only, a teal arrow means something comes back to the agent or a sync, and a dashed border means something outside NeoHive itself. Type: label 10.5, title 15, body 12.5, item 12, muted 11.5, mono for code, and 9px as the smallest size.](diagram-guide.svg)

`diagram-guide.svg` shows this guide on one page, and it follows every rule here. When you change a value in this guide, change the image in the same commit, or the two disagree and readers trust the wrong one.

## What a diagram is for (Must Follow)

- **Draw a diagram only when it shows a relationship that text cannot show at a glance.** Good subjects are what holds what, what flows where, and what happens in what order. A diagram that restates a list or a table adds a second copy to keep in sync and teaches nothing new.
- **Make every diagram graphical, never a box of bullet points.** Show the idea with shapes, nesting, arrows, and position. A box full of sentences is a table drawn by hand, harder to read and harder to edit than the table it replaces.
- **Show one idea per diagram.** When a page needs two ideas, make two diagrams. A diagram that tries to show a whole system becomes too small to read at the page width.
- **Explain a topic in the diagram on its owner page only.** Check `internal/topic-owners.md` first. A diagram on a summary page repeats the owner page's diagram and drifts from it.

## Canvas and footer (Must Follow)

Every diagram uses the same canvas and footer, so a reader moving between pages sees one visual system. A diagram has no header: the page heading and the text around the diagram already say what it shows, and a large title inside the image repeats them.

| Element | Value |
| --- | --- |
| Width | `width="1000"` with `viewBox="0 0 1000 <height>"`. Choose the height to fit the content. |
| Background | `<rect width="1000" height="<height>" fill="#FAFAFA"/>` |
| Side margins | Content runs from `x=40` to `x=960`. Nothing crosses those lines. |
| First content | Starts at `y=32` |
| Caption (optional) | A divider from `x=40` to `x=960` (`stroke="#E4E4E7"`) about 68px above the bottom, then one caption line at `x=40`, 46px above the bottom, in the `.muted` style (11.5px, `#737373`) |
| Footer title | `x="40"`, 14px above the bottom, `font-size="12"`, `font-weight="600"`, `fill="#1A1A2E"`, written in sentence case |
| Footer logo | The logo group at `translate(887.0,<height - 28.2>) scale(0.036)`, shown in the template later in this guide |
| Footer name | `NeoHive` at `x="960"`, 14px above the bottom, `font-size="11"`, `font-weight="600"`, `text-anchor="end"`, `fill="#737373"` |

- **Copy the logo paths verbatim from `NeoHiveIcon.svelte`.** Never redraw, trace, or hand-edit the logo. A redrawn logo drifts from the brand, and the drift is invisible until two diagrams sit side by side.
- **Keep the logo and the name small and in the footer.** The brand is there so a diagram copied out of the docs still says where it came from. A large logo competes with the content for the reader's attention.

## Fonts (Must Follow)

- **Embed the fonts in every diagram with `@font-face` rules.** GitBook shows each diagram as an image, and an SVG shown as an image cannot load anything from outside the file, so a Google Fonts `@import` never loads. Without embedded fonts, readers see their own system font, which is wider and heavier, and long labels spill out of their boxes.
- **Copy the `<style>` block from an existing diagram.** It holds four `@font-face` rules: Instrument Sans for weights 400 to 800, and IBM Plex Mono for weights 400, 500, and 600 to 700, each as a base64 WOFF2 file. Together they add about 53KB to each diagram.
- **Use only the characters the embedded fonts hold.** The fonts are cut down to printable ASCII plus `·` and `…`, the only other characters the diagrams used on 2026-10-09. A character outside that set, such as an accented letter or a new symbol, falls back to a system font. If a diagram needs one, rebuild the font subset with that character and update every diagram.

## Template (Quick Reference)

Start every new diagram from this skeleton. Replace `<height>` and the footer positions, and copy the `@font-face` rules from an existing diagram.

```xml
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="1000" height="<height>" viewBox="0 0 1000 <height>" font-family="'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif">
  <style>/* The four @font-face rules, copied from any diagram in docs/.gitbook/assets/. */
    .mono { font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    .lbl { font-size: 10.5px; font-weight: 600; letter-spacing: 1.1px; }
    .title { font-size: 15px; font-weight: 600; fill: #1A1A2E; }
    .body { font-size: 12.5px; fill: #4A4458; }
    .item { font-size: 12px; fill: #1A1A2E; }
    .muted { font-size: 11.5px; fill: #737373; }
  </style>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#7C3AED"/></marker>
    <marker id="arrT" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#1F7F78"/></marker>
    <marker id="arrA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#A65A1F"/></marker>
    <marker id="arrG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#2F7D4F"/></marker>
    <marker id="arrM" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#A1A1A1"/></marker>
  </defs>
  <rect width="1000" height="<height>" fill="#FAFAFA"/>

  <!-- Content starts at y=32. -->

  <!-- Footer. Logo paths copied verbatim from frontend/src/lib/icons/NeoHiveIcon.svelte. -->
  <text x="40" y="<height - 14>" font-size="12" font-weight="600" fill="#1A1A2E">Diagram title</text>
  <g transform="translate(887.0,<height - 28.2>) scale(0.036)" fill="none" stroke-width="20"><path d="M274.811 240.3L142.406 316.428L10.0002 240.3V87.665L142.406 11.5352L274.811 87.665V240.3Z" stroke="#7C3AED"/><path d="M406.428 315.818L274.023 391.946L141.617 315.818V163.183L274.023 87.0532L406.428 163.183V315.818Z" stroke="#A78BFA"/><path d="M274.811 391.336L142.406 467.464L10.0002 391.336V238.701L142.406 162.571L274.811 238.701V391.336Z" stroke="#C084FC"/></g>
  <text x="960" y="<height - 14>" font-size="11" font-weight="600" text-anchor="end" fill="#737373">NeoHive</text>
</svg>
```

## Color (Must Follow)

Each color carries one meaning across every diagram. A reader who has learned that teal means "comes back to you" on one page reads it the same way on the next.

| Color | Hex | Use it for |
| --- | --- | --- |
| Violet | `#7C3AED` | The main flow, primary arrows, section labels, numbered badges, and a border on a box the reader should look at first |
| Deep violet | `#7008E7` | Code or paths in `.mono` |
| Green | `#2F7D4F` | A good outcome: done, the right way in a comparison, a check that passes, a healthy or kept state such as **ACTIVE** or **KEPT**, and the safe setup |
| Teal | `#1F7F78` | Content moving: coming in from outside (a repository, a sync) or coming back to the agent (recall), steps that run automatically, and Memory type tags such as **CONVENTION**. Never use teal for success. |
| Amber | `#A65A1F` | A caution: something the reader must do by hand, warnings such as "never open this port", failure branches such as a `401` reply, the wrong way in a before-and-after comparison, and the **ERROR_PATTERN** tag |
| Gray | `#A1A1A1` | Neutral "then" arrows that only show order, with the `arrM` marker |
| Ink | `#1A1A2E` | Titles and item text |
| Body | `#4A4458` | Body text |
| Muted | `#737373` | Captions, the footer name, and secondary notes |
| Background | `#FAFAFA` | The canvas |
| Box fills | `#FFFFFF`, `#F1F1F4` | Boxes, alternating by nesting level as the next table shows |
| Border | `#DCDCE1` | The edge of an outermost box, and every dashed border |
| Lines and placeholders | `#E4E4E7`, `#D4D4D8`, `#EDEDF0` | `#E4E4E7` for a divider, `#D4D4D8` for a timeline's line, and `#EDEDF0` for the gray bars that stand for text in a drawing of a screen |

- **Put color on text, arrows, badges, and accent bars, not on box fills.** A box filled or outlined in a pale tint of its color looks busy next to the strong color of its text. Neutral boxes let the colored parts carry the meaning.
- **Use the softer green, teal, and amber in this table, not the app's success and warning colors.** Violet, ink, muted, and white come from the NeoHive app's tokens in `frontend/src/app.css` in the `NeoHiveAI/MemVec` repository: `--primary`, `--foreground`, `--muted-foreground`, and `--card`. The app's own green and amber are brighter and clash with violet when several sit in one image, so the diagrams use toned-down shades with the same meanings.
- **Never add a color outside this table.** A new color has no meaning the reader has learned, so it reads as decoration or as a mistake. If an idea needs a new meaning, add the color to this table first, with its meaning.
- **Never rely on color alone.** Pair each color with a label, such as **AUTOMATIC** or **YOU DO THIS**. Readers who cannot tell the colors apart, and readers of the alt text, get the meaning from the label.

## Type (Must Follow)

| Class | Size and weight | Use it for |
| --- | --- | --- |
| `.lbl` | 10.5px, 600, letter-spacing 1.1px, capitals | Small labels above a title, such as **HIVE** or **INDEX** |
| `.title` | 15px, 600 | The name of a card or step |
| `.body` | 12.5px, 400 | One or two short lines under a title |
| `.item` | 12px, 400 | Entries inside a card, such as file names or Memory text |
| `.muted` | 11.5px, 400, `#737373` | Captions |
| `.mono` | IBM Plex Mono | Code, paths, URLs, tool names, environment variables |

- **Use only weights 400, 500, and 600.** Use 600 for titles, labels, and anything that must stand out, 500 for secondary emphasis, and 400 for everything else. Weights 700 and 800 look harsh at diagram sizes, and a mix of many weights makes a diagram look noisy.
- **Use the sizes in this table in new work.** Older diagrams also use `.lbl` at 11px, `.body` at 12px or 13px, `.title` at 14px or 16px, `.item` at 10.5px or 11px, and a `.small` class equal to `.muted`. Leave those as they are, because each diagram is consistent within itself.
- **Use Instrument Sans for all text except code, and IBM Plex Mono for code.** These are the NeoHive brand fonts, embedded in each file as the Fonts section describes.
- **Keep every text size at 9px or larger.** Readers see a 1000-wide diagram scaled down to fit the page, and smaller still on a phone, so smaller text becomes unreadable. The smallest text in any existing diagram is 9px.
- **Write diagram text in plain English, following `internal/style-guide.md`.** Capitalize Hive, Index, and Memory, use sentence case for titles, and use no em-dashes. Diagram text is read by the same readers as the page around it.

## Shapes and lines (Must Follow)

| Shape | Corner radius | Use it for |
| --- | --- | --- |
| Outer container, such as a machine or a Hive | `rx="3"` | Things that hold other things |
| Card | `rx="2"` | One thing, such as an Index, a step, or a service |
| Inner card | `rx="2"` | A thing inside a card |
| Chip | `rx="1.5"` | A file name, a Memory, or a code sample inside a card |
| Field in a drawing of a screen | `rx="1.5"` | An input or a dropdown, as in `admin-playground.svg` |
| Placeholder bar | `rx="1"` | A gray bar standing for a line of text in a drawing of a screen |
| Accent bar | half the width (`rx="1.75"` on a 3.5px bar) | A colored strip down the left edge of a card, in the color of the card's meaning from the color table, such as green for the right way and amber for the wrong way |
| Pill label | half the height | A label that sits on a line, such as the sync label in `context-repositories.svg` |

Fill each box by how deeply it is nested, counting the boxes around it, so every box stands apart from the one that holds it:

| Nesting level | Fill | Border |
| --- | --- | --- |
| 1, a box on the canvas | `#FFFFFF` | `#DCDCE1` |
| 2, a box inside a level 1 box | `#F1F1F4` | None |
| 3 | `#FFFFFF` | None |
| 4 | `#F1F1F4` | None |

- **Give only the outermost boxes a border.** Boxes inside them are told apart by fill alone. A line around every box makes a diagram look crowded, and the alternating fills already show where each box ends.
- **Use a colored border sparingly, to point at the boxes a reader should look at first,** such as the outcomes of a decision or the result of a flow. Its color follows the color table. Most diagrams need none.
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
- **Use a dashed border for something outside NeoHive itself,** such as a Shared Index that another Hive owns, your agent's model provider, or a proxy you run in front of NeoHive. Keep the dashed border at every nesting level, and label the box, for example **YOU RUN THIS**.

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

Render the diagram as an image, the way GitBook shows it, at its real size, and look at it. Diagram bugs, such as overflowing text, overlapping labels, missing fonts, and arrowheads hidden behind boxes, are invisible in the source and obvious in the render. Opening the SVG file directly is not enough, because a browser then loads fonts that GitBook cannot.

```bash
printf '<body style="margin:0"><img src="<name>.svg" width="1000">' > docs/.gitbook/assets/preview.html
google-chrome \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --window-size=1000,<height> \
  --virtual-time-budget=4000 \
  --screenshot=/tmp/diagram.png \
  "file://$PWD/docs/.gitbook/assets/preview.html"
rm docs/.gitbook/assets/preview.html
```

| Check | How to check |
| --- | --- |
| **The footer matches the template.** | Compare the title, logo group, and name with the template, character for character. |
| **The fonts are embedded.** | The `<style>` block holds four `@font-face` rules, and the render shows Instrument Sans, not a system font. |
| **No element overlaps another.** | Look at every label, arrow, and box edge in the render. The only allowed overlaps are an arrow crossing a container's edge and a timeline line behind its stops. |
| **Every color is in the color table.** | Search the file for `#` and compare each value with the table. The logo keeps its own three colors. |
| **Box fills alternate by level, and only outer boxes have a border.** | Look at each nested box in the render. |
| **No text is smaller than 9px, and no weight is above 600.** | Search the file for `font-size`, and for `font-weight` outside the `@font-face` rules. |
| **The alt text covers the whole diagram.** | Read the alt text without the image. You should still understand the idea. |
| **The page uses the diagram, and the diagram matches the page.** | Search `docs/` for the file name. |
