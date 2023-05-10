<script lang="ts">
  import { enhance, type SubmitFunction } from '$app/forms'
  import { addToast } from '$lib/store'
  import { formatTime } from '$lib/utils'

  export let message: {
    id: string
    text: string
    opened: boolean
    created_at: Date
  }

  let loading = false
  let opened = message.opened
  
  const handle: SubmitFunction = () => {
    loading = true
    return async ({ result, form }) => {
      if (result.type === 'success') {
        form.reset()
        loading = false
        opened = !opened
      }
      if (result.type === 'failure') {
        addToast(
          'Fail to open cause internal error, please contact developer!',
          'error'
        )
        loading = false
      }
    }
  }
</script>

<div
  class="flex flex-col space-y-4 w-full py-2 border-b border-brand-white border-opacity-20">
  <div class="flex justify-between">
    <p
      class="flex justify-start text-xs font-italic text-brand-white text-opacity-50">
      {formatTime(message.created_at)}
    </p>
    <div class="flex items-center space-x-4">
      {#if !opened}
        <form
          method="post"
          action="?/open"
          use:enhance="{handle}">
          <input
            type="hidden"
            name="id"
            value="{message.id}" />
          <button
            class="flex justify-center items-center space-x-1 bg-transparent">
            <span class="i-lucide:eye"></span>
            <p>open</p>
          </button>
        </form>
      {/if}
      <span class="i-lucide:more-horizontal flex-none"></span>
    </div>
  </div>
  <div class="flex flex-col justify-center space-y-2">
    {#if loading}
      <div class="flex justify-center items-center">
        <span class="i-lucide:loader-2 animate-spin"></span>
      </div>
    {:else if !opened}
      <p class="text-justify text-brand-white text-opacity-80 font-italic">
        This is an anonymous message. Open it to see the content.
      </p>
    {:else}
      <p class="text-justify text-brand-white text-opacity-90">
        {message.text}
      </p>
    {/if}
  </div>
</div>
