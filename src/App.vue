<template>
  <div class="antialiased">
    <div class="flex static w-full justify-end">
      <h1 class="relative top-2 right-[5%]">StudyMap</h1>
      <div v-if="loginStatusStore.isLoggedIn">
        <i
          class="cursor-pointer fa-solid fa-gear right-2 mt-10 m-2 mr-0 p-auto fa-2xl text-sky-200 hover:text-sky-300"
        ></i>
        <button
          @click="logOut()"
          class="cursor-pointer rounded-tr-lg rounded-bl-lg right-2 m-5 ml-2 px-5 p-2 font-medium bg-sky-200 hover:bg-sky-300"
        >
          Log Out
        </button>
      </div>

      <div v-if="!loginStatusStore.isLogIn && !loginStatusStore.isLoggedIn">
        <button
          @click="loginStatusStore.toggleIsLogIn()"
          class="windowButton -hue-rotate-90 right-2 m-5 px-5 p-2"
        >
          Log In
        </button>
      </div>

      <div v-else-if="loginStatusStore.isLogIn && !loginStatusStore.isLoggedIn">
        <button
          @click="loginStatusStore.toggleIsLogIn()"
          class="windowButton invert -hue-rotate-90 right-2 m-5 px-5 p-2"
        >
          Sign Up
        </button>
      </div>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { useLoginStatusStore } from './stores/LoginStatusStore';
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Folders from './components/Folders.vue';
import { useUserStore } from './stores/UserStore';

export default defineComponent({
  name: 'App',
  data() {
    return {};
  },
  components: { RouterView, Folders },
  methods: {
    logOut: function () {
      this.$cookie.remove('sessionHash');
      this.$cookie.remove('uid');
      this.userStore.$reset();
      window.location.reload();
    },
  },
  setup() {
    const loginStatusStore = useLoginStatusStore();
    const userStore = useUserStore();

    return { loginStatusStore, userStore };
  },
  beforeMount() {},
});
</script>

<style scoped></style>
./stores/LoginStatusStore
