<script setup lang="ts">
    defineEmits(["test"]);

    defineProps({
        players: Array<{name:string, voted:boolean, vote:string}>,
        showCards:Boolean
    })

</script>
<template>
    <div class="text-lg bg-slate-50 drop-shadow-lg flex flex-col gap-1 w-80 p-4">
      <h1 class="font-bold">Participants</h1>
      <div class="grid gap-2 p-4">
          <div class="grid grid-cols-2 justify-between" v-for="player in players"  v-bind:key="player.name">
              <span class="font-semibold">{{ player.name }}</span>
              <span class="justify-self-end">{{ player.voted ? showCards ? player.vote : 'Voted' : '' }}</span>
          </div>
      </div>
    </div>
</template>