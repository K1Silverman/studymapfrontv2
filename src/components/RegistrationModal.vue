<template>
  <Transition name="fade">
    <div class="modal-overlay" 
          v-if="show" 
          @click="$emit('closeModal')">
    </div>
  </Transition>
  <Transition name="pop">
    <div class="containerWindow modal"
    role="dialog" 
    v-if="show">
      <div>
        <div class="h-36">
          <h1>Registration</h1>
          <Transition name="alert" >
            <ErrorAlert class="mt-2 relative mx-auto" v-if="alert.type == 'Error'" :alert-header="alert.header" :alert-message="alert.message" @close-error="resetAlert" />
            <SuccessAlert class="mt-2 relative mx-auto" v-else-if="alert.type == 'Success'" :alert-header="alert.header" :alert-message="alert.message" @close-error="resetAlert" />
          </Transition>

        </div>
        <div id="registrationForm" class="mb-5">
          <h3>First name<span class="text-red-700">*</span></h3>
          <input type="text" @focusout="resetAlert();" class="loginInputReverse" v-model="registerUserInfo.firstName" />
          <h3>Last name<span class="text-red-700">*</span></h3>
          <input type="text" @focusout="resetAlert();" class="loginInputReverse" v-model="registerUserInfo.lastName" />
          <h3>E-mail<span class="text-red-700">*</span></h3>
          <input type="email" @focusout="resetAlert(); validateEmail();" class="loginInputReverse" v-model="registerUserInfo.email" />
          <h3>Password<span class="text-red-700">*</span></h3>
          <input type="password" @focus="() => { pwdValidation.validating = true; }"
          @focusout="() => { resetAlert(); }" class="loginInputReverse" v-model="registerUserInfo.password"
          @input="checkPassword()" autocomplete="off" />
          <h3>Confirm password<span class="text-red-700">*</span></h3>
          <input type="password" @focus="() => { pwdValidation.validating = true }"
          @focusout="() => { resetAlert();}" class="loginInputReverse" v-model="pwdValidation.confirmPassword"
          @input="checkPassword()" autocomplete="off" />
          <div class="mt-5">
            <button @click="registerUser()" class="windowButton mr-2">Register</button> 
            <button @click="$emit('closeModal')" class="windowButton invert ml-2">Cancel</button>
          </div>
        </div>
    </div>
    <Transition  name="alert">
      <div v-if="pwdValidation.validating" class="passwordValidationPopup">
        <ul class="list-disc list-outside text-left pl-3">
          <li v-bind:class="{ validPassword: pwdValidation.contains_eight_characters}">At least 8 characters</li>
          <li v-bind:class="{ validPassword: pwdValidation.contains_number}">Contains number</li>
          <li v-bind:class="{ validPassword: pwdValidation.contains_uppercase}">Contains uppercase</li>
          <li v-bind:class="{ validPassword: pwdValidation.contains_special_character}">Contains special character</li>
          <li v-bind:class="{ validPassword: pwdValidation.confirm_pwd_matches}">Confirm password matches</li>
        </ul>
      </div>
    </Transition>
  </div>
  </Transition>  
</template>

<script lang="ts">
import ErrorAlert from './alert/ErrorAlert.vue';
import SuccessAlert from './alert/SuccessAlert.vue';

export default {
  name: 'RegistrationModal',
  props: {
    show: Boolean,
  },
  components: {
    ErrorAlert,
    SuccessAlert
},
  emits: ['closeModal'],
  data: function() {
    return {
      registerUserInfo: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      nameValid: false,
      emailValid: false,
      pwdValidation: {
        validating: false,
        confirmPassword: '',
        password_length: 0,
        contains_eight_characters: false,
        contains_number: false,
        contains_uppercase: false,
        contains_special_character: false,
        confirm_pwd_matches: false,
        passwordValid: false
      },
      alert: {
        type: '',
        header: '',
        message: '',
      },
    }
  },
  methods: {
    registerUser: function () {
      this.validatePassword();
      this.checkEmail();
      this.checkNames();
      if (this.nameValid && this.emailValid && this.pwdValidation.passwordValid && this.alert.type == '') {
        console.log("User: " + JSON.stringify(this.registerUserInfo));
        this.createUser();
      }
    },
    checkNames: function () {
      this.nameValid = false;
      if (this.registerUserInfo.firstName.length < 1) {
        this.alert.type = 'Error';
        this.alert.header = 'Check First Name!';
        this.alert.message = 'You must insert first name.';
        this.nameValid = false; 
      } else if (this.registerUserInfo.lastName.length < 1) {
        this.alert.type = 'Error';
        this.alert.header = 'Check Last Name!';
        this.alert.message = 'You must insert last name.';
        this.nameValid = false;
      } else {
        this.nameValid = true; 
      }
    },
    checkEmail: function () {
      if (this.registerUserInfo.email.length < 1) {
        this.alert.type = 'Error';
        this.alert.header = 'Insert e-mail address!';
        this.alert.message = 'Missing e-mail address.';
      }
    },
    validateEmail: function () {
    var validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;
      if (this.registerUserInfo.email.match(validEmailRegex)) {
        this.$http.get('/user/email', {
          params: {
            email: this.registerUserInfo.email
          }
        }).then(response => {
          console.log("Email response data: " + response.data);
          if (response.data) {
            this.alert.type = 'Error';
            this.alert.header = 'E-mail address already in use!';
            this.alert.message = 'Recover password or try different e-mail.'
          } else {
            this.emailValid = true;
          }
        });
      } else {
        this.alert.type = 'Error';
        this.alert.header = 'Invalid e-mail format!';
        this.alert.message = 'Insert valid e-mail.';
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
      this.pwdValidation.confirm_pwd_matches = this.registerUserInfo.password === this.pwdValidation.confirmPassword &&
      this.registerUserInfo.password.length >= 8;
    },
    checkConfirmPassword: function () {
      if (this.registerUserInfo.password === this.pwdValidation.confirmPassword && this.pwdValidation.validating) {
        this.pwdValidation.confirm_pwd_matches = true;
      } else {
        this.alert.type = 'Error';
        this.alert.header = 'Passwords are not matching!';
        this.alert.message = '';
      }

    },
    validatePassword: function () {
      if (this.registerUserInfo.password.length < 1) {
        this.alert.type = 'Error';
        this.alert.header = 'Password missing!';
        this.alert.message = 'Create a safe password.'
      } else if (this.pwdValidation.contains_eight_characters &&
          this.pwdValidation.contains_number &&
          this.pwdValidation.contains_uppercase &&
          this.pwdValidation.contains_special_character) {
            this.checkConfirmPassword();
            if (this.pwdValidation.confirm_pwd_matches) {
              this.pwdValidation.passwordValid = true;
            }
      } else {
        this.alert.type = 'Error';
        this.alert.header = 'Password too weak!';
        this.alert.message = 'Create a safe password.'
        this.pwdValidation.passwordValid = false;
      }

    },
    resetAlert: function () {
      this.alert.type = '';
      this.alert.header = '';
      this.alert.message = '';
    },
    createUser: function () {
      this.$http.post('/user', this.registerUserInfo).then(response => {
        if (response.status === 200) {
          this.alert.type = 'Success',
          this.alert.header = 'User created!',
          this.alert.message = 'Login with your e-mail and password.'
        }
        })
      },
  },
}
</script>