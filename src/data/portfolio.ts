// All portfolio content lives here — edit this file only.

export type IconName = 'github' | 'gitlab' | 'linkedin' | 'telegram' | 'instagram'

export interface Social {
  label: string
  handle: string
  href: string
  icon: IconName
}
export interface Project {
  name: string
  category: string
  description: string
  stack: string[]
  image?: string
  liveUrl?: string
  sourceUrl?: string // missing → dashed "[ Add … ]" placeholder
}
export interface SkillGroup {
  category: string
  code: string
  items: string[]
}
export interface Milestone {
  period: string
  /** company, school or institution */
  org: string
  /** the position held, or the degree/programme */
  position?: string
}
export interface Contact {
  label: string
  value: string
  href: string
}

export const SOCIALS: Social[] = [
  { label: 'GitHub', handle: 'dilshoditolmasov32', href: 'https://github.com/dilshoditolmasov32', icon: 'github' },
  { label: 'GitLab', handle: 'Dilshodbek04', href: 'https://gitlab.com/Dilshodbek04', icon: 'gitlab' },
  {
    label: 'LinkedIn',
    handle: 'in/dilshodbek-itolmasov',
    href: 'https://www.linkedin.com/in/dilshodbek-itolmasov-447020274',
    icon: 'linkedin',
  },
  { label: 'Telegram', handle: '@dasturchi_dilshodbek', href: 'https://t.me/dasturchi_dilshodbek', icon: 'telegram' },
  {
    label: 'Instagram',
    handle: '@developer_dilshodbek',
    href: 'https://www.instagram.com/developer_dilshodbek/',
    icon: 'instagram',
  },
]

export const EMAIL = 'dilshoditolmasov32@gmail.com'

export const PROJECTS: Project[] = [
  {
    name: 'Microfinance.uz',
    category: 'Fintech platform',
    description:
      'A modern microfinance platform, built on Nuxt and Vue 3 with a fully typed TypeScript codebase and Tailwind CSS.',
    stack: ['Nuxt.js', 'Vue 3', 'TypeScript', 'Tailwind CSS'],
    image: '/assets/microfinance.uz.png',
    liveUrl: 'https://www.microfinance.uz',
  },
  {
    name: 'BRB Marketplace',
    category: 'E-commerce',
    description:
      'An online marketplace for a microfinance organisation with installment purchases — catalogue, search, favourites and cart.',
    stack: [],
    image: '/assets/microfinance-marketplace.png',
    liveUrl: 'https://brb-marketplace.vercel.app',
  },
  {
    name: 'Aura',
    category: 'Tourism portal',
    description:
      'A portal presenting Uzbekistan — media, national initiatives and destination search — in a bright, illustrated interface.',
    stack: [],
    image: '/assets/aura.png',
    liveUrl: 'https://aura-unicon-uz.vercel.app/home',
  },
  {
    name: 'TV-Tech',
    category: 'University faculty site',
    description:
      'The site of a television technologies faculty — programmes, news, a VR laboratory and an immersive 360° tour.',
    stack: [],
    image: '/assets/tatu-ttf.png',
    liveUrl: 'https://tuit-ttv.vercel.app/',
  },
  {
    name: 'BMS Admin Panel',
    category: 'Admin dashboard',
    description:
      'A dashboard for managing organisations, plans, reports, inventory, users and notifications, with status workflows and exports.',
    stack: [],
    image: '/assets/bms.png',
    liveUrl: 'https://bms-admin-panel-three.vercel.app/login',
  },
]
export const CORE = ['TypeScript', 'React', 'Next.js', 'Vue 3', 'Nuxt.js']

export const SKILLS: SkillGroup[] = [
  {
    category: 'Frontend',
    code: 'FE',
    items: [
      'HTML5', 'CSS3', 'Sass/SCSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue 3', 'Nuxt.js',
      'Pinia', 'Vue Router', 'Tailwind CSS', 'Material UI', 'Element Plus', 'Bootstrap',
    ],
  },
  { category: 'Mobile', code: 'MO', items: ['React Native', 'Expo'] },
  { category: '3D & XR', code: 'XR', items: ['Three.js', 'WebXR', 'MindAR'] },
  { category: 'Data & APIs', code: 'DA', items: ['REST API', 'Axios', 'TanStack Query', 'Formik', 'Zod'] },
  { category: 'Backend', code: 'BE', items: ['Python', 'Django', 'PostgreSQL', 'Prisma', 'Firebase', 'Supabase'] },
  {
    category: 'Tooling',
    code: 'TL',
    items: ['Git', 'GitHub', 'GitLab', 'Docker', 'Vite', 'Webpack', 'npm', 'pnpm', 'ESLint', 'Prettier', 'Figma'],
  },
]

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const
export type NavId = (typeof NAV)[number]['id']

export const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'journey', 'contact'] as const

export const STATEMENT =
  'I build modern, responsive web applications — and help other developers learn to build them too.'

export const ABOUT_FACTS = [
  { k: 'Name', v: 'Dilshodbek Itolmasov' },
  { k: 'Role', v: 'Frontend Developer & IT Mentor' },
  { k: 'Based in', v: 'Tashkent, Uzbekistan' },
  { k: 'Frameworks', v: 'React, Next.js, Vue 3, Nuxt' },
  { k: 'Languages', v: 'Uzbek, Russian, English' },
  { k: 'Beyond web', v: 'React Native, Three.js, WebXR, MindAR' },
]

export const PRINCIPLES = [
  {
    n: '01',
    t: 'Clean code',
    c: 'Typed, readable and reviewable. Components that do one job, and code the next developer can trust.',
  },
  {
    n: '02',
    t: 'Intuitive UI/UX',
    c: 'Interfaces that explain themselves — responsive by default, with detail and motion that serve a purpose.',
  },
  { n: '03', t: 'Real impact', c: 'Shipped for real domains: finance, commerce, tourism and education.' },
]

export const EXPERIENCE: Milestone[] = [
  {
    period: 'September 2026 – Present',
    org: 'Unicon.uz',
    position: 'Vue.js Intern',
  },
  {
    period: 'December 2025 – June 2026',
    org: 'Ministry of Economy and Finance of the Republic of Uzbekistan',
    position: 'Intern',
  },
  {
    period: 'October 2025 – Present',
    org: 'STEM IT School',
    position: 'Frontend Mentor',
  },
  {
    period: 'February 2025 – September 2025',
    org: 'Webcoder School',
    position: 'Frontend React.js Intern',
  },
]

export const EDUCATION: Milestone[] = [
  {
    period: 'September 2022 – 2026',
    org: 'Tashkent University of Information Technologies (TUIT)',
    position: 'Bachelor’s degree in Audiovisual Technologies',
  },
  {
    period: 'September 2023 – August 2024',
    org: 'Najot Ta’lim',
    position: 'Frontend React.js course',
  },
]

export const CONTACTS: Contact[] = [
  { label: 'Telegram', value: '@dasturchi_dilshodbek', href: SOCIALS[3].href },
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'LinkedIn', value: 'in/dilshodbek-itolmasov', href: SOCIALS[2].href },
  { label: 'GitHub', value: 'dilshoditolmasov32', href: SOCIALS[0].href },
  { label: 'GitLab', value: 'Dilshodbek04', href: SOCIALS[1].href },
  { label: 'Instagram', value: '@developer_dilshodbek', href: SOCIALS[4].href },
]
