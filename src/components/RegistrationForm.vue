<template>
  <div class="flex-wrap mb-5 w-3/4 mx-auto justify-start">
    <div class="flex flex-wrap justify-evenly">
      <div>
        <h3>First name<span class="text-red-700">*</span></h3>
        <input
          type="text"
          @focusout="resetAlert()"
          class="loginInputReverse"
          v-model="registerUserInfo.firstName"
        />
      </div>
      <div>
        <h3>Last name<span class="text-red-700">*</span></h3>
        <input
          type="text"
          @focusout="resetAlert()"
          class="loginInputReverse"
          v-model="registerUserInfo.lastName"
        />
      </div>
    </div>

    <div class="flex flex-wrap justify-evenly">
      <div>
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
      <div>
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
    <div class="flex flex-wrap justify-evenly">
      <div>
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
      <div>
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
    <div class="flex-wrap w-2/3 mx-auto mt-3">
      <div v-if="pwdValidation.validating" class="flex flex-wrap justify-evenly">
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
    <div class="mt-5 w-[75%] mx-auto flex flex-wrap justify-evenly">
      <button @click="registerUser()" class="windowButton mx-auto">Register</button>
      <button @click="resetForm()" class="windowButton invert mx-auto">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RegistrationForm',
  emits: ['setAlert', 'resetAlert'],
  data: function () {
    return {
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
        console.log('User: ' + JSON.stringify(this.registerUserInfo));
        this.createUser();
      }
    },
    checkNames: function () {
      this.nameValid = false;
      if (this.registerUserInfo.firstName.length < 1) {
        this.$emit('setAlert', 'Error', 'Check First Name!', 'You must insert first name.');
        this.nameValid = false;
      } else if (this.registerUserInfo.lastName.length < 1) {
        this.$emit('setAlert', 'Error', 'Check Last Name!', 'You must insert last name.');
        this.nameValid = false;
      } else {
        this.nameValid = true;
      }
    },
    checkEmail: function () {
      if (this.registerUserInfo.email.length < 1) {
        this.$emit('setAlert', 'Error', 'Insert e-mail address!', 'Missing e-mail address.');
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
            console.log('Email response data: ' + response.data);
            if (response.data) {
              this.$emit(
                'setAlert',
                'Error',
                'E-mail address already in use!',
                'Recover password or try different e-mail.'
              );
            } else {
              this.emailValid = true;
            }
          });
      } else {
        this.$emit('setAlert', 'Error', 'Invalid e-mail format!', 'Insert valid e-mail.');
      }
    },
    confirmEmailMatch: function () {
      if (this.registerUserInfo.email === this.confirmEmail) {
        this.emailsMatch = true;
      } else {
        this.$emit('setAlert', 'Error', "E-mails don't match!", 'Check e-mail addresses.');
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
        this.$emit('setAlert', 'Error', 'Passwords are not matching!', '');
      }
    },
    validatePassword: function () {
      if (this.registerUserInfo.password.length < 1) {
        this.$emit('setAlert', 'Error', 'Password missing!', 'Create a safe password.');
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
        this.$emit('setAlert', 'Error', 'Password too weak!', 'Create a safe password.');
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
          this.$emit(
            'setAlert',
            'Success',
            'User created!',
            'Login with your e-mail and password.'
          );
        }
      });
    },
    resetAlert: function () {
      this.$emit('resetAlert');
    },
    // toggleModal: function () {
    //   this.showModal = !this.showModal;
    // },
  },
};
</script>
