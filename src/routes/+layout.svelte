<script lang="ts">
  import '../app.postcss'
  import '@fontsource/albert-sans'
  import Toast from '$lib/components/toast.svelte'
</script>

<svelte:head>
  <title>Ask</title>
  <meta
    name="description"
    content="Mantab kan." />
</svelte:head>

<Toast />
<body
  class="flex flex-col min-h-screen text-brand-white bg-brand-black">
  <main class="px-4">
    <slot />
  </main>
  <footer class="text-center mt-auto py-6 text-opacity-40">
    Project by{' '}
    <a
      class="hover:text-opacity-100"
      target="_blank"
      href="https://github.com/tarsisius"
      rel="noopener noreferrer">
      @tarsisius
    </a>
  </footer>
</body>
