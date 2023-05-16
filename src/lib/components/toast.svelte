<script lang="ts">
  import Icon from '@iconify/svelte'
  import { toasts } from '$lib/store'

  function define(type: string) {
    let icon: string
    switch (type) {
      case 'success':
        icon = 'lucide:check-circle-2'
        break
      case 'error':
        icon = 'lucide:alert-circle'
        break
      default:
        icon = 'lucide:check-circle-2'
        break
    }
    return { icon }
  }
</script>

{#if $toasts}
  <div
    class="fixed top-4 right-1/2 z-30 translate-x-1/2 space-y-2 sm:top-8 sm:right-8 sm:translate-x-0">
    {#each $toasts as { id, text, type } (id)}
      <div class="rounded-md bg-brand-black overflow-hidden">
        <div
          class="flex items-center space-x-2 py-2 px-4 bg-brand-white bg-opacity-5">
          <Icon
            icon="{define(type).icon}"
            class="h-5 w-5" />
          <p>{text}</p>
        </div>
      </div>
    {/each}
  </div>
{/if}
