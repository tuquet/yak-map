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
    from: [{ name: 'tuquet/cli', label: 'Orchestrates' }],
  },
  {
    name: 'tuquet/automa',
    display: 'automa',
    link: 'https://github.com/tuquet/automa',
    color: colors.automa,
    from: [
      { name: 'tuquet/cli', label: 'Runs Workflow' },
      { name: 'tuquet/extension-runner', label: 'Extension Polyfill' },
    ],
  },
  {
    name: 'tuquet/browser',
    display: 'browser',
    link: 'https://github.com/tuquet/browser',
    color: colors.browser,
    from: [
      { name: 'tuquet/runner', label: 'Drives Session' },
      { name: 'tuquet/automa', label: 'CDP Control' },
      { name: 'tuquet/cli', label: 'SOCKS5 Tunnel' },
    ],
  },
  {
    name: 'tuquet/cloud',
    display: 'cloud',
    link: 'https://github.com/tuquet/cloud',
    color: colors.cloud,
    from: [{ name: 'tuquet/cli', label: 'Fleet Sync' }],
  },
  {
    name: 'tuquet/bot',
    display: 'bot',
    link: 'https://github.com/tuquet/bot',
    color: colors.telegram,
    from: [
      { name: 'tuquet/cloud', label: 'Event Webhook' },
      { name: 'tuquet/cli', label: 'ChatOps Control' },
    ],
  },
  {
    name: 'tuquet/lib',
    display: '@tuquet/lib',
    link: 'https://github.com/tuquet/lib',
    color: colors.lib,
    from: [{ name: 'tuquet/automa', label: 'Imports Core' }, { name: 'tuquet/cli', label: 'Scaffolding' }],
  },
  {
    name: 'tuquet/faker',
    display: 'faker',
    link: 'https://github.com/tuquet/faker',
    color: colors.tauri,
    from: [{ name: 'tuquet/cli', label: 'Embeds Engine' }],
  },
  {
    name: 'tuquet/skills',
    display: 'skills',
    link: 'https://github.com/tuquet/skills',
    color: colors.claude,
    from: [{ name: 'tuquet/cli', label: 'Skill Registry' }],
  },
  {
    name: 'tuquet/storage',
    display: 'storage',
    link: 'https://github.com/tuquet/storage',
    color: colors.cloud,
    from: [
      { name: 'tuquet/cli', label: 'Asset Storage' },
      { name: 'tuquet/browser', label: 'Profile Sync' },
    ],
  },
]

export const secondary: ProjectNode[] = [
  {
    name: 'tuquet/vue-ui',
    display: 'vue-ui',
    link: 'https://github.com/tuquet/lib/tree/main/packages/vue-ui',
    color: colors.lib,
    from: [{ name: 'tuquet/lib', label: 'UI Primitives' }],
  },
  {
    name: 'tuquet/vue-table',
    display: 'vue-table',
    link: 'https://github.com/tuquet/lib/tree/main/packages/vue-table',
    color: colors.lib,
    from: [
      { name: 'tuquet/lib', label: 'Workspace Package' },
      { name: 'tuquet/vue-ui', label: 'Consumes UI' },
    ],
  },
  {
    name: 'tuquet/md-export',
    display: 'md-export',
    link: 'https://github.com/tuquet/lib/tree/main/packages/md-export',
    color: colors.lib,
    from: [{ name: 'tuquet/lib', label: 'Workspace Package' }],
  },
  {
    name: 'tuquet/extension-runner',
    display: 'extension-runner',
    link: 'https://github.com/tuquet/lib/tree/main/packages/extension-runner',
    color: colors.automa,
    from: [
      { name: 'tuquet/lib', label: 'Workspace Package' },
      { name: 'tuquet/automa', label: 'Extension Polyfill' },
    ],
  },
  {
    name: 'tuquet/lunar',
    display: 'lunar',
    link: 'https://github.com/tuquet/lib/tree/main/packages/lunar',
    color: colors.claude,
    from: [{ name: 'tuquet/lib', label: 'Workspace Package' }],
  },
  {
    name: 'tuquet/scoop-bucket',
    display: 'scoop-bucket',
    link: 'https://github.com/tuquet/scoop-bucket',
    color: colors.cli,
    dashed: true,
    from: [{ name: 'tuquet/cli', label: 'Distribution' }],
  },
]

secondary.forEach((p, idx) => {
  p.faded = false
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
