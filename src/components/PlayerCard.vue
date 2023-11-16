<script setup lang="ts">
    var props = defineProps({
        name:String,
        vote:String,
        showCard:Boolean
    })

    function getCardColor(){
        if(props.vote != undefined && props.vote != ''){
            return 'bg-blue-400'
        } else
        {
            return 'bg-gray-200'
        }
    }
</script>

<template>
    <div class="self-center flex flex-col items-center"> 
        <div class="text-2xl w-[100px] h-[150px] flex justify-center border-2 rounded-md flex content-center items-center" :class="getCardColor()">
            <Transition>
                <span v-show="showCard" class="text-3xl text-white">{{ vote }}</span>
            </Transition>
        </div>
        <span class="font-bold text-2xl">{{ name }}</span>
    </div>
</template>

<style scoped>
    /* we will explain what these classes do next! */
    .v-enter-active{
    transition: opacity 2s ease;
    }

    .v-enter-from {
    opacity: 0;
    }
</style>