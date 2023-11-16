<script setup lang="ts">

  import CardSelection from '../components/CardSelection.vue'
  import PlayerCard from '../components/PlayerCard.vue'
  import JoinSession from '../components/JoinSession.vue';
  import { ref} from 'vue'
  import { store } from '@/store'
  import router from '@/router';
  
  const url = ref(window.location.href);

  if(!url.value.includes('poker?session=')) {
    router.push('/');
  }

  const showCards = ref(false);

  function revealCards(){
    showCards.value = true
  }

  function resetVote(){
    showCards.value = false
  }

  function getSessionUrl() {
    return window.location.href;
  }
  

</script>

<template>
  <div class="h-screen">
    <div v-if="store.CurrentSession != undefined" class="flex flex-col h-[100%] justify-between">
      <h1 class="text-4xl font-bold self-center mt-10">{{ store.CurrentSession?.SessionName }}</h1>
      <div class="bg-blue-500 w-[300px] absolute p-5 rounded-lg self-end mr-10 mt-10 flex flex-col">
        <div class="text-white flex flex-col gap-3">
          <div class="flex flex-col">
            <span class="font-bold">Session Link:</span>
            <input class="text-black rounded-md border-2" readonly :value="getSessionUrl()"/>
          </div>
          <button class="bg-blue-100 text-black font-semibold p-1 rounded-lg">Copy Link</button>
        </div>
      </div>
        <div class="flex flex-col self-center gap-12 mt-[9%]">
          <div v-if="store.CurrentSession.SessionUsers.filter(x=> x.Vote == undefined || x.Vote == '').length > 0 " class="text-black border-2 self-center p-10 bg-blue-100 rounded-lg">
            Waiting for players to vote...
          </div>
            <div class="flex items-center justify-center flex-wrap gap-4">
              <PlayerCard v-bind:key="player.UserId" v-for="player in store.CurrentSession?.SessionUsers" :name="player.UserName" :vote="player.Vote" :showCard="showCards"/>
            </div>
        </div>


        <CardSelection :cards="['0.5','1','2','4','8','13','?']" class="self-center mt-auto mb-20"/>

        <div class="flex gap-6 self-center mb-20">
          <button class="text-blue-400 border-2 rounded-md p-1 pl-5 pr-5 border-blue-400 font-bold hover:bg-blue-400 hover:text-white" @click="revealCards">Reveal Cards</button>
          <button class="bg-red-400 text-white border-2 rounded-md p-1 pl-5 pr-5 hover:bg-white hover:text-red-400 hover:border-red-400" @click="resetVote">Reset Cards</button>
        </div>
    </div>

    <div v-if="store.CurrentSession == undefined && url.includes('poker?session=')" class="flex flex-row min-h-screen justify-center items-center">
        <JoinSession class="w-[400px]" />
    </div>
    <div v-if="!url.includes('poker?session=')" class="flex flex-row min-h-screen justify-center items-center">
        <h1>Invalid Session URL</h1>
    </div>
  </div>
</template>