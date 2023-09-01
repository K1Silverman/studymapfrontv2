<template>
  <div class="antialiased">
    <div class="flex">
      <h1 class="text-right ml-auto mr-32">StudyMap</h1>
      <div v-if="isLoggedIn">
        <i
          class="cursor-pointer fa-solid fa-gear right-2 mt-10 m-2 mr-0 p-auto fa-2xl text-sky-200 hover:text-sky-300"
        ></i>
        <button
          class="cursor-pointer rounded-full right-2 m-5 ml-2 px-5 p-2 font-medium bg-sky-200 hover:bg-sky-300"
        >
          Log out
        </button>
      </div>

      <div v-else>
        <button
          class="rounded-full relative right-2 m-5 px-5 p-2 font-medium bg-sky-200 hover:bg-sky-300"
        >
          Log In
        </button>
        <button
          class="rounded-full relative right-2 mr-5 px-5 p-2 font-medium bg-sky-200 hover:bg-sky-300"
        >
          Sign up
        </button>
      </div>
    </div>

    <div v-if="isLoggedIn" class="absolute right-2 top-[10%]">
      <button class="rounded-full m-5 px-5 p-2 font-medium bg-sky-200 hover:bg-sky-300">
        Add post
      </button>
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
      isLoggedIn: false,
    };
  },
  components: { RouterView, Folders },
});
</script>

<style scoped></style>
