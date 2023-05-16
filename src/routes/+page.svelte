<script lang="ts">
  import { applyAction, enhance, type SubmitFunction } from '$app/forms'
  import Icon from '@iconify/svelte'
  import { addToast } from '$lib/store'

  let loading = false

  const handle: SubmitFunction = () => {
    loading = true
    return async ({ result, form }) => {
      if (result.type === 'redirect') {
        loading = false
        addToast('Success add new', 'success')
        form.reset()
        await applyAction(result)
      }
      if (result.type === 'failure') {
        loading = false
        addToast('Internal error', 'error')
      }
    }
  }
</script>

<div class="mx-auto max-w-md text-center py-10 flex flex-col space-y-10">
  <div class="flex justify-center items-center mt-10">
    <p class="font-semibold text-3xl">/Ask</p>
  </div>
  <form
    class="flex justify-center space-x-5"
    method="post"
    use:enhance="{handle}">
    <div
      class="bg-brand-white bg-opacity-5 rounded-lg flex justify-start items-center px-5">
      <input
        class="bg-transparent h-9 focus:outline-none font-bold w-full"
        type="text"
        name="name"
        autocomplete="off"
        placeholder="Enter your name"
        required />
    </div>
    <button
      class="flex items-center justify-center rounded-lg bg-brand-purple w-16">
      {#if loading}
        <Icon
          icon="lucide:loader-2"
          class="animate-spin" />
      {:else}
        Start
      {/if}
    </button>
  </form>
</div>
