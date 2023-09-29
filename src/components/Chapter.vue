<template>
  <div class="chapter">
    <h3>{{ this.chapter.name }}</h3>
    <div
      class="containerWindow -hue-rotate-90 font-bold text-center"
      v-if="this.chapter.posts == undefined || this.chapter.posts.length < 1"
    >
      No posts in this chapter yet. Make the fist one :)
    </div>
    <div v-for="post in orderedPosts" :key="post.id" class="containerWindow hue-rotate-60">
      <h4>{{ post.subject }}</h4>
      <div class="" v-html="post.body"></div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/UserStore';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

export default {
  name: 'ChapterComponent',
  props: ['chapter'],
  data: function () {
    return {};
  },
  computed: {
    orderedPosts() {
      return this.chapter.posts.slice().sort((a, b) => a.position - b.position);
    },
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
};
</script>
