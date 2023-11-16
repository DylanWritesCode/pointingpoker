<script setup lang="ts">
    defineEmits(["JoinSession"]);
</script>
<template>
    <form class="flex flex-col gap-12">
        <h1 class="text-center font-bold text-xl">Enter your name to join the poker session.</h1>
        <div class="flex flex-col">
            <label>Your Name</label>
            <input class="border-2 border-black rounded-lg font-mono bg-white bg-opacity-50 p-2" />
        </div>
        <button class="bg-blue-500 rounded-md p-2 pl-5 pr-9 text-white font-bold text-lg">Join Session</button>
    </form>
</template>