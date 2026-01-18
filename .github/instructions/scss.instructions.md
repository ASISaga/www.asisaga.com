---
applyTo: "**/_sass/**,**/*.scss,**/_sass/**/_*.scss"
description: "SCSS guidance for subdomain: Genesis ontological design system, three-tier architecture, semantic mixins, and zero raw CSS property rule."
---

# Genesis Ontological Design System - SCSS Instructions

This subdomain uses the **Genesis Semantic SCSS Engine** from the theme repository. All styling follows the three-tier architecture that separates content semantics from visual presentation.

## 🎯 RECENT UPDATES: Responsive Design Enhancements (2026-01-18)

The Genesis Ontology has been enhanced with comprehensive responsive design capabilities. Key improvements:

- **7th Category Added:** `genesis-media($format)` for responsive images and embedded content
- **Auto-Responsive Typography:** All `genesis-cognition` variants now scale automatically (2rem mobile → 3.5rem desktop)
- **Touch-Optimized Interactions:** All `genesis-synapse` variants now meet WCAG 2.1 (44x44px minimum on mobile)
- **Responsive Grid:** `genesis-environment('distributed')` now adapts automatically (1 col mobile → auto-fit desktop)
- **New Navigation Patterns:** `genesis-environment('navigation-primary')` for mobile drawer/hamburger menus
- **New Form Layouts:** `genesis-environment('interaction-form')` for responsive form field arrangement
- **Content Density Variants:** `genesis-atmosphere('spacious-mobile')` and `'dense-desktop'` for viewport-appropriate spacing
- **Viewport Awareness:** `genesis-atmosphere('viewport-aware')` for hero sections with vh units

**Migration Impact:** These enhancements are **non-breaking and additive**. Existing code benefits automatically from responsive typography and touch optimization. New variants are opt-in.

## 🌟 PRIMARY METHOD: Genesis Semantic Engine (Required)

**For ALL development, use the ontology system exclusively.**

The Genesis Semantic Engine provides a three-tier architecture:

**Tier 1: Content (HTML)** - Defines WHAT the data is
- Semantic HTML5 elements with meaningful class names
- One semantic class per element
- No inline styles or style attributes

**Tier 2: Interface (SCSS)** - Defines the ROLE of the content
- Use ontological mixins only
- **ZERO raw CSS properties allowed**
- Import via: `@import "ontology/index";`

**Tier 3: Engine (Theme)** - Defines the LOOK (OKLCH, Glassmorphism, Bento)
- Lives in theme repository: `_sass/ontology/_engines.scss`
- Subdomains never touch this layer directly

## SCSS File Locations & Structure
- Subdomain SCSS lives under `/_sass/`.
- Page-specific styles: `/_sass/pages/` - each page has one matching partial
- Component partials: `/_sass/components/` (if needed for subdomain-specific components)
- Vendor partials: `/_sass/vendor/` — keep vendor code isolated and documented

## Import Chain & Entry Points
- **Main entry point:** `_sass/_main.scss`
- **First import MUST be:** `@import "ontology/index";`
- Then import page-specific partials: `@import "pages/home";`, etc.
- Keep imports at the top level minimal

Example `_main.scss`:
```scss
// REQUIRED: Import Genesis Ontology first
@import "ontology/index";

// Page-specific styles
@import "pages/home";
@import "pages/about";
@import "pages/contact-page";
@import "pages/sitemap";
```

## The Six Ontological Categories (Complete API)

Use these mixins exclusively - NO raw CSS properties allowed:

### 1. `genesis-environment($logic)` - Layout & Spatial Organization
- `'distributed'` - Autonomous Bento grid (auto-fit, responsive cards) - **Now responsive by default** (1 col mobile → 2 col tablet → auto-fit desktop)
- `'focused'` - Single column reading layout (max 70ch, centered)
- `'associative'` - Network/connection layout (flexbox wrap)
- `'chronological'` - Time-linear vertical stream (timeline, feed)
- `'manifest'` - High-density dashboard (12-column grid)
- `'navigation-primary'` - **NEW:** Main site navigation (horizontal desktop → mobile drawer with hamburger)
- `'navigation-secondary'` - **NEW:** Contextual navigation (breadcrumbs, section nav, footer nav) that simplifies on mobile
- `'interaction-form'` - **NEW:** Form layout optimized for data entry (multi-column desktop → single-column mobile)

### 2. `genesis-entity($nature)` - Visual Presence & Glassmorphism
- `'primary'` - Main content object (active glassmorphism, elevated)
- `'secondary'` - Supporting context (lighter glass, less prominent)
- `'imperative'` - Urgent system alert (pulsing neon border)
- `'latent'` - Dormant/inactive content (dimmed, grayscale)
- `'aggregate'` - Container for multiple items (wrapper styling)
- `'ancestral'` - Archived/historical data (muted, legacy)

### 3. `genesis-cognition($intent)` - Typography & Information Type
**All typography variants are now responsive by default** - text scales appropriately across viewports with 16px minimum on mobile for accessibility.

- `'axiom'` - Headlines (responsive: 2rem mobile → 3.5rem desktop, bold, high-resonance)
- `'discourse'` - Body prose (responsive: 1rem mobile → 1.125rem desktop, readable, serif)
- `'protocol'` - Technical/code content (monospace, responsive sizing)
- `'gloss'` - Small annotations (responsive: never smaller than 0.75rem, muted)
- `'motive'` - Persuasive/instructional text (semibold, accent, responsive)
- `'quantum'` - Tags/chips/micro-content (responsive, uppercase)

### 4. `genesis-synapse($vector)` - Interaction & Navigation
**All interaction variants now include touch optimization** - 44x44px minimum touch targets on mobile per WCAG 2.1.

- `'navigate'` - Link to different page (underline on hover, touch-optimized)
- `'execute'` - Local action/command (primary action button, 44px touch target mobile)
- `'inquiry'` - Request for data (search, expand, secondary action, touch-optimized)
- `'destructive'` - Delete/reset action (danger button, red, touch-optimized)
- `'social'` - Social sharing (rounded, social colors, 44px touch target mobile)
- `'input-primary'` - **NEW:** Primary form input (responsive sizing: 44-48px height mobile, 16px font minimum)

### 5. `genesis-state($condition)` - Temporal State
- `'stable'` - Content in equilibrium (normal, verified)
- `'evolving'` - Currently updating (animated progress)
- `'deprecated'` - No longer verified (strikethrough, warning)
- `'locked'` - Requires clearance (blur effect, lock icon)
- `'simulated'` - Projected data (dashed border, stripes)
- `'scroll-triggered'` - **NEW:** Content with scroll-based behavior (fade-in animations, respects prefers-reduced-motion)

### 6. `genesis-atmosphere($vibe)` - Sensory Texture
- `'neutral'` - Standard transparency (default, balanced)
- `'ethereal'` - High-transparency, light (bright, minimal)
- `'void'` - Deep-space, high-contrast (dark, immersive)
- `'vibrant'` - High-energy, colorful (energetic, neon)
- `'spacious-mobile'` - **NEW:** Content needing generous spacing on mobile (3x padding mobile → compact desktop)
- `'dense-desktop'` - **NEW:** High information density on large screens (grid desktop → single column mobile)
- `'viewport-aware'` - **NEW:** Content sized relative to viewport (hero sections with vh units, handles mobile chrome)

### 7. `genesis-media($format)` - Media & Embedded Content
**NEW CATEGORY** for responsive images and embedded media:

- `'image-adaptive'` - **NEW:** Responsive images with srcset support, aspect ratio preservation, lazy loading
- `'embed-responsive'` - **NEW:** Embedded content (iframes, videos) with aspect ratio preservation (eliminates need for inline styles)

## ZERO Raw CSS Property Rule (MANDATORY)

Subdomain SCSS files **MUST NOT** contain:
- ❌ `margin`, `padding`, `display`, `color`, `font-size`, `background`
- ❌ Any unit values: `px`, `rem`, `em`, `%`
- ❌ Any color values: `#hex`, `rgb()`, `oklch()`
- ❌ Any raw CSS properties whatsoever

**Only use ontological mixins** - All styling comes from the theme engine.

❌ **WRONG:**
```scss
.my-card {
  padding: 2rem;
  background: #1a1a2e;
  border-radius: 12px;
  color: white;
}
```

✅ **CORRECT:**
```scss
.my-card {
  @include genesis-entity('primary');  // All styling from engine
}
```

## Mirrored Structure Rule

SCSS nesting **MUST** mirror HTML DOM hierarchy exactly:

HTML:
```html
<main class="research-hub">
  <section class="paper-grid">
    <article class="paper-card">
```

SCSS:
```scss
.research-hub {
  @include genesis-environment('focused');
  
  .paper-grid {
    @include genesis-environment('distributed');
    
    .paper-card {
      @include genesis-entity('primary');
    }
  }
}
```

## Complete Example: Blog Post Page

```scss
@import "ontology/index";

.blog-post {
  @include genesis-environment('focused');     // Reading layout
  @include genesis-atmosphere('ethereal');     // Light, peaceful
  
  .post-header {
    @include genesis-entity('primary');        // Elevated card
    
    .post-title { 
      @include genesis-cognition('axiom');     // Large headline (auto-responsive)
    }
    
    .post-date { 
      @include genesis-cognition('gloss');     // Small metadata (auto-responsive)
    }
  }
  
  .post-content {
    @include genesis-cognition('discourse');   // Body text (auto-responsive)
  }
  
  .read-more {
    @include genesis-synapse('navigate');      // Link to next page (touch-optimized)
  }
}
```

## Responsive Design Examples

### Example: Contact Form (Using New Form Environment)

```scss
.contact-form {
  @include genesis-entity('primary');
  
  .form-fields {
    @include genesis-environment('interaction-form');  // Multi-col desktop → single-col mobile
  }
  
  .form-input {
    @include genesis-synapse('input-primary');         // Touch-optimized inputs (44px mobile)
  }
  
  .form-submit {
    @include genesis-synapse('execute');               // Touch-optimized button
  }
}
```

### Example: Responsive Navigation

```scss
.site-header {
  .main-nav {
    @include genesis-environment('navigation-primary');  // Horizontal desktop → drawer mobile
  }
}
```

### Example: Embedded Media (Replacing Inline Styles)

```scss
.map-container {
  @include genesis-media('embed-responsive');  // Aspect-ratio preserved iframe wrapper
}

.hero-image {
  @include genesis-media('image-adaptive');    // Responsive image with srcset support
}
```

### Example: Hero Section with Viewport Sizing

```scss
.hero-section {
  @include genesis-atmosphere('viewport-aware');  // Uses vh units, handles mobile chrome
  @include genesis-atmosphere('spacious-mobile'); // Extra padding on mobile
  
  .hero-title {
    @include genesis-cognition('axiom');          // Auto-scales: 2rem → 3.5rem
  }
}
```

## Combining Mixins

Apply one from each category for rich semantic meaning:

```scss
.urgent-dashboard {
  @include genesis-environment('manifest');    // Dashboard grid
  @include genesis-entity('imperative');       // Urgent alert styling
  @include genesis-state('evolving');          // Currently updating
  @include genesis-atmosphere('vibrant');      // High-energy vibe
}
```

## Best Practices

### Semantic Clarity
- Use meaningful class names: `.research-paper`, not `.blue-box`
- Think about WHAT it is, not HOW it looks
- Choose mixins based on semantic meaning, not desired appearance

### Structure
- SCSS nesting mirrors HTML DOM hierarchy exactly
- Limit nesting to match actual DOM structure (typically 3-4 levels)
- Each page has ONE matching SCSS partial in `/_sass/pages/`

### Maintainability
- Do not edit compiled CSS files. Edit SCSS partials only.
- Do not copy theme `_sass` files into the subdomain
- Prefer upstream fixes in the theme repository for visual changes

## Vendor & Third-party CSS
- Vendors should be placed in `/_sass/vendor/`
- Import from `_main.scss` after ontology import
- Verify vendor license and document the origin in a comment
- Vendor code is the ONLY exception to the zero raw CSS rule

## Validation Checklist

Before committing subdomain SCSS:
- [ ] Imports `@import "ontology/index";` at the top of `_main.scss`
- [ ] No raw CSS properties anywhere in subdomain SCSS files
- [ ] All styling via ontological mixins only
- [ ] SCSS nesting structure mirrors HTML DOM hierarchy
- [ ] Semantic class names used throughout HTML
- [ ] Each page partial matches corresponding HTML page

## Structural Checks & SCSS Scans
- **Component partial mapping:** If `_includes/components/<name>.html` exists, ensure corresponding `/_sass/components/_<name>.scss` exists (or document exception)
- **Zero raw CSS scan:** CI scans for forbidden CSS properties in subdomain SCSS
- **Ontology import check:** Verify `@import "ontology/index";` is present in `_main.scss`
- **Mirrored structure:** SCSS nesting should match HTML DOM hierarchy

## Enforcement & Linting
- **Stylelint in CI:** Run `stylelint` with the shared config
- **Zero raw CSS enforcement:** CI fails if raw CSS properties detected in subdomain SCSS
- **Manual review required:** For any exceptions or vendor code additions

## Testing SCSS Compilation

### Running SCSS Tests Locally

The repository includes a test compilation script that validates all SCSS files can compile successfully with the Genesis Ontology system:

```bash
npm install
npm run test:scss
```

This script:
1. **Clones/updates the theme repository** to `.theme-cache/theme.asisaga.com/` to access Genesis Ontology mixins
2. **Compiles all SCSS files** in `_sass/` directory with proper load paths
3. **Reports compilation errors** including missing mixins, variables, or syntax errors
4. **Outputs CSS files** to `.test-output/` for inspection (gitignored)

### What the Test Validates

- ✅ All Genesis ontological mixins are available from the theme
- ✅ No missing variables or imports
- ✅ SCSS syntax is valid
- ✅ Proper import paths for ontology system
- ✅ All partials can compile when wrapped with ontology imports

### Theme Cache

The test script maintains a local cache of the theme repository in `.theme-cache/` (gitignored). This:
- **Speeds up repeat test runs** - only clones once, then pulls updates
- **Ensures consistency** - tests against the same ontology version
- **Works offline** - after initial clone, tests run without network access

### CI Integration

Add this to your CI workflow to validate SCSS compilation:

```yaml
- name: Install dependencies
  run: npm install

- name: Test SCSS compilation
  run: npm run test:scss
```

### Troubleshooting

**Error: Undefined mixin**
- The Genesis Ontology mixin is missing from the theme or misspelled
- Check `.github/instructions/scss.instructions.md` for correct mixin names
- Verify theme cache is up to date: `rm -rf .theme-cache && npm run test:scss`

**Error: Can't find stylesheet to import**
- Import path is incorrect
- Verify `@import "ontology/index";` is present in `_main.scss`
- Check that partial file names start with underscore (e.g., `_about.scss`)

**Error: Invalid CSS**
- Raw CSS properties detected in subdomain SCSS (violates zero raw CSS rule)
- Refactor to use Genesis ontological mixins instead

## Documentation & Resources
- **Theme Ontology README:** `https://github.com/ASISaga/theme.asisaga.com/blob/main/_sass/ontology/Readme.md`
- **Complete API Reference:** `https://github.com/ASISaga/theme.asisaga.com/blob/main/_sass/ontology/INTEGRATION-GUIDE.md`
- **Theme SCSS Instructions:** `https://github.com/ASISaga/theme.asisaga.com/blob/main/.github/instructions/scss.instructions.md`
- **Visual Demo:** `https://github.com/ASISaga/theme.asisaga.com/blob/main/docs/ontology-demo.html`
