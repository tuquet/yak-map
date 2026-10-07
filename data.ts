import type { Node } from 'vis-network'
import poisitions from './yak-map-pos.json'

export interface Connection {
  name: string
  label?: string
}

export interface ProjectNode extends Partial<Node> {
  name: string
  display?: string
  link: string
  color?: string
  dashed?: boolean
  faded?: boolean
  from?: (string | Connection)[]
  deps?: string[]
  animateStop?: boolean
}

const colors = {
  cli: '#3b82f6',
  runner: '#ef4444',
  automa: '#f59e0b',
  browser: '#f97316',
  cloud: '#10b981',
  telegram: '#14b8a6',
  lib: '#06b6d4',
  claude: '#8b5cf6',
  tauri: '#3b82f6',
}

export const primary: ProjectNode[] = [
  {
    name: 'tuquet/cli',
    display: 'tuquet (Master CLI & MCP)',
    link: 'https://github.com/tuquet/cli',
    color: colors.cli,
    x: 0,
    y: 0,
  },
  {
    name: 'tuquet/runner',
    display: 'runner (Rust Engine)',
    link: 'https://github.com/tuquet/runner',
    color: colors.runner,
    from: [{ name: 'tuquet/cli', label: 'Spawn (gRPC/Stdio)' }],
  },
  {
    name: 'tuquet/automa',
    display: 'tuquet/automa (Web Studio)',
    link: 'https://github.com/tuquet/automa',
    color: colors.automa,
    from: [{ name: 'tuquet/cli', label: 'Local API/Launch' }],
  },
  {
    name: 'tuquet/browser',
    display: 'tuquet-browser (Sandbox)',
    link: 'https://github.com/tuquet/browser',
    color: colors.browser,
    from: [
      { name: 'tuquet/automa', label: 'CDP (Puppeteer)' },
      { name: 'tuquet/cli', label: 'Launch/Proxy' }
    ],
  },
  {
    name: 'tuquet/cloud',
    display: 'tuquet-cloud (Supabase)',
    link: 'https://github.com/tuquet/cloud',
    color: colors.cloud,
    from: [{ name: 'tuquet/cli', label: 'DB Push/Pull' }],
  },
  {
    name: 'tuquet/bot',
    display: 'bot (Telegram Ops)',
    link: 'https://github.com/tuquet/bot',
    color: colors.telegram,
    from: [{ name: 'tuquet/cloud', label: 'Edge Webhooks' }],
  },
  {
    name: 'tuquet/lib',
    display: '@tuquet/lib (Vue 3 UI & Primitives)',
    link: 'https://github.com/tuquet/lib',
    color: colors.lib,
    from: [{ name: 'tuquet/automa', label: 'Consumes' }, { name: 'tuquet/cli', label: 'Scaffolds' }],
  },
  {
    name: 'tuquet/claude-agy',
    display: 'claude-agy (Claude + AGY)',
    link: 'https://github.com/tuquet/claude-agy',
    color: colors.claude,
    from: [{ name: 'tuquet/cli', label: 'MCP Protocol' }],
  },
  {
    name: 'tuquet/faker',
    display: 'faker (Synthetic Identity)',
    link: 'https://github.com/tuquet/faker',
    color: colors.tauri,
    from: [{ name: 'tuquet/cli', label: 'Spawn (Tauri/SQLite)' }],
  },
  {
    name: 'tuquet/skills',
    display: 'skills (AI Agent Runbooks)',
    link: 'https://github.com/tuquet/skills',
    color: colors.claude,
    from: [{ name: 'tuquet/cli', label: 'Reads & Executes' }],
  },
]

export const secondary: ProjectNode[] = [
  {
    name: 'tuquet/vue-ui',
    display: 'vue-ui (Shadcn + Reka)',
    link: 'https://github.com/tuquet/lib/tree/main/packages/vue-ui',
    color: colors.lib,
    from: ['tuquet/lib'],
  },
  {
    name: 'tuquet/vue-table',
    display: 'vue-table (TanStack)',
    link: 'https://github.com/tuquet/lib/tree/main/packages/vue-table',
    color: colors.lib,
    from: ['tuquet/lib'],
  },
  {
    name: 'tuquet/md-export',
    display: 'md-export (Vector Exporter)',
    link: 'https://github.com/tuquet/lib/tree/main/packages/md-export',
    color: colors.lib,
    from: ['tuquet/lib'],
  },
  {
    name: 'tuquet/extension-runner',
    display: 'extension-runner',
    link: 'https://github.com/tuquet/lib/tree/main/packages/extension-runner',
    color: colors.automa,
    from: ['tuquet/automa'],
  },
  {
    name: 'tuquet/lunar',
    display: 'lunar (Can Chi & Solar)',
    link: 'https://github.com/tuquet/lib/tree/main/packages/lunar',
    color: colors.claude,
    from: ['tuquet/lib'],
  },
  {
    name: 'tuquet/scoop-bucket',
    display: 'scoop-bucket (Windows CLI)',
    link: 'https://github.com/tuquet/scoop-bucket',
    color: colors.cli,
    dashed: true,
    from: ['tuquet/cli'],
  },
]

secondary.forEach((p, idx) => {
  p.faded = true
  if (idx)
    p.animateStop = false
})

export const all = [
  ...primary,
  ...secondary,
]

for (const [id, pos] of Object.entries(poisitions) as [string, { x: number, y: number }][]) {
  if (!pos)
    continue
  const project = all.find(p => p.name === id)
  if (project)
    Object.assign(project, pos)
}

export {
  poisitions,
}
