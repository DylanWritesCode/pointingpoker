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
    <div class="flex gap-6 h-[200px]">
        <div v-for="card in cards" v-bind:key="card" class="border-2 text-center drop-shadow-md  w-[100px] flex items-center justify-center flex-grow hover:-mt-5 hover:border-blue-400 rounded-lg cursor-pointer"
         @click="selectCard(card)"
         :class="getActiveClass(card)">
            <span class="font-bold text-4xl">{{ card }}</span>
        </div>
    </div>
</template>