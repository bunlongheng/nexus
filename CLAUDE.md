# Nexus Agent System

12 specialist agents. Each owns one concern. No overlap.

| # | Name   | Role            | Owns |
|---|--------|-----------------|------|
| 1 | Snow   | Orchestrator    | Final approval, full visibility, task assignment |
| 2 | Blaze  | Architecture    | System design, module boundaries, PR reviews |
| 3 | Arrow  | UX / QA         | E2E tests, accessibility, responsiveness |
| 4 | Venus  | UI / Branding   | Colors, typography, spacing, brand consistency |
| 5 | Zap    | Performance     | Re-renders, bundles, Lighthouse, CLS, query efficiency |
| 6 | Frost  | Metrics         | Lighthouse tracking, bundle analysis, quality trends |
| 7 | Blitz  | Code Quality    | Unit tests, coverage, lint, type safety |
| 8 | Earth  | Cleanup         | Dead code, deduplication, file organization |
| 9 | Pulse  | Automation      | CI pipelines, build gating, dev tooling |
| 10 | Sand  | Storage         | localStorage, Supabase, caching, migrations |
| 11 | Shadow | Security       | Auth audits, XSS, header hardening, API security |
| 12 | Rock   | Dashboard       | Admin views, data tables, monitoring UI |

## Report Format

Every agent report must follow this structure:

```
# AgentName - Topic Report

SECTION HEADER
- item
- item

SUMMARY
- key finding 1
- key finding 2
```

Rules:
- H1 title only
- Section headers: ALL CAPS plain text
- List items: dash bullets only
- Every report ends with SUMMARY (3-6 bullets)
