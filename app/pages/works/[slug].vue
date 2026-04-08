<script setup lang="ts">
import type { WorkItem } from '~/types/work'

definePageMeta({
  title: 'Work Detail',
  validate: (route) => typeof route.params.slug === 'string' && route.params.slug.length > 0
})

const route = useRoute()
const { getWorkBySlug, loading } = useWorks()

const work = ref<WorkItem | null>(null)

onMounted(async () => {
  const slug = String(route.params.slug)
  work.value = await getWorkBySlug(slug)

  if (!work.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Work not found'
    })
  }
})
</script>

<template>
  <section class="space-y-6">
    <p class="text-xs font-semibold uppercase tracking-wider text-blue-600">Work Detail</p>

    <p v-if="loading" class="text-slate-500 dark:text-slate-400">Loading work...</p>

    <article
      v-else-if="work"
      class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/70"
    >
      <h1 class="text-3xl font-bold">{{ work.title }}</h1>
      <p class="mt-2 text-slate-600 dark:text-slate-300">{{ work.summary }}</p>
      <p class="mt-4 leading-7 text-slate-700 dark:text-slate-200">{{ work.content }}</p>
      <NuxtLink
        to="/works"
        class="mt-6 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        Back to Works
      </NuxtLink>
    </article>
  </section>
</template>
