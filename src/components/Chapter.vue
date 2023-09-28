<template>
  <div class="chapter">
    <h3>{{ this.chapter.name }}</h3>
    <div
      class="containerWindow -hue-rotate-90 font-bold text-center"
      v-if="this.chapter.posts == undefined || this.chapter.posts.length < 1"
    >
      No posts in this chapter yet. Make the fist one :)
    </div>
    <div v-for="post in this.chapter.posts" class="post">
      <h4>{{ post.subject }}</h4>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/UserStore';

export default {
  name: 'ChapterComponent',
  props: ['chapter'],
  data: function () {
    return {};
  },
  methods: {},
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
};
</script>
