---
applyTo: "**/*.html,**/*.liquid,**/*.md,_includes/**,_layouts/**"
description: "HTML and Jekyll/Liquid guidance for www.asisaga.com: templates, includes, accessibility, Genesis ontological design system, and site-level coordination."
---

# Subdomain & Theme Structure
- This repo is the `www.asisaga.com` subdomain. The canonical theme lives in `ASISaga/theme.asisaga.com` and supplies `_layouts`, `_includes`, `_sass`, and shared `assets`.
- Theme-provided head, navigation, and footer are authoritative across subdomains. Only override them when strictly necessary and documented.
- The theme provides the **Genesis Ontological Design System** - a semantic SCSS engine that separates content from presentation.
- **Responsive Design Enhancements (2026-01-18):** The Genesis Ontology now includes comprehensive responsive capabilities - typography auto-scales, interactions are touch-optimized, and new variants support mobile navigation, form layouts, and responsive media.

# File Locations & Conventions (HTML/Liquid)
- Custom partials / UI components: place under `_includes/` only if they are subdomain-specific and not available in the theme.
- Page templates and layouts: use `_layouts/` and keep layout logic minimal — prefer includes for repeatable fragments.
- Content files: place markdown or HTML pages at the repository root or under collections per the site's `website_structure.json`.

# Build & Inheritance
- GitHub Pages merges the theme into the subdomain at build time. Do not duplicate theme files unless you must override a specific behavior.
- To override a theme file, add a file with the exact same path/name in this repo and document the reason in a PR description.

# Semantic HTML & Genesis Ontology Integration
- Use **meaningful, semantic class names** that describe WHAT the content is, not HOW it looks
  - ✅ `.research-paper`, `.product-grid`, `.team-member`
  - ❌ `.blue-box`, `.large-text`, `.rounded-card`
- One primary semantic class per element (additional utility classes are acceptable)
- Classes are mapped to ontological roles in SCSS using Genesis semantic mixins
- HTML structure should be mirrored exactly in SCSS nesting

# Accessible Markup & Patterns
- Mobile-first, semantic markup is required.
- Use ARIA only when necessary; prefer native semantic elements first (buttons, nav, main, header, footer, form controls).
- Ensure interactive patterns are keyboard-accessible and that landmarks are present for screen readers.

# Color & Contrast
- Color tokens and layout variables must meet WCAG AA contrast for normal text. 
- All color and styling decisions are handled by the Genesis Ontological Design System in the theme engine.
- If a new visual treatment is needed, map it to an appropriate ontological role in SCSS rather than adding inline styles.

# Jekyll & Liquid Guidance
- Use Liquid includes: `{% include 'name.html' %}` for small partials and `{% include_cached %}` if available in the theme for expensive fragments.
- Keep logic thin in templates; heavy logic belongs in data files or build-time processing.

# Integration & Coordination (High-level)
- Theme changes that add or rename tokens, variables, mixins, or includes require coordinated PRs: open a PR in `ASISaga/theme.asisaga.com` and link the subdomain PR.
- For breaking or cross-repo changes, create a coordination issue and assign reviewers from theme and subdomain teams.

# CI, Testing & Buddhi Responsibilities
- CI should run static checks (HTML validation, link checkers) and accessibility audits (axe, Lighthouse) for PRs.
- Offload heavier, cross-site audits to the Buddhi MCP server (Playwright/Lighthouse full runs, vulnerability scans). Provide a prompt artifact under `.github/prompts/` when invoking Buddhi tools.

# Do Not
- Do not override global theme head, navigation, or footer unless approved and documented.
- Do not add build-time logic in templates; keep Liquid simple and testable.
- **Do not use inline styles or inline CSS properties** - all styling comes from the Genesis Ontological SCSS system.

## Pattern Scans & Forbidden Patterns
- **Inline assets (fail):** Do not commit inline `<style>` or `<script>` tags inside `_includes/`, `_layouts/`, or content files. Use the theme or component partials instead.
- **Inline event handlers (fail):** Avoid `on*=` attributes in templates (e.g., `onclick=`). Prefer unobtrusive event binding in `assets/js`.
- **Inline style attributes (fail):** Do not use `style=""` attributes. Map classes to ontological roles in SCSS instead.
- **Example regexes:** Use these patterns in CI scans for template-level violations:
	- Inline style/script: `/<\\s*style[\\s>]/i`, `/<\\s*script[\\s>]/i`
	- Inline event handlers: `/\\s(on\\w+)\\s*=/i`
	- Inline style attributes: `/style=\"/i`

## Structural Checks (component mapping)
- **Component SCSS mapping:** For each `_includes/components/<name>.html` expect a corresponding `/_sass/components/_<name>.scss` partial. If a component intentionally has no partial, document the exception in the include header comment and PR description.
- **HTML-SCSS mirroring:** SCSS nesting structure should mirror the HTML DOM hierarchy exactly for maintainability and clarity.

## Accessibility Smoke Tests
- **Run smoke audits:** CI should run lightweight accessibility audits (axe-core or headless Lighthouse) for critical pages and report top-level violations. Severe issues should block merges.
- **Escalation:** For heavier cross-site audits, coordinate with Buddhi/MCP tooling and provide an invocation artifact under `.github/prompts/` when needed.

## Genesis Ontological Design System Integration
- HTML provides semantic structure with meaningful class names
- SCSS maps those classes to ontological roles using the six Genesis categories:
  1. `genesis-environment($logic)` - Layout and spatial organization
  2. `genesis-entity($nature)` - Visual presence and glassmorphism
  3. `genesis-cognition($intent)` - Typography and information type
  4. `genesis-synapse($vector)` - Interaction and navigation
  5. `genesis-state($condition)` - Temporal state
  6. `genesis-atmosphere($vibe)` - Sensory texture
- See `.github/instructions/scss.instructions.md` for complete details on the ontological system
