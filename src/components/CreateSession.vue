<script setup lang="ts">
    import { ref } from 'vue'
    import  game from '@/game'

    const sessionName = ref(null);
    const playerName = ref(null);

    function submitForm (){
        if(sessionName.value == null){
            alert('Please enter a session name.');
            return;
        }

        if(playerName.value == null){
            alert('Please enter a player name.');
            return;
        }
        
        game.CreateNewPokerSession(sessionName.value, playerName.value);
    }

</script>
<template>
    <form class="flex flex-col w-full gap-6" @submit.prevent="submitForm">
        <div class="grid gap-1">
            <label class="font-bold text-lg">Session Name</label>
            <input class="border-2 rounded-lg border-blue-400 p-2 font-mono" v-model="sessionName" placeholder="Session Name" />
        </div>
        <div class="grid gap-1">
            <label class="font-bold text-lg">Your Name</label>
            <input class="border-2 rounded-lg border-blue-400 p-2 font-mono" v-model="playerName" placeholder="Your Name" />
        </div>
        <button class="bg-blue-500 rounded-md p-2 pl-5 pr-9 text-white font-bold text-lg hover:bg-opacity-90">Create Session</button>
    </form>
</template>@/game/game