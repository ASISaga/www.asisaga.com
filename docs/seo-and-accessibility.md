# SEO and Accessibility Guidelines

This document outlines best practices for search engine optimization (SEO) and web accessibility in the ASI Saga website, including specific implementation techniques and recommendations.

## Table of Contents

1. [Search Engine Optimization (SEO)](#search-engine-optimization-seo)
   - [Meta Tags Implementation](#meta-tags-implementation)
   - [Semantic HTML Structure](#semantic-html-structure)
   - [URL Structure](#url-structure)
   - [Sitemap and Robots.txt](#sitemap-and-robotstxt)
   - [Structured Data](#structured-data)
   - [Performance Optimization](#performance-optimization)

2. [Web Accessibility Guidelines](#web-accessibility-guidelines)
   - [Keyboard Navigation](#keyboard-navigation)
   - [Screen Reader Compatibility](#screen-reader-compatibility)
   - [ARIA Attributes](#aria-attributes)
   - [Color and Contrast](#color-and-contrast)
   - [Focus Management](#focus-management)
   - [Reduced Motion](#reduced-motion)
   - [Skip Links](#skip-links)

## Search Engine Optimization (SEO)

### Meta Tags Implementation

Ensure each page includes proper meta tags:

1. Add to `head.html` or individual page front matter:

```html
<meta name="description" content="Page description">
<meta name="keywords" content="keyword1, keyword2, keyword3">
<meta name="author" content="ASI Saga">

<!-- Open Graph Protocol for social sharing -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="URL to image">
<meta property="og:url" content="Page URL">
<meta property="og:type" content="website">

<!-- Twitter Card data -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description">
<meta name="twitter:image" content="URL to image">
```

2. Use Jekyll front matter to define page-specific meta tags:

```yaml
---
layout: default
title: Page Title
description: Detailed page description here
keywords: keyword1, keyword2, keyword3
og_image: /assets/images/og-image.jpg
twitter_image: /assets/images/twitter-image.jpg
---
```

### Semantic HTML Structure

Implement proper HTML5 semantic elements:

- `<header>`: Page header content
- `<nav>`: Navigation links
- `<main>`: Main content area
- `<article>`: Self-contained content
- `<section>`: Grouped content
- `<aside>`: Related but separate content
- `<footer>`: Page footer content
- `<figure>` and `<figcaption>`: Images with captions

### URL Structure

1. Use descriptive, keyword-rich URLs:
   - Good: `/artificial-intelligence/future-possibilities/`
   - Avoid: `/pages/p123/`

2. Keep URLs consistent:
   - Use hyphens to separate words
   - Use all lowercase letters
   - Keep URLs relatively short

### Sitemap and Robots.txt

1. **Sitemap.xml**:
   - Location: `/sitemap.xml` (root of the website)
   - Update whenever new pages are added
   - Include `<lastmod>`, `<changefreq>`, and `<priority>` tags
   - Submit to search engines through their webmaster tools

2. **Robots.txt**:
   - Location: `/robots.txt` (root of the website)
   - Define which pages should not be indexed
   - Include sitemap location

```
User-agent: *
Allow: /

# Disallow admin or private pages if necessary
# Disallow: /private/

Sitemap: https://asisaga.github.io/sitemap.xml
```

### Structured Data

Implement JSON-LD structured data for rich search results:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ASI Saga",
  "url": "https://asisaga.github.io",
  "logo": "https://asisaga.github.io/assets/images/logo.png",
  "description": "A digital chronicle dedicated to the genesis of Artificial Super Intelligence",
  "sameAs": [
    "https://twitter.com/ASISaga",
    "https://linkedin.com/company/asi-saga",
    "https://github.com/asisaga"
  ]
}
</script>
```

### Performance Optimization

1. Optimize images:
   - Use appropriate formats (WebP, JPEG, PNG)
   - Compress images without quality loss
   - Specify width and height attributes

2. Page speed improvements:
   - Minimize HTTP requests
   - Use browser caching
   - Optimize CSS delivery

## Web Accessibility Guidelines

### Keyboard Navigation

1. Ensure all interactive elements are keyboard accessible:
   - Links, buttons, form controls must be focusable
   - Custom components need proper tabindex and keyboard event handlers
   - Maintain logical tab order

2. Provide visual focus indicators:
   - Ensure focus states are clearly visible
   - Don't rely solely on color to indicate focus

```scss
// Example focus style
:focus {
  outline: 2px solid $primary;
  outline-offset: 2px;
}
```

### Screen Reader Compatibility

1. Use proper semantic HTML:
   - Headings in logical order (H1, H2, H3)
   - Lists for related items
   - Tables for tabular data with headers

2. Provide text alternatives:
   - Alt text for images: `<img src="image.jpg" alt="Description of image">`
   - Labels for form fields: `<label for="name">Name:</label><input id="name">`
   - Captions for videos

3. Hide decorative elements from screen readers:
   - `<img src="decorative.jpg" alt="" aria-hidden="true">`

### ARIA Attributes

1. Use appropriate ARIA landmarks:
   - `role="navigation"` for navigation
   - `role="main"` for main content
   - `role="complementary"` for sidebars

2. Implement ARIA for dynamic content:
   - `aria-expanded`: For expandable sections
   - `aria-controls`: For elements controlling other elements
   - `aria-live`: For content that updates dynamically

3. Use `aria-label` for elements without visible text:
   - `<button aria-label="Close menu"><i class="icon-close"></i></button>`

### Color and Contrast

1. Ensure sufficient contrast:
   - Text/background ratio of at least 4.5:1 for normal text
   - Text/background ratio of at least 3:1 for large text

2. Don't rely on color alone:
   - Add icons or text cues alongside color
   - Ensure patterns or textures differentiate elements

### Focus Management

1. Trap focus in modals:
   - When a modal opens, focus should move to the modal
   - Focus should be trapped within the modal
   - Return focus to the trigger element when modal closes

```javascript
function trapFocusInModal(modalElement) {
  const focusableElements = modalElement.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  // Set focus to first element
  firstElement.focus();
  
  // Trap focus in a loop
  modalElement.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

### Reduced Motion

1. Respect user motion preferences:
   - Check `prefers-reduced-motion` media query
   - Provide alternatives to animations

```scss
// In your CSS
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

```javascript
// In your JavaScript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable animations or provide alternatives
}
```

### Skip Links

1. Implement skip links for keyboard users:
   - Add a skip link to bypass navigation and jump to main content
   - Make it visible on focus

```html
<!-- In your page template -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Later in the page -->
<main id="main-content" tabindex="-1">
  <!-- Main content here -->
</main>
```

```scss
// In your CSS
.skip-link {
  position: absolute;
  top: -50px; // Hidden by default
  left: 10px;
  padding: 8px 15px;
  background-color: #ffffff;
  z-index: 9999;
  
  &:focus {
    top: 10px; // Visible when focused
  }
}
```

## Testing and Validation

1. Use automated testing tools:
   - WAVE Web Accessibility Evaluation Tool
   - axe DevTools
   - Lighthouse Accessibility Audit

2. Perform manual testing:
   - Test with keyboard navigation only
   - Test with screen readers (NVDA, VoiceOver)
   - Test with browser extensions that simulate different disabilities
