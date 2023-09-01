<template>
  <Transition name="fade">
    <div class="modal-overlay" v-if="show" @click="$emit('closeModal')"></div>
  </Transition>
  <Transition name="pop">
    <div class="containerWindow modal" v-if="show">
      <div class="m-10 flex min-h-max h-full max-w-[100%]">
        <div class="containerWindow min-w-max mx-auto w-full p-7">
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
            <!-- <a class="underlined cursor-pointer" @click="toggleModal">Register now</a><br /> -->
            <a href="#">Forgot password? (not working yet)</a>
          </div>
          <div class="float-right mt-5">
            <button class="windowButton">Log in</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
export default {
  name: 'LoginView',
  components: {},
  props: {
    show: Boolean,
  },
  emits: ['closeModal'],
  data: function () {
    return {
      showModal: false,
    };
  },
  methods: {},
};
</script>

<style></style>
