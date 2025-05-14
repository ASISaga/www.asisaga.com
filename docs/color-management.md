# Color Management in the ASI Saga Website

This document outlines the best practices for color management in the ASI Saga website to ensure consistency, maintainability, and accessibility.

## Color Variable Structure

All color definitions are centralized in the `assets/css/_base/_colors.scss` file. This file contains:

1. **Core Colors**: Primary color palette with light and dark variations
2. **Secondary and Accent Colors**: Secondary colors and accent color
3. **Neutral Colors**: White, light, dark, and gray colors for text and backgrounds
4. **Semantic Colors**: Colors used for specific functional purposes
5. **Component-specific Colors**: Colors used by specific components like header, footer, and navbar
6. **Bootstrap Integration**: Theme colors map for Bootstrap integration

## Using Colors in Components

When creating or updating components, follow these guidelines:

1. **Never use hard-coded color values** in component or page SCSS files
2. **Always use variables from `_colors.scss`** for any color-related styling
3. **Define component-specific color variables** in `_colors.scss` when needed
4. **Use Bootstrap's color utilities** when possible (e.g., `.text-primary`, `.bg-dark`)
5. **Extend Bootstrap classes** rather than defining custom color properties
6. **For CSS variable usage**, use variables defined in `_base/_theme.scss`
7. **When using rgba with CSS variables**, use the RGB format variables (e.g., `--color-light-rgb`)

## Adding New Colors

When adding new colors to the website:

1. **Add the color variable** to `_colors.scss` in the appropriate section
2. **Use descriptive names** that reflect the purpose of the color
3. **Update the `$theme-colors` map** if the color should be available as a Bootstrap utility
4. **Document the color** in this file with its purpose and usage

## Component-Specific Colors

Component-specific colors follow this naming convention:

```scss
$component-element-color: $value;
```

For example:
```scss
$header-text-color: $white;
$header-link-hover-bg: rgba(255, 255, 255, 0.1);
$footer-text-muted: rgba(255, 255, 255, 0.75);
```

## Color Accessibility

All colors used in the website should meet accessibility guidelines:

1. **Maintain a minimum contrast ratio** of 4.5:1 for normal text and 3:1 for large text
2. **Test color combinations** using accessibility tools
3. **Don't rely on color alone** to convey information

## CSS Variables

The website also uses CSS variables defined in `_base/_theme.scss` for runtime color management:

1. **Basic color variables** are defined as:
   ```scss
   --color-primary: #{$primary};
   --color-secondary: #{$secondary};
   --color-light: #{$light};
   ```

2. **RGB format variables** are defined for use with rgba():
   ```scss
   --color-light-rgb: 248, 249, 250; // RGB values of $light for rgba() usage
   ```

3. **Usage in SCSS**:
   ```scss
   // Standard usage
   color: var(--color-primary);
   
   // With alpha transparency
   background-color: rgba(var(--color-light-rgb), 0.5);
   ```

## Color Management Workflow

When working with colors in the website:

1. Check if a suitable color variable already exists in `_colors.scss`
2. If not, add a new color variable to `_colors.scss`
3. Use the color variable in your component or page SCSS
4. For CSS variables, check if it exists in `_base/_theme.scss`
5. If using rgba with CSS variables, ensure an RGB format variable exists
6. Document any significant color changes in this file
