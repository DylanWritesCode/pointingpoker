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
      <div class="mt-10 sm:w-1/3">
        <CreateSession />
       </div>
    </div>
  </main>
</template>
