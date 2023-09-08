<template>
  <div class="flex-wrap mb-5">
    <div class="h-40">
      <h1>Sign Up!</h1>
      <Transition name="alert">
        <ErrorAlert
          class="mt-2 w-[70%] min-w-min relative mx-auto text-center"
          v-if="alert.type == 'Error'"
          :alert-header="alert.header"
          :alert-message="alert.message"
          @close-error="resetAlert"
        />
        <SuccessAlert
          class="mt-2 w-[70%] min-w-min relative mx-auto text-center"
          v-else-if="alert.type == 'Success'"
          :alert-header="alert.header"
          :alert-message="alert.message"
          @close-error="resetAlert"
        />
      </Transition>
    </div>
    <div class="flex flex-wrap mx-10">
      <div class="mr-2">
        <h3>First name<span class="text-red-700">*</span></h3>
        <input
          type="text"
          @focusout="resetAlert()"
          class="loginInputReverse"
          v-model="registerUserInfo.firstName"
        />
      </div>
      <div class="ml-2">
        <h3>Last name<span class="text-red-700">*</span></h3>
        <input
          type="text"
          @focusout="resetAlert()"
          class="loginInputReverse"
          v-model="registerUserInfo.lastName"
        />
      </div>
    </div>

    <div class="flex flex-wrap mx-10">
      <div class="mr-2">
        <h3>E-mail<span class="text-red-700">*</span></h3>
        <input
          type="email"
          @focusout="
            resetAlert();
            validateEmail();
          "
          class="loginInputReverse"
          v-model="registerUserInfo.email"
        />
      </div>
      <div class="ml-2">
        <h3>Confirm E-mail<span class="text-red-700">*</span></h3>
        <input
          type="email"
          @focusout="
            resetAlert();
            confirmEmailMatch();
          "
          class="loginInputReverse"
          v-model="confirmEmail"
        />
      </div>
    </div>
    <div class="flex flex-wrap mx-10">
      <div class="mr-2">
        <h3>Password<span class="text-red-700">*</span></h3>
        <input
          type="password"
          @focus="
            () => {
              pwdValidation.validating = true;
            }
          "
          @focusout="
            () => {
              resetAlert();
            }
          "
          class="loginInputReverse"
          v-model="registerUserInfo.password"
          @input="checkPassword()"
          autocomplete="off"
        />
      </div>
      <div class="ml-2">
        <h3>Confirm password<span class="text-red-700">*</span></h3>
        <input
          type="password"
          @focus="
            () => {
              pwdValidation.validating = true;
            }
          "
          @focusout="
            () => {
              resetAlert();
            }
          "
          class="loginInputReverse"
          v-model="pwdValidation.confirmPassword"
          @input="checkPassword()"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="flex-wrap w-2/3 ml-12 mt-3">
      <div class="flex flex-wrap w-[500px]">
        <ul class="list-disc list-outside text-left pl-3">
          <li v-bind:class="{ validPassword: pwdValidation.contains_eight_characters }">
            At least 8 characters
          </li>
          <li v-bind:class="{ validPassword: pwdValidation.contains_number }">Contains number</li>
          <li v-bind:class="{ validPassword: pwdValidation.contains_uppercase }">
            Contains uppercase
          </li>
          <li v-bind:class="{ validPassword: pwdValidation.contains_special_character }">
            Contains special character
          </li>
          <li v-bind:class="{ validPassword: pwdValidation.confirm_pwd_matches }">
            Confirm password matches
          </li>
        </ul>
      </div>
    </div>
    <div class="mt-5 mb-5 flex flex-wrap mr-10">
      <button @click="registerUser()" class="windowButton invert -hue-rotate-90 mr-2">
        Sign up
      </button>
      <button @click="resetForm()" class="windowButton invert ml-2">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import ErrorAlert from './alert/ErrorAlert.vue';
import SuccessAlert from './alert/SuccessAlert.vue';

export default {
  name: 'RegistrationForm',
  emits: ['setAlert', 'resetAlert'],
  components: { ErrorAlert, SuccessAlert },
  data: function () {
    return {
      alert: {
        type: '',
        header: '',
        message: '',
      },
      registerUserInfo: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      nameValid: false,
      confirmEmail: '',
      emailValid: false,
      emailsMatch: false,
      pwdValidation: {
        validating: false,
        confirmPassword: '',
        password_length: 0,
        contains_eight_characters: false,
        contains_number: false,
        contains_uppercase: false,
        contains_special_character: false,
        confirm_pwd_matches: false,
        passwordValid: false,
      },
    };
  },
  methods: {
    registerUser: function () {
      this.validatePassword();
      this.checkEmail();
      this.checkNames();
      if (this.nameValid && this.emailValid && this.pwdValidation.passwordValid) {
        this.createUser();
      }
    },
    checkNames: function () {
      this.nameValid = false;
      if (this.registerUserInfo.firstName.length < 1) {
        this.setAlert('Error', 'Check First Name!', 'You must insert first name.');
        this.nameValid = false;
      } else if (this.registerUserInfo.lastName.length < 1) {
        this.setAlert('Error', 'Check Last Name!', 'You must insert last name.');
        this.nameValid = false;
      } else {
        this.nameValid = true;
      }
    },
    checkEmail: function () {
      if (this.registerUserInfo.email.length < 1) {
        this.setAlert('Error', 'Insert e-mail address!', 'Missing e-mail address.');
      }
    },
    validateEmail: function () {
      var validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;
      if (this.registerUserInfo.email.match(validEmailRegex)) {
        this.$http
          .get('/user/email', {
            params: {
              email: this.registerUserInfo.email,
            },
          })
          .then((response) => {
            if (response.data) {
              this.setAlert(
                'Error',
                'E-mail address already in use!',
                'Recover password or try different e-mail.'
              );
            } else {
              this.emailValid = true;
            }
          });
      } else {
        this.setAlert('Error', 'Invalid e-mail format!', 'Insert valid e-mail.');
      }
    },
    confirmEmailMatch: function () {
      if (this.registerUserInfo.email === this.confirmEmail) {
        this.emailsMatch = true;
      } else {
        this.setAlert('Error', "E-mails don't match!", 'Check e-mail addresses.');
      }
    },
    checkPassword: function () {
      this.pwdValidation.password_length = this.registerUserInfo.password.length;
      const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if (this.pwdValidation.password_length >= 8) {
        this.pwdValidation.contains_eight_characters = true;
      } else {
        this.pwdValidation.contains_eight_characters = false;
      }
      this.pwdValidation.contains_number = /\d/.test(this.registerUserInfo.password);
      this.pwdValidation.contains_uppercase = /[A-Z]/.test(this.registerUserInfo.password);
      this.pwdValidation.contains_special_character = format.test(this.registerUserInfo.password);
      this.pwdValidation.confirm_pwd_matches =
        this.registerUserInfo.password === this.pwdValidation.confirmPassword &&
        this.registerUserInfo.password.length >= 8;
    },
    checkConfirmPassword: function () {
      if (
        this.registerUserInfo.password === this.pwdValidation.confirmPassword &&
        this.pwdValidation.validating
      ) {
        this.pwdValidation.confirm_pwd_matches = true;
      } else {
        this.setAlert('Error', 'Passwords are not matching!', '');
      }
    },
    validatePassword: function () {
      if (this.registerUserInfo.password.length < 1) {
        this.setAlert('Error', 'Password missing!', 'Create a safe password.');
      } else if (
        this.pwdValidation.contains_eight_characters &&
        this.pwdValidation.contains_number &&
        this.pwdValidation.contains_uppercase &&
        this.pwdValidation.contains_special_character
      ) {
        this.checkConfirmPassword();
        if (this.pwdValidation.confirm_pwd_matches) {
          this.pwdValidation.passwordValid = true;
        }
      } else {
        this.setAlert('Error', 'Password too weak!', 'Create a safe password.');
        this.pwdValidation.passwordValid = false;
      }
    },

    resetForm: function () {
      this.registerUserInfo.firstName = '';
      this.registerUserInfo.lastName = '';
      this.registerUserInfo.email = '';
      this.confirmEmail = '';
      this.registerUserInfo.password = '';
      this.pwdValidation.confirmPassword = '';
    },
    createUser: function () {
      this.$http.post('/user', this.registerUserInfo).then((response) => {
        if (response.status === 200) {
          this.setAlert('Success', 'User created!', 'Login with your e-mail and password.');
        } else {
          this.setAlert('Error', 'Something went wrong!', 'Probably server error.');
        }
      });
    },
    setAlert(type: string, header: string, message: string) {
      this.alert.type = type;
      this.alert.header = header;
      this.alert.message = message;
    },
    resetAlert: function () {
      this.alert.type = '';
      this.alert.header = '';
      this.alert.message = '';
    },
  },
};
</script>
