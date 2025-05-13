# SCSS Structure for Product Components

This document explains the SCSS structure and organization for the product-related components on the ASI Saga website.

## Overview

The SCSS for product pages is organized into:
1. **Component-specific SCSS files** - One file per component for targeted styling
2. **A product layout SCSS file** - For the overall product page container
3. **Legacy product-page SCSS** - For backward compatibility with older pages

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

## Page-Specific SCSS

Each product page has its own SCSS file in `assets/css/pages/`:
- `_github-agent.scss`
- `_purpose-driven-agent.scss`
- `_agent-operating-system.scss`
- `_business-infinity.scss`

These files should only contain styles that are unique to that product and don't fit in the component system.

## Best Practices

1. **Follow the DRY principle** - Don't repeat styles that are already in component files
2. **Use component classes** - Use the component classes rather than creating new ones
3. **Extend when needed** - Use `@extend` to incorporate Bootstrap utilities
4. **Limit nesting depth** - Keep SCSS nesting to 3-4 levels max
5. **Follow BEM naming** - Use Block-Element-Modifier approach for new classes
6. **Document exceptions** - Comment any product-specific overrides
