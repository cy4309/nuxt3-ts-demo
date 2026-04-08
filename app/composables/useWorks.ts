import type { WorkItem } from '~/types/work'

const MOCK_WORKS: WorkItem[] = [
  {
    slug: 'nuxt-portfolio',
    title: 'Nuxt Portfolio',
    summary: 'A personal portfolio built with Nuxt 3 and SSR.',
    content: 'This project focuses on fast rendering, SEO, and clean component architecture.'
  },
  {
    slug: 'dashboard-ui',
    title: 'Dashboard UI',
    summary: 'Admin dashboard with charts and modular widgets.',
    content: 'It includes reusable UI blocks and an extendable design token system.'
  },
  {
    slug: 'headless-blog',
    title: 'Headless Blog',
    summary: 'A content-driven blog using composables and API integration.',
    content: 'The app uses composables for data orchestration and lightweight caching.'
  }
]

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export const useWorks = () => {
  const loading = useState<boolean>('works-loading', () => false)

  const getAllWorks = async (): Promise<WorkItem[]> => {
    loading.value = true
    try {
      await wait(400)
      return [...MOCK_WORKS]
    } finally {
      loading.value = false
    }
  }

  const getWorkBySlug = async (slug: string): Promise<WorkItem | null> => {
    loading.value = true
    try {
      await wait(400)
      return MOCK_WORKS.find((work) => work.slug === slug) ?? null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    getAllWorks,
    getWorkBySlug
  }
}
