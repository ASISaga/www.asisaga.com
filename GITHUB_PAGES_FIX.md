# GitHub Pages Build Fix - Missing Color Mixins

## Problem Summary

GitHub Pages was failing to build the site with the error:
```
Undefined mixin 'border-life-force-green-dark' on line 112
```

This occurred even though local SCSS compilation tests were passing.

## Root Cause Analysis

### What Happened

1. **Theme PR #47** removed the old color palette (purple and green) and replaced it with a futuristic neon blue color scheme
2. The theme updated **color variables** (`$life-force-green`, `$transformation-purple`) to map to neon blue
3. However, the theme **failed to update or remove 8 mixin definitions** that components still reference
4. Component files like `_sacred-buttons.scss` still use these mixins (e.g., `@include border-life-force-green-dark;`)

### Why Local Tests Passed

- Local SCSS compilation tests (`npm run test:scss`) only test **subdomain SCSS partials**
- They don't compile the **theme component files** that contain the problematic mixin references
- GitHub Pages builds the **entire theme + subdomain**, which is when the missing mixins are discovered

### Missing Mixins

The theme is missing these 8 mixin definitions:

| Mixin | Purpose | Now Maps To |
|-------|---------|-------------|
| `bg-life-force-green-dark` | Dark green background | Neon blue `oklch(0.55 0.22 228)` |
| `bg-transformation-purple-dark` | Dark purple background | Neon blue `oklch(0.55 0.22 228)` |
| `border-life-force-green-dark` | Dark green border | Neon blue border |
| `border-transformation-purple-dark` | Dark purple border | Neon blue border |
| `shadow-focus-life-force-green` | Green focus ring | Neon blue focus ring |
| `shadow-focus-transformation-purple` | Purple focus ring | Neon blue focus ring |
| `shadow-glow-life-force-green` | Green glow effect | Neon blue glow |
| `shadow-glow-transformation-purple` | Purple glow effect | Neon blue glow |

## Solution Implemented

### Temporary Fix (Subdomain Override)

Created `_sass/_theme-fixes.scss` that provides the missing mixin definitions:

```scss
// Color variables (using neon blue from futuristic theme)
$life-force-green: oklch(0.65 0.22 228);           // Neon blue
$life-force-green-dark: oklch(0.55 0.22 228);      // Darker neon blue
$transformation-purple: oklch(0.65 0.22 228);      // Neon blue
$transformation-purple-dark: oklch(0.55 0.22 228); // Darker neon blue

// 8 missing mixin definitions follow...
```

Updated `_sass/_main.scss` to import the fixes:

```scss
@import "ontology/index";
@import "theme-fixes";  // TEMPORARY FIX
```

### Why This Works

1. **Override Pattern**: Subdomain SCSS is compiled **after** theme SCSS in Jekyll
2. **Mixin Availability**: Our definitions make the mixins available when theme components use them
3. **Color Consistency**: We map old colors to the new neon blue scheme
4. **No Breaking Changes**: Subdomain code remains unchanged - fix is isolated to imports

## Files Changed

- `_sass/_theme-fixes.scss` - **NEW**: Mixin definitions for missing color mixins
- `_sass/_main.scss` - Import theme-fixes after ontology

## Validation

### Local Compilation Test
```bash
npm run test:scss
```
**Result:** ✅ 7/7 files passing (including new theme-fixes.scss)

### Manual Test
Created test file with all 8 missing mixins and verified compilation:
```bash
npx sass test.scss output.css --load-path=.theme-cache/theme.asisaga.com/_sass
```
**Result:** ✅ Compilation successful, correct OKLCH colors in output

## Next Steps

### Immediate (Done)
- [x] Create `_theme-fixes.scss` with missing mixins
- [x] Import theme-fixes in `_main.scss`
- [x] Test SCSS compilation
- [x] Commit and push to PR
- [ ] **Verify GitHub Pages build succeeds** ⏳

### Upstream Fix Needed
- [ ] Create issue in `ASISaga/theme.asisaga.com` repository
- [ ] Either:
  - Add the 8 missing mixin definitions to `_sass/base/_mixins.scss`, OR
  - Update all component files to remove references to old colors, OR
  - Remove obsolete component files if no longer needed

### Cleanup (After Theme Fix)
- [ ] Remove `_sass/_theme-fixes.scss` from subdomain
- [ ] Remove theme-fixes import from `_sass/_main.scss`
- [ ] Update `.theme-cache` to get new theme version
- [ ] Verify SCSS tests still pass

## Related Files in Theme

Components using the old mixins:
- `_sass/components/_sacred-buttons.scss` (line 112, 107, 129, 125, 114, 118, 132, 136)
- `_sass/components/_sacred-elements.scss`
- `_sass/components/_sacred-forms.scss`
- `_sass/components/_bridge-connections.scss`
- `_sass/components/_genesis-blocks.scss`
- `_sass/components/_genesis-invitation.scss`
- `_sass/components/_transcendent-hero.scss`
- `_sass/base/_typography.scss`
- `_sass/base/_icons.scss`
- `_sass/base/_semantic-mixins.scss`

## Technical Notes

### Why GitHub Pages Behaves Differently

- **Local build**: Only compiles files you explicitly test
- **GitHub Pages**: Uses `jekyll-remote-theme` plugin which:
  1. Clones entire theme repository
  2. Merges theme SCSS with subdomain SCSS
  3. Compiles everything together
  4. Any missing mixin anywhere in the theme causes build failure

### OKLCH Color Values

The neon blue used in the futuristic theme:
- `oklch(0.65 0.22 228)` - Primary neon blue (65% lightness, chroma 0.22, hue 228°)
- `oklch(0.55 0.22 228)` - Darker variant for hover states (55% lightness)

These match the futuristic color scheme from theme PR #47.

## References

- **Problem Statement**: PR #7 GitHub Pages build error
- **Theme PR**: ASISaga/theme.asisaga.com#47 (Futuristic color scheme)
- **Color Scheme**: Profound black + neon blue (#3A86FF)
- **Architecture**: Genesis Ontological Design System (3-tier)
