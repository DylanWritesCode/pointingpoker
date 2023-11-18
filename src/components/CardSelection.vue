<script setup lang="ts">
    import { store } from '@/store';
    import game from '@/game';

    defineProps({
        cards: Array<string>
    })

    function selectCard (e:string){
        if(store.CurrentUser == undefined) return;
        if(store.CurrentUser.ShowCards == true) return;

        if(e == store.CurrentUser.Vote) {
            store.UpdateUserVote(e);
        } else {
            store.UpdateUserVote(e);
        }

        game.SendUserVote(e);
    }

    function getActiveClass(e:string){
        if(store.CurrentUser?.Vote == e){
            return 'border-blue-400 -mt-5'
        } else
        {
            return ''
        }
    }
</script>
<template>
    <div class="flex flex-wrap justify-center gap-6 p-10 mb-10">
        <div v-for="card in cards" v-bind:key="card" class="border-2 text-center drop-shadow-md flex w-[75px] h-[125px] items-center justify-center hover:-mt-5 hover:border-blue-400 rounded-lg cursor-pointer"
         @click="selectCard(card)"
         :class="getActiveClass(card)">
            <span class="font-bold text-4xl">{{ card }}</span>
        </div>
    </div>
</template>