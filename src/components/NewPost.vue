<template>
  <div>
    <h2>What NEW have you learned?</h2>
    <div class="mb-2 flex-auto">
      <div class="p-1 pl-0 flex">
        <div>
          <input
            class="textInput font-bold placeholder:opacity-60 mr-5 placeholder:text-indigo-950"
            type="text"
            placeholder="Subject"
          />
        </div>
        <div class="dropDown font-bold text-indigo-950 w-min text-left flex justfy-between">
          <div class="opacity-60">Folder</div>
          <div>
            <i
              class="cursor-pointer fa-regular fa-pen-to-square hover:drop-shadow-xl active:brightness-50 ml-2"
              style="color: #dfe9fb"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white"><QuillEditor></QuillEditor></div>
  </div>
</template>

<script lang="ts">
import { QuillEditor } from '@vueup/vue-quill';

export default {
  name: 'NewPost',
  components: { QuillEditor },
};
</script>

<style scoped></style>
