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
      <WarningAlert v-if="alert.type != ''" />
      <div style="display: inline-flex;">
        <div>
          <div class="flex">
            <h1>Registration</h1>
          </div>
          <div class="mb-5">
            <form>
              <h3>First name<span class="text-red-700">*</span></h3>
              <input type="text" class="loginInputReverse" v-model="firstName" required />
              <h3>Last name<span class="text-red-700">*</span></h3>
              <input type="text" class="loginInputReverse" v-model="lastName" required />
              <h3>E-mail<span class="text-red-700">*</span></h3>
              <input type="email" class="loginInputReverse" v-model="eMail" required />
              <h3>Password<span class="text-red-700">*</span></h3>
              <input type="password" v-on:focus="() => {pwdValidation.validating = true}"
              v-on:focusout="() => { pwdValidation.validating = false}" class="loginInputReverse" v-model="password"
              @input="checkPassword" autocomplete="off" required />
              <h3>Confirm password<span class="text-red-700">*</span></h3>
              <input type="password" v-on:focus="() => {pwdValidation.validating = true}"
              v-on:focusout="() => { pwdValidation.validating = false}" class="loginInputReverse" v-model="confirmPassword"
              required />
              <div class="mt-5">
                <button @click=";" class="windowButton mr-2">Register</button> 
                <button @click="$emit('closeModal')" class="windowButton invert ml-2">Cancel</button>
              </div>
            </form>
          </div>
      </div>
    </div>
    <div v-if="pwdValidation.validating" class="passwordValidationPopup">
      <ul class="list-disc list-outside text-left pl-3">
        <li v-bind:class="{ validPassword: pwdValidation.contains_eight_characters}">At least 8 characters</li>
        <li v-bind:class="{ validPassword: pwdValidation.contains_number}">Contains number</li>
        <li v-bind:class="{ validPassword: pwdValidation.contains_uppercase}">Contains uppercase</li>
        <li v-bind:class="{ validPassword: pwdValidation.contains_special_character}">Contains special character</li>
      </ul>
    </div>
  </div>
  </Transition>  
</template>

<script lang="ts">
import WarningAlert from './alert/WarningAlert.vue';

export default {
  name: 'RegistrationModal',
  props: {
    show: Boolean,
  },
  components: {
    WarningAlert 
  },
  emits: ['closeModal'],
  data: function() {
    return {
      firstName: '',
      lastName: '',
      dob: '',
      eMail: '',
      password: '',
      confirmPassword: '',
      today: '',
      pwdValidation: {
        validating: false,
        password_length: 0,
        contains_eight_characters: false,
        contains_number: false,
        contains_uppercase: false,
        contains_special_character: false,
        confirm_pwd_matches: false,
        valid_password: false
      },
      alert: {
        type: '',
        message: ''
      }
    }
  },
  methods: {
    checkPassword: function () {
      this.pwdValidation.password_length = this.password.length;
      const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if (this.pwdValidation.password_length > 8) {
        this.pwdValidation.contains_eight_characters = true;
      } else {
        this.pwdValidation.contains_eight_characters = false;
      }
      this.pwdValidation.contains_number = /\d/.test(this.password);
      this.pwdValidation.contains_uppercase = /[A-Z]/.test(this.password);
      this.pwdValidation.contains_special_character = format.test(this.password);
      this.pwdValidation.confirm_pwd_matches = this.password === this.confirmPassword;
      if (this.pwdValidation.contains_eight_characters &&
          this.pwdValidation.contains_number &&
          this.pwdValidation.contains_uppercase &&
          this.pwdValidation.contains_special_character &&
          this.pwdValidation.confirm_pwd_matches) {
          this.pwdValidation.valid_password = true;
      } else {
        this.pwdValidation.valid_password = false;
      }
    },
    checkEmail: function () {
      this.$http.get('/user/email', {
        params: {
          eMailAddress: this.eMail
        }
      }).then(response => {
        console.log(response);
      })
    },
    getNow: function() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      this.today = date;
      console.log(this.today);
    }
  },
  created() {
    this.getNow;
  }
}
</script>