#!/usr/bin/env node

/**
 * SCSS Test Compilation Script
 * 
 * This script tests compilation of all SCSS files in the repository to detect:
 * - Missing mixins from the Genesis Ontology system
 * - Missing variables or imports
 * - Syntax errors in SCSS files
 * 
 * It clones the theme repository to access the Genesis Ontology mixins that
 * are required by subdomain SCSS files.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const THEME_REPO = 'https://github.com/ASISaga/theme.asisaga.com.git';
const THEME_CACHE_DIR = '.theme-cache/theme.asisaga.com';
const SASS_DIR = '_sass';
const OUTPUT_DIR = '.test-output';

console.log('='.repeat(70));
console.log('SCSS Test Compilation for Genesis Ontology System');
console.log('='.repeat(70));
console.log();

/**
 * Clone or update the theme repository to get Genesis Ontology mixins
 */
function ensureThemeCache() {
  console.log('📦 Ensuring theme cache...');
  
  if (fs.existsSync(THEME_CACHE_DIR)) {
    console.log(`   Theme cache exists at ${THEME_CACHE_DIR}`);
    try {
      console.log('   Updating theme cache...');
      execSync('git pull --quiet', { cwd: THEME_CACHE_DIR, stdio: 'inherit' });
      console.log('   ✓ Theme cache updated');
    } catch (error) {
      console.warn('   ⚠ Could not update cache, using existing version');
    }
  } else {
    console.log(`   Cloning theme repository to ${THEME_CACHE_DIR}...`);
    try {
      // Create parent directory if needed
      const cacheParent = path.dirname(THEME_CACHE_DIR);
      if (!fs.existsSync(cacheParent)) {
        fs.mkdirSync(cacheParent, { recursive: true });
      }
      
      execSync(`git clone --depth 1 --quiet ${THEME_REPO} ${THEME_CACHE_DIR}`, {
        stdio: 'inherit'
      });
      console.log('   ✓ Theme repository cloned successfully');
    } catch (error) {
      console.error('   ✗ Failed to clone theme repository');
      console.error(`   Error: ${error.message}`);
      process.exit(1);
    }
  }
  console.log();
}

/**
 * Find all SCSS files in the _sass directory
 */
function findScssFiles() {
  const scssFiles = [];
  
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.scss')) {
        scssFiles.push(fullPath);
      }
    }
  }
  
  if (fs.existsSync(SASS_DIR)) {
    scanDir(SASS_DIR);
  }
  
  return scssFiles;
}

/**
 * Create a temporary wrapper file that imports ontology and the target partial
 */
function createWrapperFile(partialPath) {
  const wrapperContent = `// Temporary test wrapper
@import "ontology/index";
@import "${partialPath.replace('_sass/', '').replace('.scss', '')}";
`;
  
  const wrapperPath = path.join(OUTPUT_DIR, '_test-wrapper.scss');
  fs.writeFileSync(wrapperPath, wrapperContent);
  return wrapperPath;
}

/**
 * Compile a single SCSS file to test for errors
 */
function testCompileFile(scssFile) {
  const outputFile = path.join(
    OUTPUT_DIR,
    scssFile.replace(SASS_DIR, '').replace('.scss', '.css')
  );
  const outputDir = path.dirname(outputFile);
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // For partial files (starting with _), we need to wrap them to include ontology
  let fileToCompile = scssFile;
  let isPartial = path.basename(scssFile).startsWith('_') && scssFile !== path.join(SASS_DIR, '_main.scss');
  
  if (isPartial) {
    // Create a wrapper that imports ontology first, then the partial
    fileToCompile = createWrapperFile(scssFile);
  }
  
  const cmd = `sass "${fileToCompile}" "${outputFile}" --load-path="${SASS_DIR}" --load-path="${THEME_CACHE_DIR}/_sass" --no-source-map`;
  
  try {
    execSync(cmd, { stdio: 'pipe' });
    return { success: true, file: scssFile };
  } catch (error) {
    const errorOutput = error.stderr ? error.stderr.toString() : error.stdout.toString();
    return { 
      success: false, 
      file: scssFile, 
      error: errorOutput 
    };
  }
}

/**
 * Main execution
 */
function main() {
  // Step 1: Ensure theme cache exists
  ensureThemeCache();
  
  // Step 2: Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Step 3: Find all SCSS files
  console.log('🔍 Finding SCSS files...');
  const scssFiles = findScssFiles();
  console.log(`   Found ${scssFiles.length} SCSS files`);
  console.log();
  
  // Step 4: Test compile each file
  console.log('🧪 Testing SCSS compilation...');
  console.log();
  
  const results = [];
  let successCount = 0;
  let failureCount = 0;
  
  for (const scssFile of scssFiles) {
    process.stdout.write(`   Testing ${scssFile}... `);
    const result = testCompileFile(scssFile);
    results.push(result);
    
    if (result.success) {
      console.log('✓');
      successCount++;
    } else {
      console.log('✗');
      failureCount++;
    }
  }
  
  console.log();
  console.log('='.repeat(70));
  console.log('COMPILATION RESULTS');
  console.log('='.repeat(70));
  console.log(`✓ Successful: ${successCount}`);
  console.log(`✗ Failed:     ${failureCount}`);
  console.log();
  
  // Step 5: Report failures
  if (failureCount > 0) {
    console.log('ERRORS DETECTED:');
    console.log('='.repeat(70));
    console.log();
    
    for (const result of results) {
      if (!result.success) {
        console.log(`File: ${result.file}`);
        console.log('Error:');
        console.log(result.error);
        console.log('-'.repeat(70));
        console.log();
      }
    }
    
    console.log('❌ SCSS compilation test FAILED');
    console.log();
    process.exit(1);
  }
  
  console.log('✅ All SCSS files compiled successfully!');
  console.log();
  console.log(`Output files generated in: ${OUTPUT_DIR}/`);
  console.log();
}

// Run the script
main();
