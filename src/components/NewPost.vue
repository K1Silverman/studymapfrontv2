<template>
  <div>
    <div class="mb-2 flex-auto">
      
      <div class="p-1 pl-0">
        <label>
          Folder
        </label>
        <select>
          <option>-- empty --</option>
        </select>
        <i class="fa-regular fa-pen-to-square p-1 hover:bg-[#070906] hover:rounded hover:p-1" style="color: #dfe9fb;"></i>
      </div>
      <input type="text" placeholder="Subject" />
    </div>
      <div class="bg-white"><QuillEditor></QuillEditor></div>
    </div>
</template>

<script lang="ts">
import { QuillEditor } from '@vueup/vue-quill';


export default {
    name: 'NewPost',
    components: { QuillEditor }
};
</script>

<style scoped>
</style>
