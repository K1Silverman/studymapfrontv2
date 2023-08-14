<template>
  <div class="rounded-lg font-sans w-7/12 m-auto bg-gradient-to-r from-blue-300 to-indigo-500">
    <div class="absolute right-2 top-3">
      <button class="rounded-full m-5 px-5 p-2 font-medium bg-sky-200 hover:bg-sky-300">Add post</button>
    </div>
    <div class="w-full mt-10 mb-10 pb-8">
      <router-view class="m-auto w-2/3" />  
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  data() {
    return {};
  },
  components: { RouterView },
});
</script>

<style scoped>
</style>
