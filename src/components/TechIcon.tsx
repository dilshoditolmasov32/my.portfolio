import type { ReactNode } from 'react'
import {
  siAxios, siBootstrap, siCss, siDjango, siDocker, siEslint, siExpo, siFigma, siFirebase, siFormik, siGit,
  siGithub, siGitlab, siHtml5, siJavascript, siMui, siNextdotjs, siNpm, siNuxt, siPinia, siPnpm, siPostgresql,
  siPrettier, siPrisma, siPython, siReact, siReactquery, siSass, siSupabase, siTailwindcss, siThreedotjs,
  siTypescript, siVite, siVuedotjs, siWebpack, siZod,
  type SimpleIcon,
} from 'simple-icons'

// Brand marks, keyed by the technology name used in data/portfolio.ts
const BRAND: Record<string, SimpleIcon> = {
  HTML5: siHtml5,
  CSS3: siCss,
  'Sass/SCSS': siSass,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  'Next.js': siNextdotjs,
  'Vue 3': siVuedotjs,
  'Nuxt.js': siNuxt,
  Pinia: siPinia,
  'Tailwind CSS': siTailwindcss,
  'Material UI': siMui,
  Bootstrap: siBootstrap,
  'React Native': siReact,
  Expo: siExpo,
  'Three.js': siThreedotjs,
  Axios: siAxios,
  'TanStack Query': siReactquery,
  Formik: siFormik,
  Zod: siZod,
  Python: siPython,
  Django: siDjango,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  Firebase: siFirebase,
  Supabase: siSupabase,
  Git: siGit,
  GitHub: siGithub,
  GitLab: siGitlab,
  Docker: siDocker,
  Vite: siVite,
  Webpack: siWebpack,
  npm: siNpm,
  pnpm: siPnpm,
  ESLint: siEslint,
  Prettier: siPrettier,
  Figma: siFigma,
}

// Line icons for technologies that have no brand mark in simple-icons
const LINE: Record<string, ReactNode> = {
  'Vue Router': (
    <>
      <circle cx="6" cy="5" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M6 7.5v4a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v-.5" />
    </>
  ),
  'Element Plus': (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <path d="M17 13v8M13 17h8" />
    </>
  ),
  WebXR: (
    <>
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3.5l-1.5-2.5h-4L8.5 17H5a2 2 0 0 1-2-2z" />
      <circle cx="8" cy="12" r="1" />
      <circle cx="16" cy="12" r="1" />
    </>
  ),
  MindAR: (
    <>
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <path d="m12 8 4 2.3v4.4L12 17l-4-2.3v-4.4z" />
    </>
  ),
  'REST API': (
    <>
      <path d="M4 8h14m-4-4 4 4-4 4" />
      <path d="M20 16H6m4-4-4 4 4 4" />
    </>
  ),
}

export function TechIcon({ name, size = 26 }: { name: string; size?: number }) {
  const brand = BRAND[name]
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
        <path d={brand.path} />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' }}
    >
      {LINE[name]}
    </svg>
  )
}
