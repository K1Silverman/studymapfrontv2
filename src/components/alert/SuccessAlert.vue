<template>
  <div class="containerWindow w-[90%] -hue-rotate-90 px-4 py-3 absolute" role="alert">
    <strong class="font-bold">{{ alertHeader }}</strong>
    <span class="block sm:inline"><br />{{ alertMessage }}</span>
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
