<template>
  <div>
    <Transition name="fade">
      <div class="modal-overlay" 
           v-if="show" 
           @click="$emit('closeModal')"></div>
    </Transition>
    <Transition name="pop">
      <div class="modal" 
           role="dialog" 
           v-if="show"
           >
        <h1>Vue Transitions</h1>
        <p>The <code>&lt;transition&gt;</code> component in Vue can create wonderful animated entrances and exits.</p>
        <button @click="$emit('closeModal')" class="button">Hide Modal</button>
  
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
      
    }
  },
}
</script>