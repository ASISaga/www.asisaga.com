# SCSS Test Compilation Script

## Overview

This script validates that all SCSS files in the repository can compile successfully with the Genesis Ontological Design System mixins from the theme repository.

## Purpose

The subdomain SCSS files use semantic mixins from the Genesis Ontology system, which lives in the `ASISaga/theme.asisaga.com` repository. During normal Jekyll builds on GitHub Pages, the remote theme is merged automatically. However, for local development and CI testing, we need to explicitly access the theme's ontology mixins.

This script:
1. ✅ Detects missing Genesis Ontology mixins
2. ✅ Validates SCSS syntax
3. ✅ Checks for missing imports or variables
4. ✅ Provides clear error messages for debugging

## Usage

### Basic Usage
```bash
npm install
npm run test:scss
```

### What Happens
1. **Theme Cache Setup:** The script clones `ASISaga/theme.asisaga.com` to `.theme-cache/theme.asisaga.com/` (gitignored)
2. **SCSS Discovery:** Finds all `.scss` files in `_sass/` directory
3. **Compilation Test:** Compiles each SCSS file with proper load paths
   - For `_main.scss`: Compiles directly (has ontology import)
   - For partials: Wraps with ontology import first, then compiles
4. **Error Reporting:** Reports any compilation failures with detailed error messages
5. **Output:** Generates compiled CSS to `.test-output/` (gitignored)

### Exit Codes
- `0`: All SCSS files compiled successfully ✅
- `1`: One or more SCSS files failed to compile ❌

## File Structure

```
.
├── scripts/
│   └── test-scss-compilation.js     # This script
├── _sass/
│   ├── _main.scss                   # Main entry (imports ontology)
│   └── pages/
│       ├── _home.scss               # Page partials (use ontology mixins)
│       ├── _about.scss
│       └── ...
├── .theme-cache/                    # Theme clone (gitignored)
│   └── theme.asisaga.com/
│       └── _sass/
│           └── ontology/            # Genesis Ontology mixins
└── .test-output/                    # Compiled CSS (gitignored)
    └── ...
```

## How It Works

### Theme Caching
On first run, the script clones the theme repository. On subsequent runs, it pulls updates. This:
- ⚡ Speeds up repeat tests (no repeated cloning)
- 📦 Works offline after initial clone
- 🔄 Ensures consistency across test runs

### Partial File Handling
SCSS partial files (starting with `_`) don't import ontology directly - they expect to be imported by `_main.scss` which provides the ontology. The script handles this by:
1. Creating a temporary wrapper file that imports ontology first
2. Then importing the partial to test
3. Compiling the wrapper to validate the partial

Example wrapper for `_sass/pages/_about.scss`:
```scss
// Temporary test wrapper
@import "ontology/index";
@import "pages/about";
```

## Common Errors

### Error: Undefined mixin `genesis-environment`
**Cause:** Genesis Ontology mixin not found  
**Fix:** 
1. Check mixin name spelling in SCSS file
2. Verify theme cache is up to date: `rm -rf .theme-cache && npm run test:scss`
3. Consult `.github/instructions/scss.instructions.md` for correct mixin API

### Error: Can't find stylesheet to import
**Cause:** Import path is incorrect  
**Fix:**
1. Verify `@import "ontology/index";` is in `_sass/_main.scss`
2. Check that partial filenames start with underscore (e.g., `_about.scss`)
3. Verify import path matches file location

### Error: Invalid CSS after `$`
**Cause:** Raw CSS properties or undefined variables  
**Fix:**
1. Remove raw CSS properties (violates zero raw CSS rule)
2. Use Genesis ontological mixins instead
3. See `.github/instructions/scss.instructions.md` for the ontology API

## CI Integration

Add to `.github/workflows/test.yml`:

```yaml
name: SCSS Tests

on: [push, pull_request]

jobs:
  scss:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Test SCSS compilation
        run: npm run test:scss
```

## Maintenance

### Updating Theme Version
The script always clones the latest `main` branch of the theme. To test against a specific branch or commit:

1. Clone theme manually:
   ```bash
   rm -rf .theme-cache
   mkdir -p .theme-cache
   git clone -b your-branch https://github.com/ASISaga/theme.asisaga.com.git .theme-cache/theme.asisaga.com
   ```

2. Run test:
   ```bash
   npm run test:scss
   ```

### Cleaning Cache
To force a fresh theme clone:
```bash
rm -rf .theme-cache .test-output
npm run test:scss
```

## Design Principles

### Why Not Use Jekyll for Testing?
Jekyll compilation would work on GitHub Pages but requires Ruby setup locally. Node/Sass provides:
- ✅ Faster compilation
- ✅ Simpler setup (just npm install)
- ✅ Better error messages
- ✅ Cross-platform consistency

### Why Cache Theme Repository?
- **Performance:** Cloning on every test run is slow
- **Reliability:** Works offline after initial clone
- **Consistency:** Same theme version across multiple test runs

### Why Local Test vs MCP?
- **Speed:** Developers get instant feedback on SCSS changes
- **Deterministic:** SCSS compilation is pure and doesn't need cross-repo coordination
- **Simple:** No MCP server dependency for basic syntax validation
- **Developer UX:** Fits into standard npm workflow

## Related Documentation

- **SCSS Instructions:** `.github/instructions/scss.instructions.md`
- **Testing Instructions:** `.github/instructions/testing.instructions.md`
- **Genesis Ontology API:** `https://github.com/ASISaga/theme.asisaga.com/blob/main/_sass/ontology/INTEGRATION-GUIDE.md`
- **Theme Repository:** `https://github.com/ASISaga/theme.asisaga.com`
