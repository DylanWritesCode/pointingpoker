<script setup lang="ts">
  import { store } from '@/store'

</script>
<template>
    <div class="text-lg bg-slate-50 drop-shadow-lg flex flex-col gap-3 p-4">
      <h1 class="font-bold">Participants</h1>
      <div class="grid gap-2 p-4">
          <div class="grid grid-cols-2 border-b-2 border-opacity-10 border-black" v-for="player in store.CurrentSession?.SessionUsers"  v-bind:key="player.UserName">
              <span class="font-semibold">{{ player.UserName }}</span>
              <span v-if="player.IsSpectator" class="justify-self-end font-thin text-md italic">{{ player.IsSpectator ? "Spectator" : "" }}</span>
              <span v-if="!player.IsSpectator && (player.Vote == undefined || player.Vote == '')" class="justify-self-end font-thin text-3xl italic"></span>
              <span v-if="!player.IsSpectator && (player.Vote != undefined && player.Vote != '')" class="justify-self-end font-thin text-md italic">👍</span>
          </div>
      </div>
    </div>
</template>