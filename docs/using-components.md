# Using Product Components with Jekyll

Jekyll is a static site generator that makes it easy to build websites with reusable components. This guide explains how to use the product components in your Jekyll site.

## Component Overview

The product components are designed to be reusable across different product pages. Each component is implemented as a Jekyll include file with parameters.

### Components Available

1. **Product Feature Grid (`product-feature-grid.html`)**: Displays a grid of feature cards
2. **Product Code Example (`product-code-example.html`)**: Shows code examples with syntax highlighting
3. **Product Applications (`product-applications.html`)**: Displays application/use case cards
4. **Product Benefits List (`product-benefits-list.html`)**: Shows a list of product benefits
5. **Product Visual (`product-visual.html`)**: Displays product diagrams or images
6. **Product Section Container (`product-section-container.html`)**: Provides consistent section formatting

## Using Components with Data Files

Our components are designed to work with YAML data files stored in the `_data` folder:

```
_data/
  github_agent.yml
  purpose_driven_agent.yml
  agent_operating_system.yml
  business_infinity.yml
```

### Example: Using the Product Feature Grid

```liquid
{% include product-feature-grid.html 
  items=site.data.github_agent.features.items
  card_style="primary"
%}
```

### Example: Using the Product Visual Component

```liquid
{% capture additional_content %}
  <h3>Architecture Diagram</h3>
  <p>This diagram shows the key components and their interactions.</p>
{% endcapture %}

{% include product-visual.html 
  image_url="/assets/images/diagrams/architecture.png"
  image_alt="Architecture Diagram"
  section_title="System Architecture"
  section_description="How the components work together"
  additional_content=additional_content
%}
```

## Creating Flexible Layouts

The product section container can be used to wrap custom content:

```liquid
{% capture custom_section %}
  <!-- Your custom HTML here -->
  <div class="custom-component">
    <h3>Custom Component</h3>
    <p>Custom content goes here.</p>
  </div>
{% endcapture %}

{% include product-section-container.html
  title="Custom Section"
  description="A section with custom content"
  section_style="light"
  content=custom_section
%}
```

## Best Practices

1. **Keep data in YAML files**: Maintain content in data files to separate content from presentation
2. **Use consistent parameters**: Follow the parameter conventions for each component
3. **Extend with capture blocks**: Use capture blocks for complex content or HTML that needs to be passed to components
4. **Use appropriate styling**: Each component has style variations (primary, accent, etc.)
5. **Consistent section structure**: Use the section container for consistent spacing and styling
