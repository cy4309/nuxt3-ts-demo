<script setup lang="ts">
import type { WorkItem } from '~/types/work'

definePageMeta({
  title: 'Works'
})

const { getAllWorks, loading } = useWorks()

const works = ref<WorkItem[]>([])

onMounted(async () => {
  works.value = await getAllWorks()
})
</script>

<template>
  <section class="space-y-6">
    <div class="space-y-2">
      <p class="text-xs font-semibold uppercase tracking-wider text-blue-600">Works</p>
      <h1 class="text-3xl font-bold">All Works</h1>
    </div>

    <p v-if="loading" class="text-slate-500 dark:text-slate-400">Loading works...</p>

    <ul v-else class="grid gap-4">
      <li
        v-for="work in works"
        :key="work.slug"
        class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800/70"
      >
        <h2 class="text-lg font-semibold">{{ work.title }}</h2>
        <p class="mt-1 text-slate-600 dark:text-slate-300">{{ work.summary }}</p>
        <NuxtLink
          :to="`/works/${work.slug}`"
          class="mt-4 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View Detail
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
