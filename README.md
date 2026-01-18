# www.asisaga.com

[![SCSS Compilation Test](https://github.com/ASISaga/www.asisaga.com/actions/workflows/test-scss.yml/badge.svg)](https://github.com/ASISaga/www.asisaga.com/actions/workflows/test-scss.yml)

Genesis of Artificial Superintelligence - Main Website

## Overview

This repository contains the main website for ASI Saga (`www.asisaga.com`). The site is built using Jekyll with GitHub Pages and implements the **Genesis Ontological Design System** from the [theme repository](https://github.com/ASISaga/theme.asisaga.com).

## Genesis Ontological Design System

This subdomain uses the **Genesis Semantic SCSS Engine** - a three-tier architecture that separates content semantics from visual presentation.

### Three-Tier Architecture

**Tier 1: Content (HTML)**
- Defines WHAT the data is
- Semantic HTML5 with meaningful class names
- No inline styles or style attributes

**Tier 2: Interface (SCSS)**
- Defines the ROLE of the content
- Uses ontological mixins exclusively
- **ZERO raw CSS properties allowed**

**Tier 3: Engine (Theme)**
- Defines the LOOK (OKLCH, Glassmorphism, Bento Grid)
- Lives in theme repository
- Only place where raw CSS properties exist

### Six Ontological Categories

All styling uses semantic mixins from six categories:
1. `genesis-environment($logic)` - Layout and spatial organization
2. `genesis-entity($nature)` - Visual presence and glassmorphism (includes responsive media)
3. `genesis-cognition($intent)` - Typography and information type
4. `genesis-synapse($vector)` - Interaction and navigation
5. `genesis-state($condition)` - Temporal state
6. `genesis-atmosphere($vibe)` - Sensory texture

**Recent Enhancement:** The Genesis Ontology was enhanced with comprehensive responsive design capabilities (January 2026). Typography auto-scales, interactions are touch-optimized, and new variants support mobile navigation, responsive media (via `genesis-entity`), and viewport-aware layouts. See [Responsive Migration Guide](RESPONSIVE_MIGRATION.md) for details.

See [SCSS Instructions](.github/instructions/scss.instructions.md) for the complete API.

## Development

### Prerequisites

- Node.js 20+ (for SCSS testing)
- npm (comes with Node.js)

### Setup

```bash
# Clone the repository
git clone https://github.com/ASISaga/www.asisaga.com.git
cd www.asisaga.com

# Install dependencies
npm install
```

### Testing SCSS Compilation

This repository includes a test script that validates all SCSS files compile successfully with Genesis Ontology mixins:

```bash
npm run test:scss
```

**What it does:**
- Clones/updates the theme repository to `.theme-cache/`
- Compiles all SCSS files with proper load paths
- Reports missing mixins, variables, or syntax errors
- Outputs compiled CSS to `.test-output/` (gitignored)

See [scripts/README.md](scripts/README.md) for detailed documentation.

### File Structure

```
.
├── _sass/                      # Subdomain SCSS files
│   ├── _main.scss             # Main SCSS entry (imports ontology)
│   └── pages/                 # Page-specific SCSS partials
│       ├── _index.scss        # Homepage styling
│       ├── _home.scss         # Marketing page styling
│       ├── _about.scss        # About page styling
│       ├── _contact-page.scss # Contact page styling
│       └── _sitemap.scss      # Sitemap styling
├── _includes/                 # Custom includes
├── _layouts/                  # Custom layouts (minimal, prefer theme)
├── _data/                     # Site data files
├── assets/                    # Static assets (JS, images, CSS)
├── scripts/                   # Build and test scripts
│   ├── test-scss-compilation.js  # SCSS compilation test
│   └── README.md              # Script documentation
├── .github/
│   ├── instructions/          # Development instructions
│   │   ├── scss.instructions.md     # SCSS guidelines
│   │   ├── html.instructions.md     # HTML/Liquid guidelines
│   │   ├── js.instructions.md       # JavaScript guidelines
│   │   └── testing.instructions.md  # Testing conventions
│   └── workflows/             # GitHub Actions
│       └── test-scss.yml      # SCSS compilation CI
├── package.json               # Node dependencies and scripts
├── _config.yml                # Jekyll configuration
├── GENESIS_MIGRATION.md       # Genesis Ontology migration guide
└── README.md                  # This file
```

## Instructions & Documentation

Development guidance is organized in `.github/instructions/`:

- **[architecture.instructions.md](.github/instructions/architecture.instructions.md)** - Repository structure and architecture
- **[scss.instructions.md](.github/instructions/scss.instructions.md)** - Genesis Ontology SCSS system (REQUIRED READING)
- **[html.instructions.md](.github/instructions/html.instructions.md)** - HTML/Liquid template guidelines
- **[js.instructions.md](.github/instructions/js.instructions.md)** - JavaScript conventions
- **[testing.instructions.md](.github/instructions/testing.instructions.md)** - Testing philosophy and CI

## Contributing

### Making Changes

1. **Read the instructions** in `.github/instructions/` first
2. **Use Genesis ontological mixins** for all styling (no raw CSS)
3. **Test SCSS compilation** before committing: `npm run test:scss`
4. **Follow semantic naming** - class names describe WHAT, not HOW

### SCSS Changes

When modifying SCSS files:

1. Use only Genesis ontological mixins (see [SCSS Instructions](.github/instructions/scss.instructions.md))
2. Never add raw CSS properties in subdomain SCSS
3. Mirror HTML structure in SCSS nesting
4. Test compilation locally: `npm run test:scss`

Example:
```scss
// ✅ CORRECT - Using ontological mixins
.hero-section {
  @include genesis-entity('primary');
  @include genesis-atmosphere('vibrant');
  
  .hero-title {
    @include genesis-cognition('axiom');
  }
}

// ❌ WRONG - Raw CSS properties
.hero-section {
  padding: 2rem;
  background: #1a1a2e;
  color: white;
}
```

### HTML Changes

When modifying HTML/Liquid templates:

1. Use semantic class names that describe WHAT the content is
2. One primary semantic class per element
3. No inline styles or inline event handlers
4. Map classes to ontological roles in SCSS

See [HTML Instructions](.github/instructions/html.instructions.md) for details.

## CI/CD

### GitHub Actions

- **SCSS Compilation Test** - Validates all SCSS compiles with Genesis Ontology
  - Runs on: Push to main, PRs affecting SCSS files
  - See: [.github/workflows/test-scss.yml](.github/workflows/test-scss.yml)

### Deployment

The site deploys automatically via GitHub Pages when changes are pushed to the `main` branch.

## Resources

### Internal Documentation
- [Genesis Migration Guide](GENESIS_MIGRATION.md) - Migration to ontological system
- [Scripts Documentation](scripts/README.md) - Test script details
- [SCSS Instructions](.github/instructions/scss.instructions.md) - Complete ontology API

### External Resources
- [Theme Repository](https://github.com/ASISaga/theme.asisaga.com) - Genesis Ontological Design System
- [Theme Ontology README](https://github.com/ASISaga/theme.asisaga.com/blob/main/_sass/ontology/Readme.md)
- [Theme Integration Guide](https://github.com/ASISaga/theme.asisaga.com/blob/main/_sass/ontology/INTEGRATION-GUIDE.md)

## License

See LICENSE file for details.

## Questions?

If you have questions:
1. Review instruction files in `.github/instructions/`
2. Check the Genesis Migration Guide
3. Look at existing SCSS files for examples
4. Create an issue for discussion
