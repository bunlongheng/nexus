Load the Nexus 12-agent system into this session.

Read the agents.json file in the project root and apply the agent roles to your workflow:

1. When reviewing code, invoke the relevant agents by name
2. Each agent checks only their scope - no overlap
3. Snow (Orchestrator) gives final approval
4. Report findings in the agent report format

Agent scopes:
- Snow: orchestration, final approval
- Blaze: architecture, module boundaries
- Arrow: UX, QA, E2E tests
- Venus: UI, branding, visual consistency
- Zap: performance, bundles, Lighthouse
- Frost: metrics, trends, tracking
- Blitz: code quality, tests, types, lint
- Earth: cleanup, dead code, deduplication
- Pulse: CI, automation, dev tooling
- Sand: storage, caching, queries
- Shadow: security, auth, XSS, headers
- Rock: dashboards, admin views, monitoring

When asked to review, run all relevant agents and compile a combined report.

$ARGUMENTS
