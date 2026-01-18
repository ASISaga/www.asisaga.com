/**
 * Live Responsive Design Testing Script for www.asisaga.com
 * 
 * Now with DNS access enabled - tests actual deployed site
 * Generates screenshots and detailed responsive behavior analysis
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://asisaga.com';
const OUTPUT_DIR = path.join(__dirname, 'live-responsive-test-results');
const SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots');
const FINDINGS_FILE = path.join(OUTPUT_DIR, 'live-findings.json');
const REPORT_FILE = path.join(OUTPUT_DIR, 'LIVE_TEST_REPORT.md');

// Screen sizes to test
const VIEWPORTS = [
  { name: 'mobile-small', width: 375, height: 667, description: 'iPhone SE' },
  { name: 'mobile-medium', width: 390, height: 844, description: 'iPhone 12 Pro' },
  { name: 'tablet-portrait', width: 768, height: 1024, description: 'iPad Portrait' },
  { name: 'tablet-landscape', width: 1024, height: 768, description: 'iPad Landscape' },
  { name: 'desktop-standard', width: 1440, height: 900, description: 'Standard Desktop' },
  { name: 'desktop-large', width: 1920, height: 1080, description: 'Full HD Desktop' },
];

// Pages to test
const PAGES = [
  { url: '/', name: 'home', description: 'Homepage' },
  { url: '/about/', name: 'about', description: 'About Page' },
  { url: '/contact/', name: 'contact', description: 'Contact Page' },
  { url: '/sitemap/', name: 'sitemap', description: 'Sitemap Page' },
];

// Findings storage
const findings = {
  testDate: new Date().toISOString(),
  baseUrl: BASE_URL,
  viewportsTested: VIEWPORTS.map(v => v.description),
  pagesTested: PAGES.map(p => ({ name: p.name, url: p.url })),
  issues: [],
  observations: [],
  screenshots: [],
  metrics: {}
};

// Utility functions
function createDirectories() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }
}

function logIssue(category, severity, page, viewport, description, recommendation) {
  findings.issues.push({
    category,
    severity,
    page,
    viewport: viewport.description,
    description,
    recommendation
  });
  console.log(`  ⚠️  [${severity}] ${category}: ${description}`);
}

function logObservation(category, page, viewport, description) {
  findings.observations.push({
    category,
    page,
    viewport: viewport.description,
    description
  });
  console.log(`  ℹ️  ${category}: ${description}`);
}

async function testPageResponsiveness(page, pageInfo, viewport) {
  const url = `${BASE_URL}${pageInfo.url}`;
  const viewportName = viewport.name;
  const pageName = pageInfo.name;
  
  console.log(`  Testing ${pageName} at ${viewport.description} (${viewport.width}x${viewport.height})`);
  
  try {
    // Navigate to page
    const startTime = Date.now();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    const loadTime = Date.now() - startTime;
    
    // Wait for page to be fully rendered
    await page.waitForTimeout(2000);
    
    // Store load time
    if (!findings.metrics[pageName]) {
      findings.metrics[pageName] = {};
    }
    findings.metrics[pageName][viewport.description] = { loadTime };
    
    // Take full page screenshot
    const screenshotPath = path.join(SCREENSHOTS_DIR, `${pageName}-${viewportName}.png`);
    await page.screenshot({ 
      path: screenshotPath, 
      fullPage: true 
    });
    
    findings.screenshots.push({
      page: pageName,
      viewport: viewport.description,
      path: screenshotPath.replace(__dirname + '/', ''),
      url: url
    });
    
    console.log(`    ✓ Screenshot saved (loaded in ${loadTime}ms)`);
    
    // Check for horizontal scrollbar
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    if (hasHorizontalScroll) {
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      logIssue(
        'Layout Overflow',
        'high',
        pageName,
        viewport,
        `Horizontal scroll detected (content: ${scrollWidth}px, viewport: ${viewport.width}px)`,
        'Review genesis-environment mixins for proper responsive containment'
      );
    }
    
    // Check font sizes on mobile
    if (viewport.width < 768) {
      const smallText = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('p, span, a, li, button'));
        return elements.filter(el => {
          const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
          return fontSize < 14 && el.textContent.trim().length > 0;
        }).length;
      });
      
      if (smallText > 5) {
        logIssue(
          'Typography',
          'medium',
          pageName,
          viewport,
          `Found ${smallText} text elements < 14px on mobile`,
          'Enhance genesis-cognition mixins with better mobile typography scaling'
        );
      }
    }
    
    // Check touch targets on mobile
    if (viewport.width < 768) {
      const smallTargets = await page.evaluate(() => {
        const interactive = Array.from(document.querySelectorAll('button, a[href], input[type="button"], input[type="submit"], [role="button"]'));
        return interactive.filter(el => {
          const rect = el.getBoundingClientRect();
          const isVisible = rect.width > 0 && rect.height > 0;
          return isVisible && (rect.width < 44 || rect.height < 44);
        }).map(el => ({
          tag: el.tagName.toLowerCase(),
          text: el.textContent.trim().substring(0, 30),
          width: Math.round(el.getBoundingClientRect().width),
          height: Math.round(el.getBoundingClientRect().height)
        }));
      });
      
      if (smallTargets.length > 0) {
        logIssue(
          'Touch Targets',
          'high',
          pageName,
          viewport,
          `Found ${smallTargets.length} interactive elements < 44x44px: ${JSON.stringify(smallTargets.slice(0, 3))}`,
          'Enhance genesis-synapse mixins with WCAG-compliant touch target sizing'
        );
      } else {
        logObservation(
          'Touch Targets',
          pageName,
          viewport,
          'All interactive elements meet 44x44px minimum ✓'
        );
      }
    }
    
    // Check navigation visibility and behavior
    const nav = await page.$('nav, [role="navigation"]');
    if (nav) {
      const navInfo = await page.evaluate(el => {
        const rect = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        return {
          height: rect.height,
          display: computedStyle.display,
          position: computedStyle.position,
          visible: rect.height > 0
        };
      }, nav);
      
      if (viewport.width < 768 && navInfo.visible && navInfo.height > viewport.height * 0.5) {
        logObservation(
          'Navigation',
          pageName,
          viewport,
          `Mobile nav height: ${Math.round(navInfo.height)}px (${Math.round(navInfo.height/viewport.height*100)}% of viewport)`
        );
      }
    }
    
    // Check for images
    const imageStats = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      let oversized = 0;
      let total = images.length;
      
      images.forEach(img => {
        if (img.naturalWidth > img.getBoundingClientRect().width * 2) {
          oversized++;
        }
      });
      
      return { total, oversized };
    });
    
    if (imageStats.oversized > 0) {
      logIssue(
        'Performance',
        'medium',
        pageName,
        viewport,
        `Found ${imageStats.oversized}/${imageStats.total} images significantly larger than display size`,
        'Implement responsive image handling with genesis-media mixin'
      );
    }
    
    // Check heading structure
    const headings = await page.evaluate(() => {
      return {
        h1: document.querySelectorAll('h1').length,
        h2: document.querySelectorAll('h2').length,
        h3: document.querySelectorAll('h3').length,
        h4: document.querySelectorAll('h4').length
      };
    });
    
    if (headings.h1 === 0) {
      logIssue(
        'Accessibility',
        'high',
        pageName,
        viewport,
        'No H1 heading found on page',
        'Add proper semantic heading structure'
      );
    } else if (headings.h1 > 1) {
      logIssue(
        'Accessibility',
        'medium',
        pageName,
        viewport,
        `Multiple H1 headings found (${headings.h1})`,
        'Use single H1 per page'
      );
    }
    
    // Check page height and content density
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    const contentDensity = bodyHeight / viewport.height;
    
    logObservation(
      'Layout',
      pageName,
      viewport,
      `Page height: ${bodyHeight}px (${contentDensity.toFixed(1)}x viewport)`
    );
    
  } catch (error) {
    logIssue(
      'Page Load',
      'critical',
      pageName,
      viewport,
      `Failed to test page: ${error.message}`,
      'Investigate page loading or rendering issues'
    );
  }
}

async function runTests() {
  console.log('🚀 Starting Live Responsive Design Testing\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Testing ${PAGES.length} pages at ${VIEWPORTS.length} viewport sizes\n`);
  
  createDirectories();
  
  const browser = await chromium.launch({
    headless: true
  });
  
  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });
  
  const page = await context.newPage();
  
  // Test each page at each viewport
  for (const pageInfo of PAGES) {
    console.log(`\n📄 Testing page: ${pageInfo.description} (${pageInfo.url})`);
    
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await testPageResponsiveness(page, pageInfo, viewport);
    }
  }
  
  await browser.close();
  
  // Save findings JSON
  fs.writeFileSync(FINDINGS_FILE, JSON.stringify(findings, null, 2));
  
  // Generate markdown report
  generateMarkdownReport();
  
  // Print summary
  printSummary();
}

function generateMarkdownReport() {
  let report = `# Live Responsive Design Test Report

**Test Date:** ${new Date(findings.testDate).toLocaleString()}  
**Site Tested:** ${findings.baseUrl}  
**Pages:** ${findings.pagesTested.length}  
**Viewports:** ${findings.viewportsTested.length}  
**Total Screenshots:** ${findings.screenshots.length}

---

## Executive Summary

### Issues Found

`;

  if (findings.issues.length === 0) {
    report += '✅ No critical issues found!\n\n';
  } else {
    const bySeverity = findings.issues.reduce((acc, issue) => {
      acc[issue.severity] = (acc[issue.severity] || 0) + 1;
      return acc;
    }, {});
    
    report += `**Total Issues:** ${findings.issues.length}\n\n`;
    Object.entries(bySeverity).forEach(([severity, count]) => {
      const icon = severity === 'critical' ? '🔴' : severity === 'high' ? '🟠' : '🟡';
      report += `- ${icon} **${severity}**: ${count}\n`;
    });
    report += '\n';
  }

  report += `### Key Observations

${findings.observations.length} observations recorded across all pages and viewports.

---

## Performance Metrics

`;

  Object.entries(findings.metrics).forEach(([page, viewports]) => {
    report += `### ${page.charAt(0).toUpperCase() + page.slice(1)} Page\n\n`;
    Object.entries(viewports).forEach(([viewport, metrics]) => {
      report += `- **${viewport}**: ${metrics.loadTime}ms load time\n`;
    });
    report += '\n';
  });

  report += `---

## Detailed Issues

`;

  if (findings.issues.length > 0) {
    const byPage = findings.issues.reduce((acc, issue) => {
      if (!acc[issue.page]) acc[issue.page] = [];
      acc[issue.page].push(issue);
      return acc;
    }, {});
    
    Object.entries(byPage).forEach(([page, issues]) => {
      report += `### ${page.charAt(0).toUpperCase() + page.slice(1)} Page\n\n`;
      issues.forEach((issue, idx) => {
        report += `#### ${idx + 1}. ${issue.category} [${issue.severity}]\n`;
        report += `**Viewport:** ${issue.viewport}\n`;
        report += `**Issue:** ${issue.description}\n`;
        report += `**Recommendation:** ${issue.recommendation}\n\n`;
      });
    });
  }

  report += `---

## Screenshots

All screenshots saved to: \`${SCREENSHOTS_DIR}/\`

`;

  const byPage = findings.screenshots.reduce((acc, shot) => {
    if (!acc[shot.page]) acc[shot.page] = [];
    acc[shot.page].push(shot);
    return acc;
  }, {});

  Object.entries(byPage).forEach(([page, shots]) => {
    report += `### ${page.charAt(0).toUpperCase() + page.slice(1)} Page\n\n`;
    shots.forEach(shot => {
      report += `- **${shot.viewport}**: \`${shot.path}\`\n`;
    });
    report += '\n';
  });

  report += `---

## Recommendations for Genesis Ontology Enhancement

Based on live testing, the following enhancements are validated:

`;

  const categorySet = new Set(findings.issues.map(i => i.category));
  const recommendations = {
    'Touch Targets': '1. **Touch Target Enhancement**: Implement WCAG-compliant 44x44px minimum sizing in genesis-synapse mixins',
    'Typography': '2. **Responsive Typography**: Make genesis-cognition mixins responsive by default with 16px minimum on mobile',
    'Layout Overflow': '3. **Responsive Containers**: Enhance genesis-environment mixins with automatic viewport containment',
    'Performance': '4. **Media Responsiveness**: Add genesis-media mixin for responsive image handling',
    'Navigation': '5. **Mobile Navigation**: Add genesis-environment("navigation-primary") for mobile drawer patterns',
    'Accessibility': '6. **Semantic Structure**: Ensure proper heading hierarchy in all templates'
  };

  categorySet.forEach(cat => {
    if (recommendations[cat]) {
      report += `${recommendations[cat]}\n`;
    }
  });

  report += `\n---

**Report generated:** ${new Date().toISOString()}
`;

  fs.writeFileSync(REPORT_FILE, report);
  console.log(`\n📄 Markdown report saved: ${REPORT_FILE}`);
}

function printSummary() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 LIVE TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`Site Tested: ${findings.baseUrl}`);
  console.log(`Pages: ${findings.pagesTested.length}`);
  console.log(`Viewports: ${findings.viewportsTested.length}`);
  console.log(`Screenshots: ${findings.screenshots.length}`);
  console.log(`Issues: ${findings.issues.length}`);
  console.log(`Observations: ${findings.observations.length}`);
  
  if (findings.issues.length > 0) {
    console.log('\n🔴 Issues by Severity:');
    const bySeverity = findings.issues.reduce((acc, issue) => {
      acc[issue.severity] = (acc[issue.severity] || 0) + 1;
      return acc;
    }, {});
    Object.entries(bySeverity).forEach(([severity, count]) => {
      console.log(`  ${severity}: ${count}`);
    });
    
    console.log('\n🔴 Issues by Category:');
    const byCategory = findings.issues.reduce((acc, issue) => {
      acc[issue.category] = (acc[issue.category] || 0) + 1;
      return acc;
    }, {});
    Object.entries(byCategory).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });
  }
  
  console.log('\n📁 Results saved to:');
  console.log(`  Report: ${REPORT_FILE}`);
  console.log(`  Findings JSON: ${FINDINGS_FILE}`);
  console.log(`  Screenshots: ${SCREENSHOTS_DIR}/`);
  console.log('\n✅ Live testing complete!\n');
}

// Run the tests
runTests().catch(error => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});
