<script setup lang="ts">
    import {ref} from 'vue'
    import { store } from '@/store';
import game from '@/game';

    defineProps({
        cards: Array<string>
    })

    const currentCard = ref("");
    function selectCard (e:string){

        if(e == currentCard.value) {
            currentCard.value = "";
        } else {
            currentCard.value = e;
        }

        game.SendUserVote(currentCard.value);
    }

    function getActiveClass(e:string){
        if(currentCard.value == e){
            return 'border-blue-400 -mt-5'
        } else
        {
            return ''
        }
    }
</script>
<template>
    <div class="flex gap-6 h-[200px]">
        <div v-for="card in cards" v-bind:key="card" class="border-2 text-center drop-shadow-md  w-[100px] flex items-center justify-center flex-grow hover:-mt-5 hover:border-blue-400 rounded-lg cursor-pointer"
         @click="selectCard(card)"
         :class="getActiveClass(card)">
            <span class="font-bold text-4xl">{{ card }}</span>
        </div>
    </div>
</template>