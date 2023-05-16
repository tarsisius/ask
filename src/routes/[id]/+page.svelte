<script lang="ts">
  import { enhance, type SubmitFunction } from '$app/forms'
  import type { PageServerData } from './$types'
  import Icon from '@iconify/svelte'
  import { addToast } from '$lib/store'

  export let data: PageServerData

  let loading = false

  const handle: SubmitFunction = ({ form }) => {
    loading = true
    return async ({ result }) => {
      if (result.type === 'success') {
        loading = false
        addToast('Message send successfully', 'success')
        form.reset()
      }
      if (result.type === 'failure') {
        loading = false
        addToast('Internal error', 'error')
      }
    }
  }
</script>

<div class="mx-auto max-w-md text-center flex flex-col space-y-10">
  <div class="flex justify-center items-center mt-10">
    <p class="font-semibold text-2xl">
      Send anonymous message to {data.user.username}
    </p>
  </div>
  <form
    class="flex flex-col space-y-5 items-end"
    method="post"
    use:enhance="{handle}">
    <textarea
      class="bg-brand-white bg-opacity-5 rounded-lg focus:outline-none font-bold w-full p-5 min-h-20"
      name="text"
      required></textarea>
    <button
      class="flex items-center justify-center rounded-lg bg-brand-purple w-20 h-9">
      {#if loading}
        <Icon icon="lucide:loader-2" class="animate-spin"/>
      {:else}
        Send
      {/if}
    </button>
  </form>
</div>
