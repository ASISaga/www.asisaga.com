# Adding New Product Pages

This guide walks you through the process of adding a new product page to the ASI Saga website using the component system.

## Step 1: Create the Product Data File

Create a YAML file in `_data/` folder for your product:

```yaml
# _data/new_product.yml
title: "New Product Name"
description: "A comprehensive description of the new product."

# Hero section (automatically used by product.html layout)
hero:
  subtitle: "Optional hero subtitle"
  image: "/assets/images/products/new-product-hero.jpg"

# Features section
features:
  section_title: "Key Features"
  section_description: "Optional description of the features section"
  items:
    - title: "Feature 1"
      description: "Description of the first feature."
      list_items:
        - "Detail point 1"
        - "Detail point 2"
        - "Detail point 3"
    - title: "Feature 2"
      description: "Description of the second feature."
      list_items:
        - "Detail point 1"
        - "Detail point 2"
    # Add more features as needed

# Technical implementation
implementation:
  section_title: "Implementation"
  section_description: "How to implement the product"
  code_example:
    language: "python" # or javascript, html, etc.
    title: "Example Implementation" # optional
    code: |
      # Sample code for the new product
      class NewProduct:
          def __init__(self, name):
              self.name = name
              
          def run(self):
              print(f"Running {self.name}")
              
      # Create instance and run
      product = NewProduct("Demo")
      product.run()

# Applications/Use cases
applications:
  section_title: "Use Cases"
  items:
    - title: "Use Case 1"
      description: "Description of the first use case."
    - title: "Use Case 2"
      description: "Description of the second use case."
    - title: "Use Case 3"
      description: "Description of the third use case."

# Benefits list
benefits:
  section_title: "Key Benefits"
  items:
    - highlight: "Increased Productivity"
      description: "Boost your productivity with automated workflows."
    - highlight: "Cost Savings"
      description: "Reduce operational costs by optimizing processes."
    - highlight: "Enhanced Quality"
      description: "Improve output quality with intelligent assistance."

# Call to action
cta:
  title: "Get Started Today"
  description: "Begin using our new product and transform your workflow."
  button_text: "Learn More"
  button_url: "/contact"
  secondary_button_text: "Documentation"
  secondary_button_url: "/docs"
```

## Step 2: Create the Product Page

Create a directory for your product (if needed) and add an `index.html` file:

```html
---
layout: product
title: New Product
description: site.data.new_product.description
product_class: new-product-container
---

<!-- 
New Product page
Uses the component system for consistent styling
-->

<!-- Features section -->
{% capture features_content %}
  {% include section-header.html title=site.data.new_product.features.section_title %}
  {% include product-feature-grid.html 
    items=site.data.new_product.features.items
    card_style="primary"
  %}
{% endcapture %}

{% include product-section-container.html
  title=site.data.new_product.features.section_title
  content=features_content
%}

<!-- Implementation section -->
{% include product-code-example.html 
  section_title=site.data.new_product.implementation.section_title
  section_description=site.data.new_product.implementation.section_description
  title=site.data.new_product.implementation.code_example.title
  code_example=site.data.new_product.implementation.code_example
%}

<!-- Use cases section -->
{% include product-applications.html 
  section_title=site.data.new_product.applications.section_title
  items=site.data.new_product.applications.items
%}

<!-- Benefits section -->
{% include product-benefits-list.html 
  section_title=site.data.new_product.benefits.section_title
  items=site.data.new_product.benefits.items
%}

<!-- Call to action section -->
{% include cta.html 
  title=site.data.new_product.cta.title
  description=site.data.new_product.cta.description
  button_text=site.data.new_product.cta.button_text
  button_url=site.data.new_product.cta.button_url
  secondary_button_text=site.data.new_product.cta.secondary_button_text
  secondary_button_url=site.data.new_product.cta.secondary_button_url
%}
```

## Step 3: Add Product-Specific SCSS

Create a SCSS file in `assets/css/pages/` for product-specific styles:

```scss
// assets/css/pages/_new-product.scss
// New Product page specific styles

.new-product-container {
  // Extension of the base product container
  @extend .product-container;
  
  // Product-specific color theme
  --product-primary-color: #3F51B5; // Custom primary color
  --product-secondary-color: #7986CB; // Custom secondary color
  
  // Custom styling for this product
  .section-header {
    .section-title {
      color: var(--product-primary-color);
    }
  }
  
  // Product-specific card styling
  .product-card {
    &:hover {
      border-color: var(--product-primary-color);
    }
    
    .product-card-icon i {
      color: var(--product-primary-color);
    }
  }
}
```

## Step 4: Update the Style.scss

Add your new SCSS file to the imports in `assets/css/style.scss`:

```scss
// Pages - Page-specific layouts and styles
@import "pages/about";
@import "pages/new-product"; // Add your new file here
@import "pages/github-agent";
// other imports...
```

## Step 5: Update Navigation

Add your new product to the navigation in `_data/nav.yml`:

```yaml
- title: "Products"
  items:
    - title: "New Product"
      url: "/path/to/new-product/"
    # other products...
```

## Step 6: Update Website Structure

Add your new product to `website_structure.json`:

```json
{
  "name": "path",
  "type": "directory",
  "description": "Product directory",
  "children": [
    {
      "name": "new-product",
      "type": "directory",
      "description": "New Product pages",
      "children": [
        {
          "name": "index.html",
          "type": "file",
          "description": "New Product landing page using data from _data/new_product.yml"
        }
      ]
    }
  ]
}
```

## Step 7: Test Your New Page

1. Run the Jekyll server locally:
   ```
   bundle exec jekyll serve
   ```

2. Visit `http://localhost:4000/path/to/new-product/` to verify your page.

## Best Practices

1. **Consistency**: Follow the component patterns established in other product pages
2. **Component Reuse**: Use the existing components rather than creating custom HTML
3. **Data-Driven**: Keep content in YAML files and presentation in the HTML/components
4. **Minimal Custom CSS**: Only add product-specific styles that aren't covered by the component system
5. **Documentation**: Update documentation if you create new component variations
