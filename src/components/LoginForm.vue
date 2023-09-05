<template>
  <div class="flex-wrap mb-5">
    <div class="flex h-[100px]">
      <h1>Log in</h1>
      <ErrorAlert
        class="mt-2 w-fit min-w-min relative mx-auto text-center"
        v-if="alert.type == 'Error'"
        :alert-header="alert.header"
        :alert-message="alert.message"
        @close-error="resetAlert"
      />
    </div>
    <div class="flex flex-wrap mx-10">
      <div class="mr-2">
        <h3>E-mail</h3>
        <input v-model="email" type="email" class="loginInputReverse" />
      </div>
      <div class="ml-2">
        <h3>Password</h3>
        <input
          v-model="password"
          @focusout="resetAlert()"
          type="password"
          class="loginInputReverse"
        />
      </div>
      <div>
        <a href="#" @click="loginStatusStore.toggleIsLogIn()">Register here</a><br />
        <a href="#">Recover password (not working yet)</a>
      </div>
    </div>
    <div class="mt-5 mb-5 flex flex-wrap mr-10">
      <button @click="logIn()" class="windowButton -hue-rotate-90 mr-2">Log in</button>
      <button @click="goToSignUpForm()" class="windowButton invert -hue-rotate-90 ml-2">
        Sign up
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '../stores/UserStore';
import { useLoginStatusStore } from '../stores/LoginStatusStore';
import ErrorAlert from './alert/ErrorAlert.vue';
import SuccessAlert from './alert/SuccessAlert.vue';

export default {
  name: 'LoginView',
  components: { ErrorAlert, SuccessAlert },
  data: function () {
    return {
      email: '',
      password: '',
      alert: {
        type: '',
        header: '',
        message: '',
      },
    };
  },
  methods: {
    logIn: function () {
      if (this.email.length < 1 || this.password.length < 1) {
        this.setAlert('Error', 'Bad credentials', 'Enter E-mail address and password');
      } else {
        this.$http
          .get('/user/login', {
            params: {
              email: this.email,
              password: this.password,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              if (response.data.status === 'Active') {
                this.userStore.id = response.data.id;
                this.userStore.firstName = response.data.firstname;
                this.userStore.lastName = response.data.lastname;
                this.userStore.email = response.data.email;
                this.userStore.role = response.data.role;
                this.userStore.status = response.data.status;
                this.loginStatusStore.isLoggedIn = true;
                this.$router.push({ name: 'homeRoute' });
              } else {
                this.setAlert(
                  'Error',
                  'Account deactivated!',
                  'This account is deactivated. Activate here.'
                );
              }
            } else if (response.status === 401) {
              this.setAlert('Error', 'Wrong credentials', response.data.message);
            } else if (response.status === 404) {
              this.setAlert('Error', "Account doesn't exist", response.data.message);
            } else {
              this.setAlert('Error', 'Something went wrong!', '');
            }
          });
      }
    },
    setAlert: function (type: string, header: string, message: string) {
      this.alert.type = type;
      this.alert.header = header;
      this.alert.message = message;
    },
    resetAlert: function () {
      this.alert.type = '';
      this.alert.header = '';
      this.alert.message = '';
    },
    goToSignUpForm: function () {
      this.loginStatusStore.isLogIn = false;
    },
  },
  setup() {
    const loginStatusStore = useLoginStatusStore();
    const userStore = useUserStore();
    return { loginStatusStore, userStore };
  },
};
</script>

<style></style>
../stores/UserStore ../stores/LoginStatusStore
