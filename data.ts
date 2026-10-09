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
    display: 'specter',
    link: 'https://github.com/tuquet/cli',
    color: colors.cli,
    x: 0,
    y: 0,
  },
  {
    name: 'tuquet/runner',
    display: 'runner',
    link: 'https://github.com/tuquet/runner',
    color: colors.runner,
    from: [{ name: 'tuquet/cli', label: 'Spawn' }],
  },
  {
    name: 'tuquet/automa',
    display: 'automa',
    link: 'https://github.com/tuquet/automa',
    color: colors.automa,
    from: [{ name: 'tuquet/cli', label: 'Launch' }],
  },
  {
    name: 'tuquet/browser',
    display: 'browser',
    link: 'https://github.com/tuquet/browser',
    color: colors.browser,
    from: [
      { name: 'tuquet/automa', label: 'CDP' },
      { name: 'tuquet/cli', label: 'Proxy' }
    ],
  },
  {
    name: 'tuquet/cloud',
    display: 'cloud',
    link: 'https://github.com/tuquet/cloud',
    color: colors.cloud,
    from: [{ name: 'tuquet/cli', label: 'Telemetry' }],
  },
  {
    name: 'tuquet/bot',
    display: 'bot',
    link: 'https://github.com/tuquet/bot',
    color: colors.telegram,
    from: [{ name: 'tuquet/cloud', label: 'Webhooks' }],
  },
  {
    name: 'tuquet/lib',
    display: '@tuquet/lib',
    link: 'https://github.com/tuquet/lib',
    color: colors.lib,
    from: [{ name: 'tuquet/automa', label: 'Consumes' }, { name: 'tuquet/cli', label: 'Scaffolds' }],
  },
  {
    name: 'tuquet/claude-agy',
    display: 'claude-agy',
    link: 'https://github.com/tuquet/claude-agy',
    color: colors.claude,
    from: [{ name: 'tuquet/cli', label: 'MCP' }],
  },
  {
    name: 'tuquet/faker',
    display: 'faker',
    link: 'https://github.com/tuquet/faker',
    color: colors.tauri,
    from: [{ name: 'tuquet/cli', label: 'Spawn' }],
  },
  {
    name: 'tuquet/skills',
    display: 'skills',
    link: 'https://github.com/tuquet/skills',
    color: colors.claude,
    from: [{ name: 'tuquet/cli', label: 'Runbooks' }],
  },
  {
    name: 'tuquet/storage',
    display: 'storage',
    link: 'https://github.com/tuquet/storage',
    color: colors.cloud,
    from: [
      { name: 'tuquet/cli', label: 'Assets' },
      { name: 'tuquet/browser', label: 'Sync Profiles' },
    ],
  },
]

export const secondary: ProjectNode[] = [
  {
    name: 'tuquet/vue-ui',
    display: 'vue-ui',
    link: 'https://github.com/tuquet/lib/tree/main/packages/vue-ui',
    color: colors.lib,
    from: ['tuquet/lib'],
  },
  {
    name: 'tuquet/vue-table',
    display: 'vue-table',
    link: 'https://github.com/tuquet/lib/tree/main/packages/vue-table',
    color: colors.lib,
    from: ['tuquet/lib'],
  },
  {
    name: 'tuquet/md-export',
    display: 'md-export',
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
    display: 'lunar',
    link: 'https://github.com/tuquet/lib/tree/main/packages/lunar',
    color: colors.claude,
    from: ['tuquet/lib'],
  },
  {
    name: 'tuquet/scoop-bucket',
    display: 'scoop-bucket',
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
