<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { watch } from 'vue';
import router from '@/router';
import { store } from './store';
import game from '@/game';


watch(() => router, () => {
  const urlParams = new URLSearchParams(window.location.search);
  if((!window.location.href.includes('poker') || !urlParams.has("session")) && store.CurrentSession != undefined) {
    game.LeaveSession();
  }

}, {deep: true});
</script>

<template>
  <header>
    <div>
      <nav>
     <!--
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/poker">Poker</RouterLink>
     --> 
      </nav>
    </div>
  </header>
    <RouterView />
</template>