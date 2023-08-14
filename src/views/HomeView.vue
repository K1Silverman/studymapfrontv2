<template>
  <div>
    <span class="text-right">
      <h1>Studymap</h1>
    </span>
    <h2>What NEW have you learned?</h2>
    <NewPost></NewPost>
  </div>
</template>

<script lang="ts">
import NewPost from '../components/NewPost.vue';


export default {
  name: 'HomeView',
  components: { NewPost },
};
</script>

<style></style>
