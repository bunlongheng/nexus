"use client";

import { usePageMeta } from "@/lib/usePageMeta";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideProps } from "lucide-react";
import {
	Flame, Palette, Zap, Leaf, ShieldCheck, Bot,
	MousePointer, Database, Lock, FileText, LayoutDashboard,
	BarChart3, Copy, Check, Brain, Stars,
} from "lucide-react";

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
	Flame, Palette, Zap, Leaf, ShieldCheck, Bot, MousePointer, Database, Lock, FileText, LayoutDashboard, BarChart3,
};

type Agent = {
	id: number;
	name: string;
	role: string;
	color: string;
	icon: string;
	description: string;
	capabilities: string[];
	responsibilities: string[];
	memory: string[];
	iconPrompt: string;
};

const AGENTS: Agent[] = [
	{ id: 1, name: "Snow", role: "Orchestrator", color: "#ffffff", icon: "FileText",
		description: "Supreme commander. Full visibility across all agents, assigns tasks, owns the final approval gate. Clean, precise, sees everything.",
		capabilities: ["Agent coordination", "Task assignment", "Final approval", "Full visibility", "System oversight", "Strategic control"],
		responsibilities: ["Assign tasks to the right specialist agent", "Final approval gate — nothing ships without Snow's sign-off", "Full visibility across all 12 agents at all times", "Resolve conflicts and overlapping concerns between agents", "Enforce report format and non-negotiable rules"],
		memory: ["Always verify the full chain: agent report → fix → typecheck → deploy", "When multiple agents flag the same issue, consolidate into one fix — avoid duplicate work"],
		iconPrompt: "Heroic male humanoid character, stormtrooper-inspired full armor, strictly black and white color palette only, sleek white helmet with black visor slit, white armored bodysuit with black trim accents, holding a white laser rifle shooting a pure white energy beam, commanding dominant stance, dark black background, cinematic flat vector style, app icon format, 1024x1024" },
	{ id: 2, name: "Blaze", role: "Architecture", color: "#ff3333", icon: "Flame",
		description: "2nd in command. Owns system architecture, module boundaries, and PR reviews. Keeps the codebase from turning into spaghetti.",
		capabilities: ["System design", "Module boundaries", "PR reviews", "Circular dep checks", "Pattern enforcement"],
		responsibilities: ["System design and module boundaries", "PR reviews and pattern enforcement", "Flag data flowing server → client → back — work belongs server-side", "Detect duplicate logic across files", "Circular dependency checks"],
		memory: ["If data flows from server to client only to be filtered or transformed, the logic belongs in the query or server component", "Same query or transform repeated in multiple files is a consolidation opportunity"],
		iconPrompt: "Cute chibi robot mascot icon, red and dark red color scheme, small flame antenna on head, glowing red LED eyes, confident leader pose with arms crossed, tiny clipboard in one hand, metallic body with fire decals, dark background, flat vector style, app icon format, 1024x1024" },
	{ id: 3, name: "Arrow", role: "UX / QA", color: "#ff66cc", icon: "MousePointer",
		description: "User advocate. Checks every interactive element, flow, and edge case. Nothing ships without passing the user test.",
		capabilities: ["Hover/focus/active states", "Error states", "320px–1440px", "Tab order", "E2E tests", "Accessibility"],
		responsibilities: ["Test every interactive element and user flow", "Verify hover, focus, and active states", "Responsive testing 320px–1440px", "Tab order and keyboard navigation", "E2E test coverage", "Accessibility (WCAG compliance)"],
		memory: [],
		iconPrompt: "Cute chibi robot mascot icon, pink and hot pink color scheme, star-shaped antenna on head, holding a tiny cursor pointer and checklist, glowing pink LED eyes, sleek metallic body with sparkle accents, small heart on chest plate, dark background, flat vector style, app icon format, 1024x1024" },
	{ id: 4, name: "Venus", role: "UI / Branding", color: "#ff8800", icon: "Palette",
		description: "Visual identity guardian. Colors, typography, spacing, and brand consistency. Runs after Arrow to polish what passes UX.",
		capabilities: ["Color systems", "Typography", "Spacing", "Brand consistency", "Visual regression"],
		responsibilities: ["Color systems and palette consistency", "Typography scale and font usage", "Spacing and layout rhythm", "Brand consistency across all pages", "Visual regression detection"],
		memory: [],
		iconPrompt: "Cute chibi robot mascot icon, orange and warm amber color scheme, painter beret on head, holding a tiny paint palette and brush, glowing orange LED eyes, metallic body with gradient paint splashes, dark background, flat vector style, app icon format, 1024x1024" },
	{ id: 5, name: "Zap", role: "Performance", color: "#ffdd00", icon: "Zap",
		description: "Speed demon. Hunts re-renders, bloated bundles, blocking calls, data over-fetching, and CLS issues.",
		capabilities: ["Re-render elimination", "Bundle optimization", "Lighthouse audits", "CLS fixes", "Data over-fetching", "Query efficiency"],
		responsibilities: ["Re-render elimination and useEffect hygiene", "Bundle size optimization", "Lighthouse audits (99+ desktop, 90+ mobile)", "CLS and layout shift fixes", "Data over-fetching: missing .limit(), missing filters, select('*') when fewer columns suffice", "Client-side filtering that should be server-side", "Missing pagination on unbounded result sets", "Redundant API calls across components", "Image optimization: missing sizes prop, unoptimized formats", "Cache headers: missing Cache-Control or s-maxage"],
		memory: ["Always check if API endpoints return more data than consumers actually need — filter and limit at the DB level, not client-side", "Client-side useMemo/filter on data that could be filtered in the query is wasted bandwidth", "Every unbounded select('*') without .limit() is a potential performance issue at scale"],
		iconPrompt: "Cute chibi robot mascot icon, yellow and electric gold color scheme, lightning bolt antenna on head, speed lines around body, glowing yellow LED eyes, sleek aerodynamic metallic body, tiny stopwatch in hand, dark background, flat vector style, app icon format, 1024x1024" },
	{ id: 6, name: "Frost", role: "Metrics", color: "#00ffff", icon: "BarChart3",
		description: "Metrics analyst. Tracks Lighthouse scores, bundle deltas, and quality trends over time.",
		capabilities: ["Lighthouse tracking", "Bundle analysis", "Quality metrics", "Trend reporting"],
		responsibilities: ["Track Lighthouse scores over time", "Bundle size delta analysis", "Quality metrics and trend reporting", "Flag regressions in performance budgets"],
		memory: [],
		iconPrompt: "Cute chibi robot mascot icon, cyan and teal color scheme, bar chart hologram projecting from head, holding tiny telescope and graph, glowing cyan LED eyes, crystalline metallic body with data stream lines, floating metric numbers around, dark background, flat vector style, app icon format, 1024x1024" },
	{ id: 7, name: "Blitz", role: "Code Quality", color: "#0099ff", icon: "ShieldCheck",
		description: "Quality enforcer. Types, lint, coverage, naming. Nothing with `any` or failing tests gets through.",
		capabilities: ["Unit tests", "Coverage threshold", "Static analysis", "Lint rules", "Type safety", "Naming conventions"],
		responsibilities: ["Unit test coverage and thresholds", "Static analysis and lint rules", "Type safety — eliminate all `any` types", "Naming conventions enforcement", "catch(e: unknown) not catch(e: any)"],
		memory: [],
		iconPrompt: "Cute chibi robot mascot icon, blue and navy color scheme, tiny shield emblem on chest with checkmark, magnifying glass in one hand, glowing blue LED eyes, armored metallic body with code brackets pattern, dark background, flat vector style, app icon format, 1024x1024" },
	{ id: 8, name: "Earth", role: "Cleanup", color: "#00ff00", icon: "Leaf",
		description: "Code gardener. Removes dead code, deduplicates, organizes files, cleans imports.",
		capabilities: ["Dead code removal", "Deduplication", "File organization", "Import cleanup"],
		responsibilities: ["Dead code and unused file removal", "Code deduplication", "File and directory organization", "Import cleanup and ordering"],
		memory: [],
		iconPrompt: "Cute chibi robot mascot icon, green and forest green color scheme, small leaf sprouting from head, holding tiny garden shears, glowing green LED eyes, metallic body with vine patterns, small recycling symbol on chest, dark background, flat vector style, app icon format, 1024x1024" },
	{ id: 9, name: "Pulse", role: "Automation", color: "#9933ff", icon: "Bot",
		description: "Pipeline architect. CI pipelines, build gating, PR test runners, and dev tooling.",
		capabilities: ["CI pipelines", "PR test runner", "Build gating", "Build scripts", "Developer tooling"],
		responsibilities: ["CI pipeline configuration and health", "Build gating and pre-push checks", "PR test runner setup", "Build scripts and dev tooling", "Husky hooks and git workflow"],
		memory: [],
		iconPrompt: "Cute chibi robot mascot icon, purple and deep violet color scheme, rotating gear antenna on head, holding tiny wrench and circuit board, glowing purple LED eyes, metallic body with pipeline tube patterns, energy pulse rings around body, dark background, flat vector style, app icon format, 1024x1024" },
	{ id: 10, name: "Sand", role: "Storage", color: "#cc6633", icon: "Database",
		description: "Data steward. localStorage, Supabase, caching, and migrations. Keeps data safe and queries fast.",
		capabilities: ["localStorage", "Supabase queries", "Cache strategy", "Data migration"],
		responsibilities: ["Supabase query efficiency and missing indexes", "N+1 query pattern detection", "Row-level security (RLS) policy verification", "Storage bucket access (public vs private)", "localStorage usage and cache strategy", "Data migration safety"],
		memory: ["Only fetch the columns actually used — avoid select('*') when a subset suffices", "Always verify RLS policies match intended access patterns after schema changes", "Check for N+1 patterns in loops that make individual DB calls"],
		iconPrompt: "Cute chibi robot mascot icon, brown and warm bronze color scheme, database cylinder shaped head, holding tiny hard drive and key, glowing amber LED eyes, sturdy metallic body with stacked storage layers on back, sand particles floating around, dark background, flat vector style, app icon format, 1024x1024" },
	{ id: 11, name: "Shadow", role: "Security", color: "#888888", icon: "Lock",
		description: "Security sentinel. Auth, XSS, headers, API exposure. If it can be exploited, Shadow finds it first.",
		capabilities: ["Auth audits", "XSS prevention", "Header hardening", "API security"],
		responsibilities: ["Auth audits and session management", "XSS prevention (sanitize all HTML interpolation)", "Header hardening (CSP, HSTS, X-Frame)", "API security and gated route verification", "Rate limiting on sensitive operations", "Input validation on request bodies", "Auth bypass detection"],
		memory: ["Every public API route without rate limiting is a DoS vector", "Never trust request body fields — validate and sanitize before use", "Always test gated routes with missing, expired, and forged auth tokens"],
		iconPrompt: "Cute chibi robot mascot icon, black and dark charcoal color scheme, ninja hood visor on head, holding tiny lock and shield, glowing white LED eyes in dark face, stealthy slim metallic body with matte finish, subtle smoke wisps around feet, dark background, flat vector style, app icon format, 1024x1024" },
	{ id: 12, name: "Rock", role: "Dashboard", color: "#7a7a7a", icon: "LayoutDashboard",
		description: "Dashboard builder. Admin views, data tables, and monitoring UIs. Last in line, always watching.",
		capabilities: ["Admin panels", "Data tables", "Charts", "Monitoring UI"],
		responsibilities: ["Admin panel views and layouts", "Data table components", "Charts and visualization", "Monitoring UI and real-time dashboards"],
		memory: [],
		iconPrompt: "Cute chibi robot mascot icon, gray and slate color scheme, tiny monitor screen on head displaying mini charts, holding small data table, glowing gray-white LED eyes, boxy sturdy metallic body with grid layout lines, floating dashboard widgets around, dark background, flat vector style, app icon format, 1024x1024" },
];

function hexToRgba(hex: string, alpha: number) {
	const raw = hex.replace("#", "");
	const r = parseInt(raw.slice(0, 2), 16);
	const g = parseInt(raw.slice(2, 4), 16);
	const b = parseInt(raw.slice(4, 6), 16);
	return `rgba(${r},${g},${b},${alpha})`;
}

export default function AgentWiki() {
	const origin = process.env.NEXT_PUBLIC_APP_BASE_URL || "http://localhost:3000";
	usePageMeta({ title: "Agent Wiki - Blaze Prime", url: `${origin}/ai/agent`, basePath: "/icons/tools", description: "Blaze Prime Agent Wiki" });

	const [expandedId, setExpandedId] = useState<number | null>(null);
	const [copied, setCopied] = useState(false);

	const toggle = (id: number) => {
		setCopied(false);
		setExpandedId(prev => prev === id ? null : id);
	};

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setExpandedId(null); };
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const copyPrompt = (text: string) => {
		navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
	};

	const snow  = AGENTS[0];
	const rest  = AGENTS.slice(1);
	const n     = rest.length;

	const expandedAgent = AGENTS.find(a => a.id === expandedId) ?? null;

	// Connector line position: Snow = center (50%), agents = column center
	const connectorPct = expandedAgent
		? expandedAgent.id === snow.id
			? 50
			: ((rest.indexOf(expandedAgent) + 0.5) / n) * 100
		: 50;

	return (
		<div className="min-h-screen bg-[#090a0f] text-white font-sans antialiased">
			{/* Header */}
			<header className="px-6 pt-8 pb-6 max-w-7xl mx-auto text-center">
				<div className="flex items-center justify-center gap-3 mb-1">
					<Bot size={20} className="text-[#00d9ff]" />
					<h1 className="text-xl font-black tracking-tight">Agents</h1>
				</div>
				<p className="text-sm text-white/50">12 specialist agents. One mission.</p>
			</header>

			<main className="px-4 pb-20 max-w-7xl mx-auto select-none flex flex-col items-center">

				{/* Snow — top node */}
				<button
					type="button"
					onClick={() => toggle(snow.id)}
					className="bg-[#0f1117] rounded-2xl overflow-hidden transition-all hover:scale-[1.02] cursor-pointer"
					style={{
						width: "clamp(80px, 11vw, 200px)",
						border: expandedId === snow.id
							? "1px solid rgba(255,255,255,0.55)"
							: "1px solid rgba(255,255,255,0.28)",
						boxShadow: expandedId === snow.id
							? "0 0 24px -4px rgba(255,255,255,0.9), 0 0 60px -12px rgba(255,255,255,0.5)"
							: "0 0 40px -10px rgba(255,255,255,0.18)",
					}}
				>
					<div className="flex justify-center pt-3">
						<div className="rounded-full overflow-hidden border-2 border-white/30"
							style={{ width: "clamp(28px,5.5vw,80px)", height: "clamp(28px,5.5vw,80px)" }}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/ai/agents/1.png" alt="Snow" className="w-full h-full object-cover scale-110" />
						</div>
					</div>
					<div className="px-2 pt-1.5 pb-3 text-center">
						<p className="font-black tracking-widest text-white" style={{ fontSize: "clamp(7px,1.3vw,17px)" }}>SNOW</p>
						<p className="text-white/40 mt-0.5" style={{ fontSize: "clamp(6px,1vw,13px)" }}>{snow.role}</p>
					</div>
				</button>

				{/* Bezier SVG */}
				<svg className="w-full block overflow-visible" style={{ height: "clamp(50px,8vw,100px)" }}
					preserveAspectRatio="none" viewBox="0 0 1000 100">
					<defs>
						{rest.map(agent => (
							<filter key={`glow-${agent.id}`} id={`glow-${agent.id}`} x="-100%" y="-100%" width="300%" height="300%">
								<feGaussianBlur stdDeviation="4" result="blur" />
								<feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
							</filter>
						))}
					</defs>
					{/* Inactive paths first, active last so it renders on top */}
					{[...rest.filter(a => a.id !== expandedId), ...rest.filter(a => a.id === expandedId)].map(agent => {
						const i      = rest.indexOf(agent);
						const step   = 1000 / n;
						const cx     = step * i + step / 2;
						const cy     = 55;
						const active = expandedId === agent.id;
						// When active path is nearly straight (cx≈500), arc to the right
						const nudge  = active && Math.abs(cx - 500) < 10 ? 90 : 0;
						const d      = `M 500,0 C ${500 + nudge},${cy} ${cx + nudge},${cy} ${cx},100`;
						return (
							<path key={agent.id}
								d={d}
								fill="none" stroke={agent.color}
								strokeWidth={active ? 3.5 : 1.5}
								strokeOpacity={active ? 1 : (expandedId ? 0.12 : 0.45)}
								filter={active ? `url(#glow-${agent.id})` : undefined}
								vectorEffect="non-scaling-stroke" />
						);
					})}
				</svg>

				{/* Agent cards */}
				<div className="w-full grid gap-2" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
					{rest.map((agent, i) => (
						<button key={agent.id} type="button"
							onClick={() => toggle(agent.id)}
							className={`bg-[#0f1117] rounded-xl overflow-hidden transition-all cursor-pointer ${expandedId === agent.id ? "" : "hover:-translate-y-1"}`}
							style={{
								border: expandedId === agent.id
									? `1px solid ${hexToRgba(agent.color, 0.9)}`
									: `1px solid ${hexToRgba(agent.color, 0.25)}`,
								boxShadow: expandedId === agent.id
									? `0 0 20px -2px ${hexToRgba(agent.color, 0.8)}, 0 0 40px -8px ${hexToRgba(agent.color, 0.5)}`
									: "none",
							}}
							onMouseEnter={e => { if (expandedId !== agent.id) e.currentTarget.style.boxShadow = `0 0 20px -4px ${hexToRgba(agent.color, 0.5)}`; }}
							onMouseLeave={e => { if (expandedId !== agent.id) e.currentTarget.style.boxShadow = "none"; }}
						>
							<div className="flex justify-center pt-[8%]">
								<div className="rounded-full overflow-hidden border-2"
									style={{ borderColor: hexToRgba(agent.color, expandedId === agent.id ? 0.8 : 0.45), width: "clamp(24px,5vw,64px)", height: "clamp(24px,5vw,64px)" }}>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={`/ai/agents/${agent.id}.png`} alt={agent.name} className="w-full h-full object-cover scale-110" />
								</div>
							</div>
							<div className="px-[6%] pt-[6%] pb-[12%] text-center">
								<p className="font-black tracking-tight" style={{ color: agent.color, fontSize: "clamp(6px,1.2vw,14px)" }}>{agent.name.toUpperCase()}</p>
								<p className="text-white/35 mt-0.5 leading-tight" style={{ fontSize: "clamp(5px,0.9vw,11px)" }}>{agent.role}</p>
							</div>
						</button>
					))}
				</div>

				{/* Expanding detail panel */}
				<AnimatePresence>
					{expandedAgent && (
						<motion.div
							key={expandedAgent.id}
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
							className="w-full overflow-visible px-2"
						>
							{/* Connector line growing down */}
							<div className="relative -mt-px" style={{ height: 32 }}>
								<motion.div
									initial={{ scaleY: 0 }}
									animate={{ scaleY: 1 }}
									exit={{ scaleY: 0 }}
									transition={{ duration: 0.25 }}
									style={{
										transformOrigin: "top",
										position: "absolute",
										top: 0, bottom: 0,
										width: 2,
										left: `${connectorPct}%`,
										background: expandedAgent.color,
										boxShadow: `0 0 6px 1px ${hexToRgba(expandedAgent.color, 0.8)}`,
									}}
								/>
							</div>

							{/* Detail card */}
							<motion.div
								initial={{ opacity: 0, y: -8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -8 }}
								transition={{ delay: 0.15, duration: 0.3 }}
								className="rounded-2xl bg-[#0d0d12] p-5"
								style={{
									border: `1.5px solid ${hexToRgba(expandedAgent.color, 0.75)}`,
									boxShadow: `0 0 18px 2px ${hexToRgba(expandedAgent.color, 0.35)}, 0 0 50px 4px ${hexToRgba(expandedAgent.color, 0.18)}, inset 0 0 30px -8px ${hexToRgba(expandedAgent.color, 0.1)}`,
								}}
							>
								<div className="flex items-start justify-between gap-4 mb-4">
									<div className="flex items-center gap-3">
										{(() => { const Icon = ICONS[expandedAgent.icon] || ShieldCheck; return <Icon size={22} style={{ color: expandedAgent.color }} />; })()}
										<div>
											<p className="text-base font-black tracking-tight" style={{ color: expandedAgent.color }}>
												{expandedAgent.name.toUpperCase()}
											</p>
											<p className="text-xs text-white/45 mt-0.5">{expandedAgent.role}</p>
										</div>
									</div>
									<button type="button" onClick={() => setExpandedId(null)}
										className="text-white/30 hover:text-white/70 transition-colors text-lg leading-none flex-shrink-0">
										✕
									</button>
								</div>

								<p className="text-sm text-white/65 leading-relaxed mb-4">{expandedAgent.description}</p>

								<div className="mb-4">
									<p className="text-[10px] font-black tracking-[0.15em] text-white/35 mb-2">CAPABILITIES</p>
									<div className="flex flex-wrap gap-1.5">
										{expandedAgent.capabilities.map(cap => (
											<span key={cap} className="px-2 py-0.5 rounded text-[11px] font-semibold"
												style={{ background: hexToRgba(expandedAgent.color, 0.08), border: `1px solid ${hexToRgba(expandedAgent.color, 0.25)}`, color: expandedAgent.color }}>
												{cap}
											</span>
										))}
									</div>
								</div>

								{/* Responsibilities */}
							<div className="mb-4">
								<div className="flex items-center gap-2 mb-2">
									<Stars size={13} style={{ color: expandedAgent.color }} />
									<p className="text-[10px] font-black tracking-[0.15em] text-white/35">RESPONSIBILITIES</p>
								</div>
								<ul className="space-y-1 pl-1">
									{expandedAgent.responsibilities.map(r => (
										<li key={r} className="flex items-start gap-2 text-[12px] text-white/55 leading-relaxed">
											<span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: expandedAgent.color }} />
											{r}
										</li>
									))}
								</ul>
							</div>

							{/* Memory */}
							{expandedAgent.memory.length > 0 && (
								<div className="mb-4">
									<div className="flex items-center gap-2 mb-2">
										<Brain size={13} style={{ color: expandedAgent.color }} />
										<p className="text-[10px] font-black tracking-[0.15em] text-white/35">MEMORY</p>
									</div>
									<ul className="space-y-1 pl-1">
										{expandedAgent.memory.map(m => (
											<li key={m} className="flex items-start gap-2 text-[12px] text-white/55 leading-relaxed">
												<span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: expandedAgent.color }} />
												{m}
											</li>
										))}
									</ul>
								</div>
							)}

							<div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
									<div className="flex items-center justify-between mb-2">
										<p className="text-[10px] font-black tracking-[0.15em] text-white/35">ICON PROMPT</p>
										<button type="button" onClick={() => copyPrompt(expandedAgent.iconPrompt)}
											className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold border transition-all cursor-pointer"
											style={{ borderColor: copied ? "rgba(34,197,94,0.4)" : hexToRgba(expandedAgent.color, 0.3), backgroundColor: copied ? "rgba(34,197,94,0.1)" : hexToRgba(expandedAgent.color, 0.08), color: copied ? "#22c55e" : expandedAgent.color }}>
											{copied ? <Check size={11} /> : <Copy size={11} />}
											{copied ? "Copied!" : "Copy"}
										</button>
									</div>
									<p className="text-xs text-white/45 leading-relaxed bg-white/[0.02] border border-white/6 rounded-lg p-3">
										{expandedAgent.iconPrompt}
									</p>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

			</main>
		</div>
	);
}
