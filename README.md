# www.asisaga.com

[![SCSS Compilation Test](https://github.com/ASISaga/www.asisaga.com/actions/workflows/test-scss.yml/badge.svg)](https://github.com/ASISaga/www.asisaga.com/actions/workflows/test-scss.yml)

Genesis of Artificial Superintelligence - Main Website

## Overview

This repository contains the main website for ASI Saga (`www.asisaga.com`). The site is built using Jekyll with GitHub Pages and uses the **Genesis Ontological Design System v4.0** from the [theme repository](https://github.com/ASISaga/theme.asisaga.com).

The repository is kept intentionally lean — all shared components, layouts, and design system mixins come from the theme. Only page-specific content and SCSS semantic mappings live here.

## Genesis Ontological Design System v4.0

This subdomain uses the **Genesis Semantic SCSS Engine** — a three-tier architecture that separates content semantics from visual presentation.

### Three-Tier Architecture

**Tier 1: Content (HTML)** — Defines WHAT the data is (semantic class names, no inline styles)

**Tier 2: Interface (SCSS)** — Defines the ROLE of the content (ontological mixins only, zero raw CSS)

**Tier 3: Engine (Theme)** — Defines the LOOK (OKLCH, Glassmorphism, Bento Grid — lives in theme)

### Ontological Categories

All styling uses semantic mixins from six categories:
1. `genesis-environment($logic)` — Layout and spatial organization
2. `genesis-entity($nature)` — Visual presence and glassmorphism
3. `genesis-cognition($intent)` — Typography and information type
4. `genesis-synapse($vector)` — Interaction and navigation
5. `genesis-state($condition)` — Temporal state
6. `genesis-atmosphere($vibe)` — Sensory texture

See the [theme CHANGELOG](https://github.com/ASISaga/theme.asisaga.com/blob/main/CHANGELOG.md) for the full v4.0 variant registry.

## Development

### Prerequisites

- Node.js 20+ (for SCSS testing)

### Setup

```bash
git clone https://github.com/ASISaga/www.asisaga.com.git
cd www.asisaga.com
npm install
```

### Testing SCSS Compilation

```bash
npm run test:scss
```

Validates all SCSS files compile successfully with Genesis Ontology mixins by cloning the theme repository to `.theme-cache/`.

### File Structure

```
.
├── _sass/                      # Subdomain SCSS files
│   ├── _main.scss             # Main entry (imports page partials)
│   └── pages/                 # Page-specific SCSS
│       ├── _index.scss        # Homepage
│       ├── _about.scss        # About page
│       ├── _contact-page.scss # Contact page
│       └── _sitemap.scss      # Sitemap
├── _data/                     # Site data files
├── assets/
│   ├── js/script.js           # JS entry (imports theme common.js)
│   └── images/                # Site images
├── index.html                 # Homepage
├── about/index.html           # About page
├── contact/index.html         # Contact page
├── sitemap/index.html         # Sitemap page
├── scripts/                   # Build and test scripts
├── _config.yml                # Jekyll configuration
└── package.json               # Node dependencies
```

All layouts (`landing`, `default`, `form`), shared includes (`hero.html`, `section-header.html`, `feature-grid.html`, `cta.html`, etc.), and the Genesis Ontology engine come from the [theme repository](https://github.com/ASISaga/theme.asisaga.com).

## Contributing

1. **Read** `.github/instructions/` for SCSS, HTML, JS, and testing guidelines
2. **Use Genesis ontological mixins** for all styling (no raw CSS)
3. **Test SCSS compilation** before committing: `npm run test:scss`
4. **Use semantic class names** — names describe WHAT, not HOW

## Deployment

The site deploys automatically via GitHub Pages when changes are pushed to `main`.

## Resources

- [Theme Repository](https://github.com/ASISaga/theme.asisaga.com) — Genesis Ontological Design System
- [Theme CHANGELOG](https://github.com/ASISaga/theme.asisaga.com/blob/main/CHANGELOG.md) — v4.0 variant registry
- [SCSS Instructions](.github/instructions/scss.instructions.md) — Complete ontology API
- [HTML Instructions](.github/instructions/html.instructions.md) — Template guidelines
