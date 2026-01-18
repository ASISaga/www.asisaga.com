---
applyTo: "**/*"
description: "Repository architecture, companion-file roles, Genesis ontological design system integration, and agent responsibilities for the www.asisaga.com subdomain."
---

# Companion File Structure & Repository Architecture

This file documents the companion-file codex and how agents should interpret the repository structure.

- **README.md** — Human-facing entry point. Quick start, project overview, and contribution guide.
- **.github/instructions/scss.instructions.md** — Genesis ontological SCSS design system guidance, three-tier architecture, semantic mixins, and zero raw CSS rule.
- **.github/instructions/html.instructions.md** — Template and Jekyll/Liquid guidance, semantic HTML, Genesis ontology integration, and accessibility checks.
- **.github/instructions/js.instructions.md** — JS entry, asset ordering, vendor rules, and HTML-in-JS scans.
- **.github/instructions/testing.instructions.md** — Testing philosophy, conventions, and CI/CD hooks.
- **.github/agents/** — Role-focused agent files (lint-agent.md, api-agent.md, docs-agent.md, test-agent.md, etc.).

Each file is atomic: it covers one domain of guidance. Together, they form a codex for both humans and Copilot agents.

## Repository layout (agent interpretation)

- This is the `www.asisaga.com` subdomain repository
- `_sass/` — Subdomain-specific SCSS using Genesis ontological design system
- `_includes/` — Subdomain-specific includes and components
- `_layouts/` — Subdomain-specific layout overrides (use sparingly)
- `assets/` — Subdomain-specific assets (JS, images, CSS)
- Theme source: `https://github.com/ASISaga/theme.asisaga.com` — Canonical theme with Genesis Ontological Design System

## Genesis Ontological Design System

This subdomain uses the **Genesis Semantic SCSS Engine** from the theme repository:

### Three-Tier Architecture
1. **Tier 1: Content (HTML)** - Defines WHAT the data is (semantic class names)
2. **Tier 2: Interface (SCSS)** - Defines the ROLE of the content (ontological mixins only)
3. **Tier 3: Engine (Theme)** - Defines the LOOK (OKLCH, Glassmorphism, Bento Grid)

### Seven Ontological Categories
All subdomain SCSS uses these semantic mixins exclusively:
1. `genesis-environment($logic)` - Layout and spatial organization (includes responsive navigation and form layouts)
2. `genesis-entity($nature)` - Visual presence and glassmorphism
3. `genesis-cognition($intent)` - Typography and information type (auto-responsive scaling)
4. `genesis-synapse($vector)` - Interaction and navigation (touch-optimized by default)
5. `genesis-state($condition)` - Temporal state (includes scroll-triggered animations)
6. `genesis-atmosphere($vibe)` - Sensory texture (includes content density and viewport awareness)
7. `genesis-media($format)` - Media and embedded content (responsive images and iframes) **[NEW]**

### Responsive Design Enhancements (2026-01-18)
The Genesis Ontology now includes comprehensive responsive capabilities:
- **Auto-responsive typography** - Text scales appropriately across all viewports
- **Touch-optimized interactions** - All buttons/links meet WCAG 2.1 (44x44px mobile)
- **Responsive grids** - Automatic column adaptation (1 col mobile → auto-fit desktop)
- **Mobile navigation patterns** - Built-in drawer/hamburger menu support
- **Responsive media** - Eliminates need for inline styles on images/iframes
- **Content density variants** - Viewport-appropriate spacing and layouts

These enhancements are **non-breaking and additive**. Existing code benefits automatically from improved typography and touch targets.

### Zero Raw CSS Rule
Subdomain SCSS files **MUST NOT** contain raw CSS properties. All styling comes from ontological mixins in the theme engine.

## Integration points (high level)

- **Theme coordination (overview):** Changes that affect shared layout, tokens, or build-time behavior typically require coordinated PRs across the theme and subdomain repositories.
- **Genesis ontology updates:** When the theme adds new ontological variants or mixins, subdomains can adopt them without code changes - just remap HTML classes.
- **Vendor flow (overview):** Vendor artifacts are prepared locally and committed under vendor directories in `assets` or `_sass/vendor` for reproducible builds.
- **CI hooks:** Automated checks should be wired into the repository's CI (GitHub Actions) and may call Buddhi/MCP tools for heavier audits.

For specific guidance on templates, accessibility, component mappings, SCSS conventions, and JS vendor/initialization rules, consult the focused instruction files below rather than duplicating their content here:

- `.github/instructions/html.instructions.md` — HTML, Jekyll/Liquid templates, includes, semantic class naming, accessibility, and Genesis ontology integration.
- `.github/instructions/scss.instructions.md` — Genesis ontological SCSS system, three-tier architecture, six semantic categories, zero raw CSS rule, and import chain.
- `.github/instructions/js.instructions.md` — JS entry points, vendor flow, runtime initialization, and forbidden patterns.

## Buddhi / MCP guidance

For Buddhi/MCP-specific agent behavior and operational guidance (agent prompt contracts, execution mapping, and interaction patterns), see: `.github/agents/buddhi-agent.md`.

## Agent responsibilities (architecture-specific)

Agents should consult the domain-specific instruction files listed above when performing validation related to HTML templates, SCSS partials, or JS assets. High-level responsibilities remain:

- Validate site structure and that overrides are intentional and documented.
- Ensure all SCSS follows the Genesis ontological design system with zero raw CSS properties.
- Verify HTML uses semantic class names that are mapped to ontological roles in SCSS.
- Ensure SCSS nesting structure mirrors HTML DOM hierarchy.
- Ensure cross-repo coordination for breaking changes to shared theme artifacts.
- Invoke Buddhi/MCP tooling for heavy audits and provide an invocation artifact under `.github/prompts/` when required.

## Change coordination guidance

- For breaking changes to design tokens, mixins, or shared components: create a coordination issue, link PRs across theme and subdomain repos, and assign reviewers from both teams.
- Prefer additive changes in the theme (new tokens/mixins) and deprecate old tokens gradually with a clear migration path.
- Document cross-repo rationale and migration steps in PR bodies to make review and rollout deterministic.
- When adopting new Genesis ontological variants from the theme, document the semantic mapping rationale in PR descriptions.