# Data Services Layer

This document explains the data services middle tier that acts as an intermediary between the raw data in `_data` directory and the presentation templates.

## Architecture

The ASI Saga website follows a 3-tier architecture:

1. **Data Layer**: YAML files in `_data` directory
2. **Service Layer**: Data processors in `_includes/data-services`
3. **Presentation Layer**: Liquid templates (pages and component includes)

This separation of concerns improves maintainability, reusability, and allows for data transformation before presentation.

## Available Services

### Product Service

The Product Service processes product data and adds computed properties.

**File**: `_includes/data-services/product-service.html`

**Usage**:
```liquid
{% include data-services/product-service.html 
   product_id="github_agent" 
   assign_to="product" %}

{{ product.title }}
{{ product.computed_has_features }}
{{ product.computed_product_url }}
```

**Parameters**:
- `product_id`: The product identifier (corresponds to YAML file in `_data`)
- `assign_to`: The variable name to store the processed product

**Computed Properties**:
- `computed_has_features`: Whether the product has features
- `computed_has_benefits`: Whether the product has benefits
- `computed_has_concepts`: Whether the product has concepts
- `computed_has_implementation`: Whether the product has implementation
- `computed_has_applications`: Whether the product has applications
- `computed_product_id`: The product ID
- `computed_product_url`: The URL to the product page

### Team Service

The Team Service processes team member data and adds computed properties.

**File**: `_includes/data-services/team-service.html`

**Usage**:
```liquid
{% include data-services/team-service.html 
   filter_by_role="Research" 
   assign_to="research_team" %}

{% for member in research_team %}
  {{ member.name }}
  {{ member.computed_linkedin_url }}
{% endfor %}
```

**Parameters**:
- `filter_by_role`: Optional parameter to filter team members by role
- `assign_to`: The variable name to store the processed team

**Computed Properties**:
- `computed_has_linkedin`: Whether the member has a LinkedIn profile
- `computed_has_image`: Whether the member has a profile image
- `computed_image_path`: The full path to the member's profile image
- `computed_linkedin_url`: The full URL to the member's LinkedIn profile

### Helper Service

The Helper Service provides common utility functions for data processing.

**File**: `_includes/data-services/helper.html`

**Usage**:
```liquid
{% include data-services/helper.html 
   object=product
   property="features"
   function="check_exists"
   assign_to="has_features" %}

{% if has_features %}
  <!-- Show features -->
{% endif %}
```

**Functions**:
- `check_exists`: Checks if a property exists and has content
- `get_page_section`: Retrieves a section from a data object with fallback

## Best Practices

1. **Always use the data service layer** instead of directly accessing `site.data`
2. **Keep presentation logic out of data services**, focus on data transformations
3. **Use computed properties** for common checks and transformations
4. **Document parameters and return values** in comments
5. **Follow naming conventions** for computed properties (prefix with `computed_`)

## Future Enhancements

Potential future enhancements to the data services layer:

1. Additional services for other data types
2. More sophisticated data transformations
3. Caching for expensive operations
4. Integration with external data sources
