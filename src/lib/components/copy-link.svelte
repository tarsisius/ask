<script lang="ts">
  import Icon from '@iconify/svelte'
  import { addToast } from '$lib/store'

  export let link: string
  let copied = false

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    addToast('Copied to clipboard', 'success')
    copied = true
  }
</script>

<div
  class="flex justify-between items-center w-full bg-brand-white bg-opacity-5 rounded-lg mb-5 py-2 px-5">
  <input
    class="font-light bg-transparent w-full focus:outline-none"
    type="text"
    value="{link}"
    readonly />
  <button
    class="flex items-center justify-center py-1 px-1 bg-transparent"
    on:click="{handleCopy}">
    {#if copied}
      <Icon icon="lucide:clipboard-check" />
    {:else}
      <Icon icon="lucide:clipboard-copy" />
    {/if}
  </button>
</div>
