# Dimension Management in the ASI Saga Website

This document outlines the system for managing dimensions (spacing, sizes, borders, etc.) in the ASI Saga website to ensure consistency and maintainability.

## Dimension Variable Structure

All dimension definitions are centralized in the `assets/css/_base/_dimensions.scss` file. This file contains:

1. **Spacing Units**: Base unit and derived values for consistent spacing
2. **Border Values**: Standard border widths for different contexts
3. **Font Sizes**: Typography scale from extra small to 4XL
4. **Icon Dimensions**: Standard icon sizes for different contexts
5. **Component-specific Dimensions**: Sizes specific to UI components
6. **Content Widths**: Standard container and content widths
7. **Responsive Breakpoints**: Screen size breakpoints and max-width values for media queries

## Using Dimensions in Components

When creating or updating components, follow these guidelines:

1. **Never use hard-coded dimension values** in component or page SCSS files
2. **Always use variables from `_dimensions.scss`** for any dimension-related styling
3. **Define component-specific dimension variables** in `_dimensions.scss` when needed
4. **Use semantic names** that describe the purpose of the dimension
5. **Use the spacing scale** for consistent margins and padding

## Spacing System

The spacing system is built on a 0.25rem (4px) base unit and follows a geometric scale:

```scss
$spacing-xs: $spacing-base;        // 0.25rem / 4px
$spacing-sm: $spacing-base * 2;    // 0.5rem / 8px
$spacing-md: $spacing-base * 4;    // 1rem / 16px
$spacing-lg: $spacing-base * 6;    // 1.5rem / 24px
$spacing-xl: $spacing-base * 8;    // 2rem / 32px
$spacing-2xl: $spacing-base * 12;  // 3rem / 48px
$spacing-3xl: $spacing-base * 16;  // 4rem / 64px
```

Use these spacing variables for padding, margins, and any other space-related styling.

## Font Size System

Font sizes are defined using a scale from extra small to 4XL:

```scss
$font-size-xs: 0.75rem;   // 12px
$font-size-sm: 0.875rem;  // 14px
$font-size-base: 1rem;    // 16px
$font-size-md: 1.125rem;  // 18px
$font-size-lg: 1.25rem;   // 20px
$font-size-xl: 1.5rem;    // 24px
$font-size-2xl: 2rem;     // 32px
$font-size-3xl: 2.5rem;   // 40px
$font-size-4xl: 3rem;     // 48px
```

Use these variables instead of hard-coded font sizes to maintain a consistent typographic scale.

## Responsive Breakpoints

Standard breakpoints are defined to match Bootstrap's breakpoint system:

```scss
$breakpoint-xs: 0;
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
$breakpoint-xxl: 1400px;
```

For media queries using max-width, use the pre-calculated max values:

```scss
$breakpoint-sm-max: 575.98px;  // For @media (max-width: $breakpoint-sm-max)
$breakpoint-md-max: 767.98px;  // For @media (max-width: $breakpoint-md-max)
// etc.
```

## Component-specific Dimensions

Component-specific dimensions should be defined in the dimensions file and follow this naming convention:

```scss
$component-element-dimension: value;
```

For example:
```scss
$header-logo-height: 2.5rem;
$product-code-max-height: 31.25rem;
$linkedin-avatar-size: 3.75rem;
```

## Adding New Dimensions

When adding new dimensions:

1. First, check if there's already a suitable variable
2. If not, add the new dimension variable to `_dimensions.scss` in the appropriate section
3. Use a clear, descriptive name that indicates its purpose
4. Document the dimension with a comment if its purpose isn't obvious
5. Consider its relation to other dimensions (e.g., maintain the spacing scale)

## Dimension Management Workflow

When working with dimensions in the website:

1. Check existing dimension variables in `_dimensions.scss`
2. If no suitable variable exists, add a new one
3. Use the variable in your component or page SCSS
4. Update this documentation if needed
