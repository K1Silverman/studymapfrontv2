<template>
  <div class="m-10 flex flex-grow">
    <div class="sticky mr-5 min-w-[15%] max-w-[30%] min-h-max">
      <folders></folders>
    </div>
    <div class="containerWindow mx-auto min-w-max max-w-[60%]">
      <div class="w-full mt-10 mb-10 pb-8">
        <div class="m-auto w-2/3">
          <NewPost></NewPost>
        </div>
      </div>
    </div>
    <div class="sticky">
      <button class="windowButton -hue-rotate-90 right-2 ml-5 mr-0 px-5 p-2">Add post</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '../stores/UserStore';
import Folders from '../components/Folders.vue';
import NewPost from '../components/NewPost.vue';
import { useLoginStatusStore } from '../stores/LoginStatusStore';

export default {
  name: 'HomeView',
  components: { NewPost, Folders },
  setup() {
    const userStore = useUserStore();
    const loginStatusStore = useLoginStatusStore();
    return { userStore, loginStatusStore };
  },
};
</script>
