<template>
  <div class="flex flex-wrap justify-between px-10">
    <div class="text-center w-[540px] mx-auto max-h-min">
      <h2>Keep all your study materials in one place.</h2>
      <div class="containerWindow m-auto mb-4 mt-12 w-[540px] max-h-min">
        <div class="text-center">
          <h4>
            When your notes are disorganized, finding the information you need quickly can be
            challenging, and you may waste time searching for what you need instead of studying.
            Having a system in place lets you locate the information you need more easily, so you
            can spend more time studying and less time looking for notes.
          </h4>
        </div>
      </div>
    </div>
    <div class="mx-auto">
      <CredentialsWindow></CredentialsWindow>
    </div>
  </div>
</template>

<script lang="ts">
import CredentialsWindow from '../components/CredentialsWindow.vue';

export default {
  name: 'HomePageView',
  components: {
    CredentialsWindow,
  },
  methods: {},
};
</script>
