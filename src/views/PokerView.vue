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
  <div v-if="store.CurrentSession != undefined" class="p-10">
    <div class="flex md:flex-row flex-col items-center">
      <div>
        <router-link to="/">
           <img src="/pointerpokerlogo.png" class="w-60 cursor-pointer"/>
        </router-link>
      </div>
          
   
      <h1 class="text-4xl font-bold text-center p-12 flex-grow">{{ store.CurrentSession?.SessionName }}</h1>

      <div class="">
        <div class="bg-blue-400 p-5 rounded-lg">
          <div class="">
            <span class="font-bold">Session Link:</span>
            <input class="w-full" readonly :value="getSessionUrl()"/>
          </div>
          <button @click=" copyToClipBoard" class="bg-orange-500 rounded-md text-md p-2 font-bold">Copy Link</button>
          <p id="ctc-text" hidden>Copied to Clipboard!</p>
        </div>
      </div>
    </div>

      <div class="flex lg:flex-row flex-col gap-6 lg:gap-0">
        <div class="lg:w-[20%] "></div>
        <div class="lg:w-[60%] flex flex-row gap-2 justify-center flex-wrap">
            <PlayerCard v-bind:key="player.UserId" v-for="player in store.CurrentSession?.SessionUsers.filter(x=> !x.IsSpectator)" :name="player.UserName" :vote="player.Vote" :showCard="store.CurrentUser?.ShowCards"/>
        </div>
        <div class="lg:w-[20%] pr-10 flex">
          <div class=" border-red-50 w-full">

            <PlayerList class="hidden lg:block"/>

            <div v-if="store.CurrentUser?.IsSpectator == false" class="lg:justify-end justify-center flex pb-10">
              <button class="text-blue-400 border-2 rounded-md p-1 pl-5 pr-5 border-blue-400 font-bold hover:bg-blue-400 hover:text-white" @click="revealCards" :disabled="store.CurrentUser?.ShowCards == true">Reveal Vote</button>
              <button class="bg-red-400 text-white border-2 rounded-md p-1 pl-5 pr-5 hover:bg-white hover:text-red-400 hover:border-red-400" @click="resetVote" :disabled="store.CurrentUser?.ShowCards == false">Reset Vote</button>
            </div>

          </div>
          
        </div>
        
      </div>

      <CardSelection v-if="store.CurrentUser?.IsSpectator == false" :cards="['0','1/2','1','2','3','5','8','13','20','40','100','?']" class="self-center w-full"/>
      
      <div class="flex flex-col h-[25%]">
        <div v-show="store.CurrentSession.SessionUsers.filter(x=> !x.IsSpectator && (x.Vote == undefined || x.Vote == '')).length > 0 " class="text-black border-2 self-center p-10 bg-blue-100 rounded-lg mb-10 mt-10 ">
                Waiting for all players to vote...
        </div>
      </div>
    </div>

    <div v-if="store.CurrentSession == undefined && url.includes('poker?session=')" class="justify-center h-full items-center flex">
        <JoinSession class="w-[400px]" />
    </div>
    <div v-if="!url.includes('poker?session=')">
        <h1>Invalid Session URL</h1>
    </div>

</template>