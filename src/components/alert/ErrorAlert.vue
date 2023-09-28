<template>
  <div class="containerWindow invert px-4 py-3 absolute" role="alert">
    <strong class="font-bold">{{ this.alertHeader }}</strong>
    <span class="block sm:inline"><br />{{ this.alertMessage }}</span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ErrorAlert',
  props: {
    alertHeader: String,
    alertMessage: String,
  },
  emits: ['closeError'],
};
</script>
