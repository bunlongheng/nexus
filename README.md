<div align="center">

# nexus

**A 12-agent specialist config pack for Claude Code.**

Twelve color-coded agents, each owning exactly one concern, with zero overlap.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Claude Code](https://img.shields.io/badge/Claude%20Code-agents-D97757)

<img src="assets/hero.svg" alt="Nexus 12-agent system" width="660">

[View the live agent wiki](https://www.bunlongheng.com/ai/agents)

</div>

## Why

A single coding assistant tries to do everything at once: architecture, UX, performance,
security, cleanup. The concerns blur together and things slip through. Nexus splits the
work into 12 named specialists, each with a fixed scope. When Claude Code touches your
code, the relevant agents review their slice and nothing else. One orchestrator, Snow,
assigns work and gives final approval, so reviews stay structured instead of sprawling.

## Features

- 12 specialist agents, each owning one concern with no overlap
- Color-coded roles for instant recognition (white orchestrator, red architecture, and so on)
- Ships in four ready-to-use formats: `CLAUDE.md`, a `/nexus` skill, `agents.json`, and a React component
- A fixed report format so every agent answers in the same shape
- A single orchestrator (Snow) that assigns tasks and owns the final approval gate
- Drop-in, dependency-free, framework-agnostic

## The 12 agents

<div align="center">
  <img src="assets/agents-org.png" alt="Nexus agent hierarchy - Snow orchestrating 11 specialists" width="880">
</div>

Snow sits at the top as the orchestrator. The 11 specialists each own one slice and report up.

| Icon | # | Agent | Role | Color | Scope |
|:---:|---|-------|------|-------|-------|
| <img src="assets/agents/1.png" width="42"> | 1 | **Snow** | Orchestrator | White | Final approval, task assignment, full visibility |
| <img src="assets/agents/2.png" width="42"> | 2 | **Blaze** | Architecture | Red | System design, module boundaries, PR reviews |
| <img src="assets/agents/3.png" width="42"> | 3 | **Arrow** | UX / QA | Pink | E2E tests, accessibility, responsiveness |
| <img src="assets/agents/4.png" width="42"> | 4 | **Venus** | UI / Branding | Orange | Colors, typography, spacing, brand consistency |
| <img src="assets/agents/5.png" width="42"> | 5 | **Zap** | Performance | Yellow | Re-renders, bundles, Lighthouse, CLS, query efficiency |
| <img src="assets/agents/6.png" width="42"> | 6 | **Frost** | Metrics | Cyan | Lighthouse tracking, bundle analysis, quality trends |
| <img src="assets/agents/7.png" width="42"> | 7 | **Blitz** | Code Quality | Blue | Unit tests, coverage, lint, type safety |
| <img src="assets/agents/8.png" width="42"> | 8 | **Earth** | Cleanup | Green | Dead code, deduplication, file organization |
| <img src="assets/agents/9.png" width="42"> | 9 | **Pulse** | Automation | Purple | CI pipelines, build gating, dev tooling |
| <img src="assets/agents/10.png" width="42"> | 10 | **Sand** | Storage | Brown | localStorage, IndexedDB, caching, migrations |
| <img src="assets/agents/11.png" width="42"> | 11 | **Shadow** | Security | Grey | Auth audits, XSS, header hardening, API security |
| <img src="assets/agents/12.png" width="42"> | 12 | **Rock** | Dashboard | Slate | Admin views, data tables, monitoring UI |

## Install

Clone the repo and copy whichever format you want into your project:

```bash
git clone https://github.com/bunlongheng/nexus
```

| File | Use it as |
|---|---|
| `CLAUDE.md` | Project instructions Claude Code reads automatically |
| `.claude/commands/nexus.md` | A `/nexus` slash command skill |
| `agents.json` | Machine-readable config for tooling, dashboards, or CI |
| `components/AgentWiki.tsx` | An interactive React wiki for a Next.js app |

## Quick start

**As `CLAUDE.md` instructions.** Copy `CLAUDE.md` into your project root. Claude Code reads
it on every session and applies the agent roles automatically.

**As a Claude Code skill.** Copy `.claude/commands/nexus.md` into your project, then run
`/nexus` in Claude Code to load the 12-agent system for that session.

**As a JSON config.** Import `agents.json` into your own tooling, dashboards, or CI
pipelines. It holds each agent's id, name, role, color, scope, and description.

**As a React component.** Drop `components/AgentWiki.tsx` into a Next.js app for an
interactive, animated agent wiki page.

## How it works

Each agent has a dedicated scope, so reviews never collide:

- Editing a component? **Venus** checks branding, **Arrow** checks UX, **Blitz** checks types.
- Adding an API route? **Shadow** audits security, **Sand** checks queries, **Zap** checks performance.
- Deploying? **Pulse** verifies CI, **Frost** tracks metrics, **Snow** gives final approval.

No agent steps on another's territory, and Snow orchestrates the whole flow. Every agent
answers in the same fixed report format: an H1 title, ALL-CAPS section headers, dash
bullets, and a closing `SUMMARY` of 3 to 6 bullets, so output stays scannable no matter
which specialist produced it.

---

<div align="center">

<a href="https://bunlongheng.com"><img src="https://img.shields.io/badge/-bunlongheng.com-3A3A3C?style=for-the-badge&amp;labelColor=2A2A2C&amp;logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y%2BmAAADAFBMVEXx8vLq6v%2F19fX09PT8%2Ff309PT5%2BfnAwMBMaXHx8vL19fX5%2Bfny8vL09PT39%2Ff6%2Bfn6%2Bvr09PTx8fH4%2BPn%2F8vLy8%2FP09PTz8%2FPy8vL%2F%2F%2F%2Fz9PTz9PP19fby8vP19PXz8%2FT19%2Fb08%2FTx8vLy8vL09vby8%2FL29vf19fTv8PDz9vb7%2Bvn%2F%2Ff%2F9%2Ff3w8vH29fb%2F%2FP339%2Ff5%2Bfn59%2Ff19PT09PR7rao3VF3%2F%2Fv8AKDR6sqsBV1vv8fL4%2BPiux8b8%2Bvq90NDy8%2FR%2BlpppnZyZqrACLTxclZJSkI9en5ssZ2luqaUAeWgqbW4BX1gCfG0%2Fa3QaVG0MN0UKNUKUpKsGpYMAKjoRQ1UDf3AQRloJqIgEm32d0cUBg3ElbnQIln8eVWgrmIdP0KzF5d5s2acdfHwppJCP5MMXl4Tz8%2FLv8%2FP39%2FiewL5%2BqahYf4IrTFZkk5KlxsREiIYAHiqDnKFmnJowc3IdVllvpKK7zc3D2tnk5%2BmuycdwpKKuub2yv8Ly%2B%2FkAMT7z%2Bvjq7e09gH93q6kGdWpGgoJZmJSlw8M7c3WwyceTw76w1M8mYmpFfX8lW2AFOEpGiYhxqqRrqaRb2rdIsZ8AVE91jpU7d3t3saqBoKhako4AWVEcUlg3aWwDupAHb2YwmIkPP1ERSVA7WmZ8tq8HT14oZW%2BYuLsMl3wQT10ROksENUc8Z3MJSGVLh4dqpJ%2BXr7U51awUgHM4v6ad1MkPuJZAiowVd3IEhnZH0aoYrI05p5sDtYwkzZ8EPViYxsRel5USbHAIgmwIM0gQamzU4uF2malQi4oWQFQ1zaYrp4UXlYwfiHoyxqFE1q4qeX4yn5JIxKkdrX1b1rAbWGvd5Oh91sRijpomsJEVc3Ukc34dqIcwuJVKwZIXkoQZcXlNv5g%2BqZUZvpNl2rPG9N0WkIoNqouW4sVPwp%2BM0b6h0ssfq4d%2F1r8hpo%2Fh9e4AamUjnI9avaBixqgklYWSwL4xtItUxplYl5qZ58mq78wMgnYXfnlOmJaR1L%2Bj78ny9fS%2FrXQPAAAAFXRSTlP7Brvx%2FsJhAgD87r4U72C4uGH8vhRDodYHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC6UlEQVQokS2Sd3BUVRSHb0KS3QRCiZw5t%2By9j33zXjZkyUs2uekhEAi9dwRCL4JUEQRFAQUs9A4WOopKU0GpFoqCBZUivaqoFKkWLIS5GX7%2FfnPO78yZj%2Fj8UTViK6HggvNgSGuluEZRKbZqlN9H%2FFWiWUzIFQK5fhjOIRTDoqv4ia86S4q3KSByHdSqIhxofBKr5iNxLMm2bQqWVkorJ%2BAkO46nkQJhceSRmCTDvKJIJBLJzMxMLU6POJ4eBPF1KpNEbdt2Cms4LCcnZ%2FX6D3d%2BsKJJ7VSlNLoqgbjUtmkKKxlVmpf3bsFXW3d1b77gueJAQIPQBCilkMKemNi23Ts9T35%2FaMe2rsvmTypylGUFCSIYWJLXrm2nUwOPfNO5w%2B73Okxnjqe0JigQEL3JizoeONr%2F2u99vju4fd1rdZnyspQmnGvAUBprWNqz348%2FhXN%2F6P1%2By4Uvs%2FJkpRQRwpJBRVn7vf16Dfitz5XevQqWt3yalXtKaRIUQmglWfsu5y7%2BMrDs0TMftWo1ZVy64xioOVpcIdt8%2Fvqvf9%2F859KJsrLmrzA%2BOKC0IkFEtJza7JOfr%2FYd0P9G98tdOxe0Hp9qJrOIBgDuOeEtp%2F%2B4d%2FvWX%2F%2F9u%2B%2FtlaUTmOWZg7SQEEyuFe52%2BML9O3cZO%2F5xl06zn2VcadOJUqJTzt7a82XfP7sx9vmGNm1m1MstV4IHCVAAoTLqL1372ddn%2Fz%2B2v%2FWq12c1fSpsaeQWAZAANntxzuI3e3zbo8XGpm%2FMnNqiXrh%2BljaPd6UUabkjps19tdGnX2zKb9b4pTFDCzOMLmYtpW5h%2BpCRTeYtyV%2BT36zx808OL4xYGoFrkqDTbJpSXLdRgwbPZL%2BQnT129OOPFVEEsAMJpHKdeKMJgJSAiALdjJANQKnRJI4R6boAKEwLCiGoBBegQjBftQo1KQWOlplFKSV9qGaF1NpAE7QQESTlMSy6pp%2F4%2FFFVYxMNRBTaiM0tkImxNaL8vgfDR8gvoYRaxgAAAABJRU5ErkJggg%3D%3D" alt="bunlongheng.com"></a>
<a href="https://www.linkedin.com/in/bunlongheng/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
<a href="https://www.instagram.com/ibunlong/"><img src="https://img.shields.io/badge/Instagram-C13584?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram"></a>
<a href="mailto:bheng.code@gmail.com"><img src="https://img.shields.io/badge/Email-2E7D32?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>

<br>

Built by **[Bunlong](https://bunlongheng.com)** &nbsp;&middot;&nbsp; [more apps](https://bunlongheng.com/projects)

</div>
