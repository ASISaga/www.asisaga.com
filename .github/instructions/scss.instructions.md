---
applyTo: "**/_sass/**,**/*.scss,**/_sass/**/_*.scss"
description: "SCSS guidance for subdomain: Genesis ontological design system, three-tier architecture, semantic mixins, and zero raw CSS property rule."
---

# Genesis Ontological Design System - SCSS Instructions

This subdomain uses the **Genesis Semantic SCSS Engine** from the theme repository. All styling follows the three-tier architecture that separates content semantics from visual presentation.

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
- `'distributed'` - Autonomous Bento grid (auto-fit, responsive cards)
- `'focused'` - Single column reading layout (max 70ch, centered)
- `'associative'` - Network/connection layout (flexbox wrap)
- `'chronological'` - Time-linear vertical stream (timeline, feed)
- `'manifest'` - High-density dashboard (12-column grid)

### 2. `genesis-entity($nature)` - Visual Presence & Glassmorphism
- `'primary'` - Main content object (active glassmorphism, elevated)
- `'secondary'` - Supporting context (lighter glass, less prominent)
- `'imperative'` - Urgent system alert (pulsing neon border)
- `'latent'` - Dormant/inactive content (dimmed, grayscale)
- `'aggregate'` - Container for multiple items (wrapper styling)
- `'ancestral'` - Archived/historical data (muted, legacy)

### 3. `genesis-cognition($intent)` - Typography & Information Type
- `'axiom'` - Headlines (2-3.5rem, bold, high-resonance)
- `'discourse'` - Body prose (1-1.125rem, readable, serif)
- `'protocol'` - Technical/code content (monospace)
- `'gloss'` - Small annotations (0.8rem, muted)
- `'motive'` - Persuasive/instructional text (semibold, accent)
- `'quantum'` - Tags/chips/micro-content (tiny, uppercase)

### 4. `genesis-synapse($vector)` - Interaction & Navigation
- `'navigate'` - Link to different page (underline on hover)
- `'execute'` - Local action/command (primary action button)
- `'inquiry'` - Request for data (search, expand, secondary action)
- `'destructive'` - Delete/reset action (danger button, red)
- `'social'` - Social sharing (rounded, social colors)

### 5. `genesis-state($condition)` - Temporal State
- `'stable'` - Content in equilibrium (normal, verified)
- `'evolving'` - Currently updating (animated progress)
- `'deprecated'` - No longer verified (strikethrough, warning)
- `'locked'` - Requires clearance (blur effect, lock icon)
- `'simulated'` - Projected data (dashed border, stripes)

### 6. `genesis-atmosphere($vibe)` - Sensory Texture
- `'neutral'` - Standard transparency (default, balanced)
- `'ethereal'` - High-transparency, light (bright, minimal)
- `'void'` - Deep-space, high-contrast (dark, immersive)
- `'vibrant'` - High-energy, colorful (energetic, neon)

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
---
---
@import "ontology/index";

.blog-post {
  @include genesis-environment('focused');     // Reading layout
  @include genesis-atmosphere('ethereal');     // Light, peaceful
  
  .post-header {
    @include genesis-entity('primary');        // Elevated card
    
    .post-title { 
      @include genesis-cognition('axiom');     // Large headline
    }
    
    .post-date { 
      @include genesis-cognition('gloss');     // Small metadata
    }
  }
  
  .post-content {
    @include genesis-cognition('discourse');   // Body text
  }
  
  .read-more {
    @include genesis-synapse('navigate');      // Link to next page
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

## Documentation & Resources
- **Theme Ontology README:** `https://github.com/ASISaga/theme.asisaga.com/blob/main/_sass/ontology/Readme.md`
- **Complete API Reference:** `https://github.com/ASISaga/theme.asisaga.com/blob/main/_sass/ontology/INTEGRATION-GUIDE.md`
- **Theme SCSS Instructions:** `https://github.com/ASISaga/theme.asisaga.com/blob/main/.github/instructions/scss.instructions.md`
- **Visual Demo:** `https://github.com/ASISaga/theme.asisaga.com/blob/main/docs/ontology-demo.html`
