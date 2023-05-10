<script lang="ts">
  import type { PageServerData } from './$types'

  import CopyLink from '$lib/components/copy-link.svelte'
  import MessageChild from '$lib/components/message-child.svelte'
  import { invalidate } from '$app/navigation'

  export let data: PageServerData
  $: ({ user, streamed } = data)

  function refreshMessages() {
    invalidate('messages')
  }
</script>

<div class="mx-auto max-w-md text-center flex flex-col space-y-10">
  <div class="flex justify-center items-center mt-10">
    <p class="font-semibold text-3xl">{user.username}</p>
  </div>
  <CopyLink link="{user.link}" />
  <div class="flex flex-col bg-brand-white bg-opacity-5 rounded-lg p-5">
    <div class="flex justify-between mb-5 py-5">
      <p class="font-semibold">Your messages</p>
      <button
        class="i-lucide:refresh-ccw"
        on:click="{refreshMessages}"></button>
    </div>
    {#await streamed.messages}
      <div class="py-10">
        <span class="i-lucide:loader-2 h-5 w-5 animate-spin"></span>
      </div>
    {:then messages}
      <div class="flex flex-col w-full space-y-10">
        {#if messages.length === 0}
          <p class="text-brand-white text-opacity-60 font-italic">
            No messages yet
          </p>
        {/if}
        {#each messages as message}
          <MessageChild message="{message}" />
        {/each}
      </div>
    {/await}
  </div>
</div>
