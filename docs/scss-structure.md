# SCSS Structure and Component System

This document explains the SCSS structure and organization for the ASI Saga website, with particular focus on the reusable component system.

## Overview

The SCSS for the site is organized into several key areas:
1. **Base SCSS** - Foundation styles, variables, and utilities
2. **Component Mixins** - Reusable component patterns implemented as mixins
3. **Component-specific SCSS files** - One file per component for targeted styling
4. **Page-specific SCSS files** - Page-specific styles that use the component system

## Key Concepts

### Component Mixin System

The core of the styling architecture is the component mixin system. These are reusable SCSS patterns implemented as mixins that can be included in page-specific SCSS files.

### Bootstrap-First Approach

Components extend Bootstrap's utilities rather than writing custom CSS, following a "Bootstrap-first" philosophy to leverage the framework's capabilities.

## Component Structure

Each component has its own SCSS file in `assets/css/_components/`:

### 1. `_product-layout.scss`
Base styles for the overall product page layout, used by the `product.html` layout:
- `.product-container` - Main container for all product pages
- Product-specific containers (e.g., `.github-agent-container`) defined in page-specific SCSS files

### 2. `_product-section-container.scss`
Styles for section containers:
- `.product-section` - Base section styles (padding, margins)
- Variations: `.product-section-light`, `.product-section-primary`, `.product-section-accent`
- `.product-section-content` - Inner content container with proper spacing

### 3. `_product-feature-grid.scss`
Styles for feature grid component:
- `.product-feature-grid` - Grid layout for feature cards
- `.product-card` - Base card styling
- Variations: `.product-card-primary`, `.product-card-accent`
- Card elements: `.product-card-icon`, `.product-card-title`, `.product-card-description`
- `.product-card-list` and `.product-card-list-item` for feature lists

### 4. `_product-code-example.scss`
Styles for code example sections:
- `.product-code-example-section` - Section container for code examples
- `.product-code-container` - Code block container
- `.product-code-example` - Styling for the code block background
- `.product-code-block` - Styling for the actual code

### 5. `_product-applications.scss`
Styles for applications/use cases sections:
- `.product-applications-section` - Section container for application cards
- Uses the same card structure as feature grid but with simplified cards

### 6. `_product-benefits-list.scss`
Styles for benefits list sections:
- `.product-benefits-section` - Section container for benefits list
- `.product-list-container` - Container for the benefits list
- `.product-list` and `.product-list-item` - Styling for list items
- `.product-list-highlight` - Highlighting for key terms in benefits

### 7. `_product-visual.scss`
Styles for visual sections with images/diagrams:
- `.product-visual-section` - Section container for visual content
- `.product-visual-container` - Container for the image and additional content
- `.product-image` - Styling for the image
- `.additional-content-container` - Styling for content below the image

## Reusable Component Mixins

In addition to product components, the site now uses a system of reusable component mixins for building pages:

### 1. Card Components
**File:** `_components/_card-component.scss`
- `card-component($prefix: 'card')`: Basic card layout
- `accent-card-component($prefix: 'card', $border-width, $border-color)`: Card with accent border
- `featured-card-component($prefix: 'card', $bg-color)`: Card with highlighted styling

### 2. Image Card Components
**File:** `_components/_image-card-component.scss`
- `image-card-component($prefix: 'card', $img-height)`: Card with image
- `featured-image-card-component($prefix: 'card', $img-height, $border-color)`: Featured card with image and border

### 3. Section Components
**File:** `_components/_section-component.scss`
- `section-component($prefix: 'section')`: Content section layout
- `alt-section-component($prefix: 'section', $bg-color)`: Alternate section with background
- `header-section-component($prefix: 'section')`: Section with header and divider

### 4. Form Components
**File:** `_components/_form-component.scss`
- `form-component($prefix: 'form')`: Basic form layout and styling
- `contact-form-component($prefix: 'contact-form')`: Contact form variation

### 5. Hero Components
**File:** `_components/_hero-component.scss`
- `hero-component($prefix: 'hero')`: Basic hero/banner section
- `gradient-hero-component($prefix: 'hero', $start-color, $end-color)`: Hero with gradient background

### 6. CTA Components
**File:** `_components/_cta-component.scss`
- `cta-component($prefix: 'cta')`: Basic call-to-action section
- `light-cta-component($prefix: 'cta')`: CTA with light gradient background
- `dark-cta-component($prefix: 'cta')`: CTA with dark background and inverted colors

### How to Use Component Mixins

To use a component mixin in a page-specific SCSS file:

```scss
// Include with default prefix
@include card-component();

// Include with custom prefix
@include card-component('custom-prefix');

// Include with custom parameters
@include gradient-hero-component('hero', $light-blue, $white);
```

This will generate all the necessary classes with the specified prefix.

## Page-Specific SCSS

Each page has its own SCSS file in `assets/css/pages/`:
- Product pages: `_github-agent.scss`, `_purpose-driven-agent.scss`, etc.
- Regular pages: `_about.scss`, `_contact-page.scss`, `_thoughtlab-page.scss`, etc.

These files should:
1. Include the needed component mixins at the top of the file
2. Add minimal custom styling only when absolutely necessary
3. Follow the same structure as the HTML to maintain readability

Example:
```scss
// Styles for example page

// Using component mixins
@include section-component('example');
@include card-component('example-card');

// Additional page-specific styles
.example {
  &-container {
    @extend .w-100;
  }
    &-custom-element {
    // Custom styling if needed
  }
}
```

## Bootstrap Integration

The component system is built on top of Bootstrap 5:
- Components use `@extend` for Bootstrap classes rather than duplicating styles
- Use Bootstrap's utility classes whenever possible
- Customize via SCSS variables rather than overriding styles directly

## Best Practices

1. **Component-First Approach**: Use component mixins before writing custom CSS
2. **Bootstrap Utilities**: Leverage Bootstrap's utility classes through `@extend`
3. **One Class Per Element**: Follow the "one class per HTML tag" rule
4. **Consistent Prefixing**: Use semantic prefixes that match the page/component name
5. **Nesting Hierarchy**: Maintain SCSS nesting that matches HTML structure
6. **Minimal Custom CSS**: Only write custom CSS properties when absolutely necessary
7. **Documentation**: Document parameters and usage for all component mixins
8. **Reusability**: Keep component styles truly reusable across pages
9. **Responsive Design**: Use Bootstrap's responsive grid and utility classes
10. **Accessibility**: Follow accessibility guidelines for colors, contrast, etc.

For complete documentation on the component system, see `assets/css/README.md`.

## Best Practices

1. **Follow the DRY principle** - Don't repeat styles that are already in component files
2. **Use component classes** - Use the component classes rather than creating new ones
3. **Extend when needed** - Use `@extend` to incorporate Bootstrap utilities
4. **Limit nesting depth** - Keep SCSS nesting to 3-4 levels max
5. **Follow BEM naming** - Use Block-Element-Modifier approach for new classes
6. **Document exceptions** - Comment any product-specific overrides
