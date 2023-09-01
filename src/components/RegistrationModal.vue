<template>
  <div class="containerWindow w-[35%] min-w-min h-min max-h-min">
    <div class="m-auto">
      <div class="h-36">
        <h1>Registration</h1>
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
      <RegistrationForm @set-alert="setAlert" />
    </div>
    <div>
      <LoginModal :show="showModal"></LoginModal>
    </div>
  </div>
</template>

<script lang="ts">
import LoginModal from './LoginModal.vue';
import ErrorAlert from './alert/ErrorAlert.vue';
import SuccessAlert from './alert/SuccessAlert.vue';
import RegistrationForm from './RegistrationForm.vue';

export default {
  name: 'RegistrationModal',
  components: {
    ErrorAlert,
    SuccessAlert,
    LoginModal,
    RegistrationForm,
  },
  emits: ['closeModal'],
  data: function () {
    return {
      alert: {
        type: '',
        header: '',
        message: '',
      },
      showModal: false,
    };
  },
  methods: {
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
    toggleModal: function () {
      this.showModal = !this.showModal;
    },
  },
};
</script>
