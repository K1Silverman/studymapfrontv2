<template>
  <div>
    <Transition name="fade">
      <div class="modal-overlay" 
           v-if="show" 
           @click="$emit('closeModal')">
      </div>
    </Transition>
    <Transition name="pop">
      <div class="containerWindow modal" 
           role="dialog" 
           v-if="show"
           >
        <div>
          <div class="flex">
            <h1>Registration</h1>
            <i class="fa-solid fa-xmark text-indigo-950 m-auto mr-0 mt-0 text-3xl cursor-pointer" @click="$emit('closeModal')"></i>
          </div>
          <div class="mb-5">
            <form>
              <h3>First name<span class="text-red-700">*</span></h3>
              <input type="text" class="loginInputReverse" v-model="firstName" required />
              <h3>Last name<span class="text-red-700">*</span></h3>
              <input type="text" class="loginInputReverse" v-model="lastName" required />
              <h3>Day of Birth<span class="text-red-700">*</span></h3>
              <input type="date" class="loginInputReverse" v-model="dob" pattern="\d{4}-\d{2}-\d{2}" max="{{today}}" required />
              <h3>E-mail<span class="text-red-700">*</span></h3>
              <input type="email" class="loginInputReverse" v-model="eMail" required />
              <h3>Password<span class="text-red-700">*</span></h3>
              <input type="password" class="loginInputReverse" v-model="password" required />
              <h3>Confirm password<span class="text-red-700">*</span></h3>
              <input type="password" class="loginInputReverse" v-model="confirmPassword" required />
              <p>Password should be more than 8 characters</p>
              <input type="submit" @click=";" class="windowButton mr-2" value="Register" />
              
          <button @click="$emit('closeModal')" class="windowButton invert ml-2">Cancle</button>
            </form>
          </div>

  
        </div>
        
      </div>
    </Transition>
  </div>
  
</template>

<script lang="ts">

export default {
  name: 'RegistrationModal',
  props: {
    show: Boolean,
  },
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
        password_length: 0,
        contains_eight_characters: false,
        contains_number: false,
        contains_uppercase: false,
        contains_special_character: false,
        valid_password: false
      }
    }
  },
  methods: {
    checkPassword: function () {
      if (this.password === this.confirmPassword) {
         
      }
    },
    getNow: function() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      this.today = date;
    }
  },
  created() {
    this.getNow;
  }
}
</script>