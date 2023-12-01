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
  <main>

    <div class="flex flex-col justify-center items-center content-center mt-[10%]">
      <img src="/pointerpokerlogo.png" class="w-60"/>
      <p class="pt-10 flex-wrap w-1/3 text-center">Welcome to <strong>PointerPoker.com</strong>! A simple and <strong>FREE</strong> planning poker app for scrum/agile teams to collaborate in real-time during planning meetings.</p>
      <div class="mt-10 sm:w-1/3">
        <CreateSession />
       </div>
    </div>
  </main>
</template>
