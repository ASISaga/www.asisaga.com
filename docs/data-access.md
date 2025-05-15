# Data Access in Templates

This document explains how data is accessed directly from templates after removing the middle-tier data services layer.

## Architecture

The ASI Saga website now follows a simplified 2-tier architecture:

1. **Data Layer**: YAML files in `_data` directory
2. **Presentation Layer**: Liquid templates (pages and component includes)

This approach simplifies the code structure while maintaining a clear separation between data and presentation.

## Accessing Data in Templates

### Product Data

Product data is accessed directly from the `site.data` object using the product identifier.

**Example**:
```liquid
{% assign product = site.data.github_agent %}
{% assign product_id = "github_agent" %}

{{ product.title }}
{{ product.description }}
```

**Product Properties**:
- `title`: The product title
- `description`: The product description
- `features`: The product features
- `benefits`: The product benefits
- `concepts`: The product concepts section
- `implementation`: The product implementation section

### Team Data

Team member data is accessed directly from the `site.data.team.members` array.

**Example**:
```liquid
{% assign team_members = site.data.team.members %}

{% for member in team_members %}
  {{ member.name }}
  {{ member.role }}
  
  {% if member.image %}
    <img src="/assets/images/team/{{ member.image }}" alt="{{ member.name }}">
  {% endif %}
  
  {% if member.linkedin %}
    <a href="https://www.linkedin.com/in/{{ member.linkedin }}">Connect on LinkedIn</a>
  {% endif %}
{% endfor %}
```

**Member Properties**:
- `name`: The team member's name
- `role`: The team member's role
- `bio`: The team member's biography
- `image`: The team member's profile image filename
- `linkedin`: The team member's LinkedIn username

### Conditional Logic

Use standard Liquid syntax for conditional logic and checking if properties exist:

```liquid
{% if product.features.items.size > 0 %}
  <!-- Display features section -->
{% endif %}

{% if member.linkedin %}
  <!-- Display LinkedIn link -->
{% endif %}
```

## Benefits of Direct Data Access

1. **Simplified Development**: Fewer files to manage and understand
2. **Improved Performance**: Eliminates an extra processing layer
3. **Better Clarity**: More direct relationship between data and templates
4. **Enhanced Maintainability**: Easier to understand where data comes from
