<template>
  <div class="flex flex-wrap flex-row-reverse justify-between">
    <div class="text-center w-[60%] order-2">
      <h2>Keep all your study materials in one place.</h2>
      <div class="containerWindow max-w-[50%] m-auto mt-12">
        <div class="text-center">
          <h3>Seperate different projects to folders</h3>
          <p>
            When your notes are disorganized, finding the information you need quickly can be
            challenging, and you may waste time searching for what you need instead of studying.
            Having a system in place lets you locate the information you need more easily, so you
            can spend more time studying and less time looking for notes.
          </p>
        </div>
      </div>
    </div>
    <RegistrationModal class="order-1"></RegistrationModal>
  </div>
</template>

<script lang="ts">
import RegistrationModal from '../components/RegistrationModal.vue';

export default {
  name: 'HomePageView',
  components: {
    RegistrationModal,
  },
  methods: {},
};
</script>
