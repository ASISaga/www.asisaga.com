# ASI Saga Website

This repository contains the source code for the ASI Saga website (asisaga.github.io), a static Jekyll website hosted on GitHub Pages.

## Website Architecture

The website is built using:
- **Jekyll**: Static site generator
- **Liquid**: Template language
- **Bootstrap 5.3.5**: Frontend framework
- **SCSS**: CSS preprocessor with organized architecture

## Getting Started

### Prerequisites

- Ruby 3.0+
- Jekyll 4.2+
- Git

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/asisaga/asisaga.github.io.git
   ```

2. Install dependencies:
   ```
   bundle install
   ```

3. Run the development server:
   ```
   bundle exec jekyll serve
   ```

4. Visit `http://localhost:4000` in your browser

## Directory Structure

- `_data/`: YAML data files for product and site content
- `_includes/`: Reusable UI components
- `_layouts/`: Page layout templates
- `assets/`: Static assets (CSS, JS, images)
- `docs/`: Documentation files

## Component System

The website uses a modular component system for consistent design and easy maintenance:

### Product Page Components

1. **Product Feature Grid**: Displays feature cards in a grid layout
2. **Product Code Example**: Shows code examples with syntax highlighting
3. **Product Applications**: Displays application/use case cards
4. **Product Benefits List**: Lists product benefits with highlights
5. **Product Visual**: Displays product diagrams/images
6. **Product Section Container**: Provides consistent section formatting

See [Product Components Documentation](docs/product-components.md) for complete usage details.

### SCSS Architecture

The SCSS is organized in a structured hierarchy:

- `assets/css/style.scss`: Main SCSS file (imports only)
- `assets/css/_base/`: Core styling (variables, typography, utilities)
- `assets/css/_components/`: Component-specific styles
- `assets/css/pages/`: Page-specific styles

See [SCSS Structure Documentation](docs/scss-structure.md) for details on the styling architecture.

## Data-Driven Approach

Product pages use YAML data files in the `_data` directory:

```yaml
# Example: _data/product_name.yml
title: "Product Name"
description: "Product description"

features:
  section_title: "Features"
  section_description: "Feature description"
  items:
    - title: "Feature 1"
      description: "Description"
      list_items:
        - "Item 1"
        - "Item 2"
    # More features...
```

## Documentation

- [Product Components](docs/product-components.md): Details on available components and parameters
- [SCSS Structure](docs/scss-structure.md): CSS architecture and organization
- [Using Components](docs/using-components.md): Guide to using components with examples

## Website Structure

The complete website structure is documented in [website_structure.json](website_structure.json).

## License

[MIT License](LICENSE)
