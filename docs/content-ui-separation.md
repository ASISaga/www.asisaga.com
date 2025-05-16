# Data Organization: Content vs. UI Approach

This document explains the data organization philosophy used in the ASI Saga website.

## Core Principles

1. **Separation of Content from UI**: Store only core content in data files, keep UI elements in templates
2. **Single Source of Truth**: Content is defined once in YAML and used across templates
3. **Clean Template Logic**: Templates focus on presentation while accessing clean content

## Data Organization

### Content-Only YAML Files

YAML files in the `_data` directory should contain only core content:

```yaml
# Good Example (content-only)
mission_content: "Our mission statement goes here..."
vision_content: "Our vision statement goes here..."
contact_description: "Contact description goes here..."
```

Avoid including UI elements in data files:

```yaml
# Avoid (mixing content with UI)
mission:
  title: "Our Mission"  # UI element
  content: "Mission statement..."
  button_text: "Learn More"  # UI element
```

### Template-Defined UI Elements

UI elements like titles, button text, and styling should be defined in templates:

```liquid
{% include section-header.html 
  title="Our Mission"  <!-- UI element in template -->
%}
<p>{{ about.mission_content }}</p>  <!-- Content from data file -->

<button class="btn btn-primary">Learn More</button>  <!-- UI element in template -->
```

## Benefits of This Approach

1. **Content Maintainability**: Content writers can focus on core content without worrying about UI
2. **Design Flexibility**: Designers can update UI elements without touching content
3. **Consistency**: UI elements follow a consistent pattern defined in templates
4. **Simplified Data**: Data files are cleaner and more focused on content

## Examples

### About Page

**Data File** (`_data/about.yml`):
```yaml
mission_content: "Our mission statement..."
vision_content: "Our vision statement..."
contact_description: "Contact description..." 
```

**Template** (`about/index.html`):
```liquid
{% include section-header.html title="Our Mission" %}
<p>{{ about.mission_content }}</p>

{% include cta.html 
  title="Get in Touch"
  description="{{ about.contact_description }}"
  button_text="Contact Us"
%}
```

### Product Page

**Data File** (`_data/github_agent.yml`):
```yaml
description: "Product description goes here..."
features:
  - name: "Feature One"
    description: "Feature description..."
  - name: "Feature Two" 
    description: "Feature description..."
```

**Template** (`realm-of-agents/github-agent/index.html`):
```liquid
<section>
  <h2>Key Features</h2>
  {% for feature in product.features %}
    <h3>{{ feature.name }}</h3>
    <p>{{ feature.description }}</p>
  {% endfor %}
</section>
```

## Implementation Guidelines

1. **Audit Data Files**: Review YAML files to ensure they contain only core content
2. **Migrate UI Elements**: Move UI elements from data files to templates
3. **Standardize Naming**: Use clear naming that distinguishes content fields
4. **Document Patterns**: Document the content structure for consistent implementation
