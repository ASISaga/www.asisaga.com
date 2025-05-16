# Assimilating New Pages with Content-UI Separation

This document outlines how we've assimilated new pages into the ASI Saga website using content-UI separation principles.

## Overview

We've added six new pages to the site:
- Saga
- Possibilities
- Legacy
- Thought Lab
- Resources
- Contact

Each page follows our content-UI separation pattern, where:
- Core content is stored in YAML data files
- UI elements remain in the HTML templates
- Each page has a corresponding SCSS file with proper class structure

## Content-UI Separation Implementation

### 1. Content Storage in YAML

All content is extracted to specific YAML files in the `_data` folder:
- `saga.yml`
- `possibilities.yml`
- `legacy.yml`
- `thoughtlab.yml`
- `resources.yml`
- `contact.yml`

These files contain no UI elements, only content like:
- Headings and titles
- Paragraph text
- Image descriptions and links
- Form field content

### 2. UI Elements in Templates

The HTML templates (`index.html` files in each directory) contain:
- Page structure
- UI components
- Styling classes
- References to content using Jekyll/Liquid syntax

For example:
```html
<h3 class="saga-page__chapter-title">{{ site.data.saga.chapter_1_title }}</h3>
<p class="saga-page__chapter-content">
  {{ site.data.saga.chapter_1_content }}
</p>
```

### 3. CSS Implementation

Each page has:
- A dedicated SCSS file in `assets/css/pages/` (e.g., `_saga-page.scss`)
- Classes that follow BEM-like naming conventions
- Bootstrap utilities and components extended through SCSS
- Page-specific styles following the same pattern as existing pages

## Navigation

The navigation structure in `_data/nav.yml` has been updated to include:
- A new "ASI Saga" dropdown with Saga, Possibilities, and Legacy
- A Resources dropdown with the Thought Lab and Resources pages
- Direct links to About and Contact pages

## File Structure Updates

All new pages and components are now documented in `website_structure.json`.

## Best Practices Applied

1. One SCSS class per HTML element
2. Proper Bootstrap 5 integration
3. Mobile-first responsive design
4. Component-based architecture
5. Clean separation of content and presentation
6. Consistent naming conventions across all files
