<template>

  <div class="m-10 flex min-h-max h-full">
    <div class="containerWindow min-w-max max-w-[30%] mx-auto w-full p-7">
      <span class="text-right">
        <h1>Log in</h1>
      </span>
      <div class="mb-5">
        <h3>E-mail</h3>
        <input type="email" class="loginInput" />
        <h3>Password</h3>
        <input type="password" class="loginInput" />
      </div>
      <div>
        <a class="underlined cursor-pointer" @click="toggleModal">Register now</a><br />
        <a href="#">Forgot password?</a>
      </div>
      <div class="float-right mt-5">
        <button class="loginButton">Log in</button>
      </div>
    </div>
    <RegistrationModal :show="showModal" @closeModal="toggleModal" />
  </div>

</template>

<script lang="ts">
import RegistrationModal from '../components/RegistrationModal.vue'

export default {
    name: 'LoginView',
    components: { RegistrationModal },
    data: function () {
      return {
        showModal: false,
      }
    },
    methods: {
      toggleModal: function() {
        this.showModal = !this.showModal
      },
    }
}
</script>

<style>
</style>