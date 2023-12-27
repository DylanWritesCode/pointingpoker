<script setup lang="ts">
  import CreateSession from '../components/CreateSession.vue'
  import router from '../router';
  import { store } from '@/store';
  import { watch } from 'vue';

  function initiateSession (sessionGuid:string){
    router.push(`poker?session=${sessionGuid}`);
  }

  watch(() => store.CurrentSession, (newSession) => {
    if(newSession !=undefined){
      if(newSession.SessionId != undefined && newSession.SessionId != ""){
        initiateSession(newSession.SessionId);
      }
    }
  }, {deep: true});

</script>

<template>
    <div class="flex flex-col items-center h-full justify-center">
      <img src="/pointerpokerlogo.png" class="w-60"/>
      <p class="text-center w-1/3">Welcome to <strong>PointerPoker.com</strong>! A simple and <strong>FREE</strong> planning poker app for scrum/agile teams to collaborate in real-time during planning meetings.</p>
        <CreateSession class="md:w-1/4 w-1/2" />
    </div>
</template>
