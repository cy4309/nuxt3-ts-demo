<script setup lang="ts">
const route = useRoute()
const { mode, toggleTheme } = useTheme()

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/works', label: 'Works' }
]

const isActive = (to: string) => {
  if (to === '/works') return route.path.startsWith('/works')
  return route.path === to
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
    <header class="border-b border-slate-200 bg-white/80 backdrop-blur transition-colors dark:border-slate-700 dark:bg-slate-900/80">
      <nav class="mx-auto flex max-w-4xl items-center gap-6 px-4 py-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-sm font-medium transition-colors"
          :class="
            isActive(item.to)
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          "
        >
          {{ item.label }}
        </NuxtLink>
        <button
          type="button"
          class="ml-auto rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          @click="toggleTheme"
        >
          {{ mode === 'dark' ? 'Light' : 'Dark' }} Mode
        </button>
      </nav>
    </header>
    <main class="mx-auto max-w-4xl px-4 py-10">
      <slot />
    </main>
  </div>
</template>
