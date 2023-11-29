<script setup lang="ts">

    import {ref} from 'vue';
    import router from '@/router';
    import game from '@/game';

    const sessionId = ref<null | string>(null);
    const playerName = ref<null | string>(null);

    const sessionIdTemplate = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("session")){
        const queryId = urlParams.get("session");
        if(queryId?.length != sessionIdTemplate.length){
            alert('Invalid session URL');
            router.push('/');
        } else {
            sessionId.value = queryId
        }
    } else {
        alert('Invalid session URL');
        router.push('/');
    }

    function submitForm (e:any){
        console.log(e.submitter.id);
        if(sessionId.value == null){
            alert('Invalid session URL');
            router.push('/');
            return;
        }

        if(playerName.value == null){
            alert('Please enter a player name.');
            return;
        }

        if(e.submitter.id == "spectate"){
            game.JoinSession(sessionId.value, playerName.value, true);
        } else {
            game.JoinSession(sessionId.value, playerName.value, false);
        }
    }

</script>
<template>
    <div class="flex flex-col items-center p-5">
        <img src="/pointerpokerlogo.png" class="w-60 mb-20"/>
        <form class="flex flex-col gap-12"  @submit.prevent="submitForm">
            <h1 class="text-center font-bold text-xl">Enter your name to join the poker session.</h1>
            <div class="flex flex-col">
                <label>Your Name</label>
                <input v-model="playerName" class="border-2 border-black rounded-lg font-mono bg-white bg-opacity-50 p-2" />
            </div>
            <div class="flex flex-col gap-10 items-center">
                <button class="bg-blue-500 rounded-md p-2 pl-5 pr-5 text-white font-bold text-lg" id="participate">Join Session</button>
                <span class="font-bold">OR</span>
                <button class="bg-gray-500 rounded-md p-2 pl-5 pr-5 text-white font-bold text-lg" id="spectate">Spectate</button>
            </div>
        </form>

    </div>
</template>