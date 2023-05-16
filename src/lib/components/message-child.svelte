<script lang="ts">
  import { enhance, type SubmitFunction } from '$app/forms'
  import { invalidate } from '$app/navigation'
  import Icon from '@iconify/svelte'
  import { addToast } from '$lib/store'
  import { formatTime } from '$lib/utils'

  export let message: {
    id: string
    text: string
    opened: boolean
    created_at: Date
  }

  let menu = false

  const handleMenu = () => {
    menu = !menu
  }

  let openLoading = false
  let opened = message.opened

  const handleOpen: SubmitFunction = () => {
    openLoading = true
    return async ({ result, form }) => {
      if (result.type === 'success') {
        form.reset()
        openLoading = false
        opened = !opened
      }
      if (result.type === 'failure') {
        addToast(
          'Fail to open cause internal error, please contact developer!',
          'error'
        )
        openLoading = false
      }
    }
  }

  let deleteLoading = false

  const handleDelete: SubmitFunction = () => {
    deleteLoading = true
    return async ({ result, form }) => {
      if (result.type === 'success') {
        form.reset()
        invalidate('messages')
        addToast('Delete success', 'success')
        deleteLoading = false
      }
      if (result.type === 'failure') {
        addToast(
          'Fail to open cause internal error, please contact developer!',
          'error'
        )
        deleteLoading = false
      }
    }
  }
</script>

<div
  class="flex flex-col space-y-4 w-full py-2 border-b border-brand-white border-opacity-20">
  <div class="flex justify-between items-center">
    <p
      class="flex justify-start text-xs font-italic text-brand-white text-opacity-50">
      {formatTime(message.created_at)}
    </p>
    <div class="flex items-center space-x-4">
      {#if !opened}
        <form
          method="post"
          action="?/open"
          use:enhance="{handleOpen}">
          <input
            type="hidden"
            name="id"
            value="{message.id}" />
          <button
            class="flex justify-center items-center space-x-1 bg-transparent">
            <Icon icon="lucide:eye" />
            <p>open</p>
          </button>
        </form>
      {/if}
      <div class="relative text-left">
        <button
          class="flex items-center"
          on:click="{handleMenu}">
          <Icon icon="lucide:more-horizontal" />
        </button>
        {#if menu}
          <div
            class="absolute right-0 z-10 mt-2 origin-top-right bg-brand-black rounded-lg shadow-lg overflow-hidden"
            tabindex="-1">
            <div class="py-1 bg-brand-white bg-opacity-10 text-brand-white">
              <form
                method="POST"
                action="?/delete"
                class="flex"
                use:enhance="{handleDelete}">
                <input
                  type="hidden"
                  name="id"
                  value="{message.id}" />
                <button
                  class="px-4 py-2 hover:bg-brand-black hover:bg-opacity-20"
                  tabindex="-1">
                  {#if deleteLoading}
                    <Icon
                      icon="lucide:loader-2"
                      class="animate-spin" />
                  {:else}
                    Delete
                  {/if}
                </button>
              </form>
              <form
                method="POST"
                action="#"
                class="flex">
                <input
                  type="hidden"
                  name="id"
                  value="{message.id}" />
                <button
                  class="px-4 py-2 hover:bg-brand-black hover:bg-opacity-20"
                  tabindex="-1">
                  Share
                </button>
              </form>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="flex flex-col justify-center space-y-2">
    {#if openLoading}
      <div class="flex justify-center items-center">
        <Icon
          icon="lucide:loader-2"
          class="animate-spin" />
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
