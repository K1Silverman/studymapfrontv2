<template>
  <div class="m-10 flex">
    <div class="flex-grow mr-5 min-w-max max-w-[15%] min-h-max">
      <folders></folders>
    </div>
    <div class="containerWindow flex-grow font-sans min-w-max max-w-[75%]">
      <div class="w-full mt-10 mb-10 pb-8 flex-grow">
        <div class="m-auto w-2/3">
        <span class="text-right">
          <h1>Studymap</h1>
        </span>
        <NewPost></NewPost>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import Folders from '../components/Folders.vue';
import NewPost from '../components/NewPost.vue';


export default {
  name: 'HomeView',
  components: { NewPost, Folders },
};
</script>

<style></style>
