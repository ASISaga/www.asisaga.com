---
description: Run the main www.asisaga.com web workflow via MCP
mode: agent
model: default
tools:
  - run_web_workflow
---

Call MCP tool `run_web_workflow` with:
```
{
  "script_path": "src/QualityMCP/workflow/run.js",
  "repo_path": "c:/Development/ASISaga/Website/www.asisaga.com",
  "args": ["--subdomain", "www"]
}
```
