<script setup lang="ts">

  import CardSelection from '../components/CardSelection.vue'
  import PlayerCard from '../components/PlayerCard.vue'
  import JoinSession from '../components/JoinSession.vue';
  import PlayerList from '../components/PlayerList.vue';

  import { ref } from 'vue'
  import { store } from '@/store'
  import router from '@/router';
  import game from '@/game';

  const url = ref(window.location.href);

  if(!url.value.includes('poker?session=')) {
    router.push('/');
  }

  function revealCards(){
    game.RevealCards();
  }

  function resetVote(){
    game.ResetVote();
  }

  function getSessionUrl() {
    return window.location.href;
  }
  
  function copyToClipBoard(){
    navigator.clipboard.writeText(window.location.href);

    const text = document.getElementById('ctc-text');

    if(text == undefined) return;
    text.hidden = false;

    setTimeout( () =>{
      text.hidden = true;
    },10000);
  }

</script>

<template>
  <div class="h-screen">
    <div v-if="store.CurrentSession != undefined" class="flex flex-col h-[100%] md:items-start items-center justify-between">
      <router-link to="/">
        <img src="/pointerpokerlogo.png" class="w-32 m-10 md:absolute cursor-pointer"/>
      </router-link>
      <div class="flex flex-col p-5 w-full md:mt-20">

        <h1 class="text-4xl font-bold self-center">{{ store.CurrentSession?.SessionName }}</h1>

        <div class="flex flex-col self-center lg:self-end justify-between p-5 lg:absolute md:top-0">
          <div class="bg-blue-500 w-[300px] p-5 rounded-lg md:flex flex-col hidden">
            <div class="text-white flex flex-col gap-3">
              <div class="flex flex-col">
                <span class="font-bold">Session Link:</span>
                <input class="text-black rounded-md border-2" readonly :value="getSessionUrl()"/>
              </div>
              <button class="bg-blue-100 text-black font-semibold p-1 rounded-lg" @click=" copyToClipBoard">Copy Link</button>
              <p class="text-xs font-bold" id="ctc-text" hidden>Copied to Clipboard!</p>
            </div>
          </div>
          <PlayerList class="mt-5" />

          <div class="flex gap-6 self-center mt-5" v-if="store.CurrentUser?.IsSpectator == false">
            <button class="text-blue-400 border-2 rounded-md p-1 pl-5 pr-5 border-blue-400 font-bold hover:bg-blue-400 hover:text-white" @click="revealCards" :disabled="store.CurrentUser?.ShowCards == true">Reveal Vote</button>
            <button class="bg-red-400 text-white border-2 rounded-md p-1 pl-5 pr-5 hover:bg-white hover:text-red-400 hover:border-red-400" @click="resetVote" :disabled="store.CurrentUser?.ShowCards == false">Reset Vote</button>
          </div>
          
        </div>
      </div>

        <div class="flex flex-col self-center">
            <div class="flex items-center justify-center flex-wrap gap-4">
              <PlayerCard v-bind:key="player.UserId" v-for="player in store.CurrentSession?.SessionUsers.filter(x=> !x.IsSpectator)" :name="player.UserName" :vote="player.Vote" :showCard="store.CurrentUser?.ShowCards"/>
            </div>
            <div v-show="store.CurrentSession.SessionUsers.filter(x=> !x.IsSpectator && (x.Vote == undefined || x.Vote == '')).length > 0 " class="text-black border-2 self-center p-10 bg-blue-100 rounded-lg mb-10 mt-10">
              Waiting for all players to vote...
            </div>
        </div>


        <CardSelection v-if="store.CurrentUser?.IsSpectator == false" :cards="['0','1/2','1','2','3','5','8','13','20','40','100','?']" class="self-center"/>
        <div class="flex justify-center items-center h-1/4" v-if="store.CurrentUser?.IsSpectator == true">
         
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