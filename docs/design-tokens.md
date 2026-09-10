# Design Tokens — Rationale

This spec (§8–9) intentionally leaves two decisions open: which single
accent color, and which three typefaces. Both are chosen here — flagged,
not silent, per §73 of the spec ("Claude must not make major
architectural decisions silently"). Swap any of it if it's not right.

## How this was decided

Ran the `ui-ux-pro-max` design-system search against this brief first.
Worth recording honestly: the top aggregate matches were off-target —
one returned a light-mode luxury-fashion "Liquid Glass" system (gold
accent, serif display face), the closest `style`-domain matches were
`hud-sci-fi-fui` and `cyberpunk-ui` (neon cyan/magenta, "iron man,
sci-fi" — precisely what spec §7 says to avoid). A catalog tuned for
SaaS/e-commerce/dashboard archetypes doesn't have an entry for
"motorsport engineering HUD," and forcing one on would violate the
skill's own instruction not to persist an unverified match. Retried
once with narrower terms per the skill's guidance; the `typography` and
`gsap` domain queries did return directly usable results (below), so
those are used as-is. Color and overall style direction come from the
spec's own explicit instructions (§8), applying standard dark-mode
contrast/accessibility practice on top.

## Colors

Near-black background and off-white text are specified directly (§8).
The open choice was the single accent, from the spec's three options:

| Option | Why not |
|---|---|
| Motorsport red/orange | Reads as a warning/destructive color as much as an accent — collides with the error/critical state the UI still needs elsewhere |
| Electric blue | Generic "tech/SaaS" association; doesn't carry a motorsport-specific meaning |
| **Telemetry green** ✓ | Matches the boot sequence and footer copy the spec itself writes ("TELEMETRY ONLINE", "SYSTEM STATUS: ONLINE") — green-for-online is already the vocabulary the spec uses. Kept desaturated enough to avoid the neon/cyberpunk look §7 rules out. |

```
--color-background      #0A0B0D   near-black, cool-neutral
--color-surface         #121317   cards / elevated panels
--color-foreground      #F1F2F4   primary text (off-white, not pure white)
--color-foreground-muted #B8BBC2  secondary text
--color-accent          #34E27A   telemetry green — sparingly, per §8
--color-critical         #F0453E  errors only — never used as the accent
```

Contrast-checked against the accessibility baseline the search tool
flags for dark UI (4.5:1 body text, visible focus rings): off-white on
`#0A0B0D` clears it comfortably; green accent text is used for short
labels/values, not body copy, so it isn't relied on for long-form
contrast.

## Typography

Three roles per spec §9. The `typography` domain search returned two
directly relevant, verified pairings instead of one invented from
scratch:

- **Display — Barlow Condensed.** From the catalog's "Sports/Fitness"
  pairing (condensed, energetic, built for impact headlines) — used for
  the wordmark, section titles, project titles.
- **Body — Inter.** Diverges from the catalog's suggested body partner
  (Barlow) in favor of Inter, which is purpose-built for long-form UI
  reading at small sizes — this site's case-study prose is dense, and
  Inter's hinting holds up better there than a condensed-family sibling.
- **Technical — JetBrains Mono.** From the catalog's "Developer Mono"
  pairing. Chosen over the alternative match (Fira Code) because its
  design goal — maximum character distinction, especially digits — is
  a closer fit for telemetry values than Fira Code's ligature-focused,
  code-editor orientation.

## Motion

The `gsap` domain search returned four ready-to-use, reduced-motion-aware
snippets (scroll reveal at Subtle/Standard intensity, list stagger,
headline stagger via SplitText) that match spec §19–21 directly —
these seed `lib/motion/` once animation work starts (spec's own Phase 6 /
Step 10), not in this pass.

## Spacing

No custom scale was defined — Tailwind v4's single `--spacing: 0.25rem`
base already multiplies out to the 4/8/12/16/24/32/48/64/96px scale
used throughout, so overriding it would just be restating the default.

## Still open

- Confirm the accent choice (or pick red/orange or blue instead).
- Real product screenshots/diagrams will likely want 1–2 accent-adjacent
  neutrals added once they exist (e.g., a chart palette) — not guessed
  at here since no chart content exists yet to design against.
