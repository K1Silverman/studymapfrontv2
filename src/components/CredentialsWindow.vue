<template>
  <div class="containerWindow w-[540px] max-h-min">
    <div class="w-full">
      <div>
        <Transition name="registration" mode="out-in">
          <RegistrationForm v-if="!formStore.isLogIn" class="transitionWindowContent" />
          <LoginForm v-else class="transitionWindowContent"></LoginForm>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useLoginStatusStore } from '../stores/LoginStatusStore';
import LoginForm from './LoginForm.vue';
import ErrorAlert from './alert/ErrorAlert.vue';
import SuccessAlert from './alert/SuccessAlert.vue';
import RegistrationForm from './RegistrationForm.vue';

export default {
  name: 'RegistrationModal',
  components: {
    ErrorAlert,
    SuccessAlert,
    LoginForm,
    RegistrationForm,
  },
  data: function () {
    return {
      showModal: false,
    };
  },
  methods: {},
  setup() {
    const formStore = useLoginStatusStore();
    return { formStore };
  },
};
</script>
../stores/LoginStatusStore
