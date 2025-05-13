# Product Page Components Documentation

This document describes the structure and usage of the reusable components for product pages on the ASI Saga website.

## Product Page Layout

The `product.html` layout provides a standardized structure for all product pages with the following features:

- Automatically includes the hero section based on page front matter variables
- Sets up the product container with appropriate class names
- Passes product-specific styles to the hero component

### Usage Example

```yaml
---
layout: product
title: Product Name
description: site.data.product_name.description
product_class: product-name-container
button_text: "Optional Button Text"
button_url: "Optional Button URL"
hero_style: "Optional Hero Style (default or alt)"
---

<!-- Page content here -->
```

## Available Components

### 1. Product Feature Grid (`product-feature-grid.html`)

Displays a grid of feature cards with consistent styling.

```liquid
{% include product-feature-grid.html 
  items=site.data.product_name.features.items
  card_style="primary" <!-- options: default, primary, accent -->
%}
```

### 2. Product Code Example (`product-code-example.html`) 

Displays code examples with syntax highlighting.

```liquid
{% include product-code-example.html 
  section_title="Implementation Example"
  section_description="Optional description"
  title="Optional title for the code block"
  code_example=site.data.product_name.implementation.code_example
%}
```

### 3. Product Applications (`product-applications.html`)

Displays application or use case cards.

```liquid
{% include product-applications.html 
  section_title="Applications"
  items=site.data.product_name.applications.items
  card_style="default" <!-- options: default, primary, accent -->
%}
```

### 4. Product Benefits List (`product-benefits-list.html`) 

Displays a list of product benefits with highlighted titles.

```liquid
{% include product-benefits-list.html 
  section_title="Key Benefits"
  items=site.data.product_name.benefits.items
%}
```

### 5. Product Visual (`product-visual.html`)

Displays product diagrams or images with optional additional content.

```liquid
{% capture additional_content %}
  <!-- Any HTML content to display below the image -->
  <h3>Additional Title</h3>
  <p>Additional description.</p>
{% endcapture %}

{% include product-visual.html 
  image_url=site.data.product_name.section.diagram_image
  image_alt="Image description"
  section_title="Section Title"
  section_description="Section description."
  additional_content=additional_content
%}
```

### 6. Product Section Container (`product-section-container.html`)

Provides consistent section formatting with optional styling.

```liquid
{% capture section_content %}
  <!-- Section content here -->
{% endcapture %}

{% include product-section-container.html
  title="Section Title"
  description="Optional section description"
  section_style="light" <!-- options: default, light -->
  content=section_content
%}
```

## Data Structure Standards

For optimal use with these components, YAML data files should follow these conventions:

1. Top-level properties:
   - `title`: Product title
   - `description`: Product description
   - `page_title`: Optional separate title for the page

2. Section structure:
   - `section_title`: Title for the section
   - `section_description`: Optional description for the section
   - `items`: Array of items in the section

3. Feature items structure:
   - `title`: Feature title
   - `description`: Feature description
   - `icon`: Optional icon class name
   - One of: `list_items`, `features`, or `benefits`: Array of bullet points
   
4. Code example structure:
   - `language`: Programming language for syntax highlighting
   - `code`: The code sample as a multi-line string
   - `title`: Optional title for the code example

5. Applications/Use cases structure:
   - `title`: Application/Use case title
   - `description`: Application/Use case description
   
6. Benefits structure:
   - `highlight`: Bold highlighted text portion
   - `description`: Benefit description
