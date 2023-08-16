<template>
  <div class="antialiased">
    <div v-if="isLoggedIn" class="absolute right-2 top-3">
      <button class="rounded-full m-5 px-5 p-2 font-medium bg-sky-200 hover:bg-sky-300">Add post</button>
    </div>
    <div>
      <router-view />  
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Folders from './components/Folders.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      isLoggedIn: false
    };
  },
  components: { RouterView, Folders },
});
</script>

<style scoped>
</style>
