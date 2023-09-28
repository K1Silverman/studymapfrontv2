<template>
  <div>
    <h2>What NEW have you learned?</h2>
    <div class="mb-2 justify-start">
      <div class="p-1 pl-0">
        <div>
          <input
            class="textInputReverse font-bold placeholder:opacity-60 mr-5 placeholder:text-indigo-950"
            type="text"
            placeholder="Subject"
          />
        </div>
        <button
          class="windowButton my-2 ml-0 w-full text-left"
          @click="this.openModal()"
          v-if="this.chapter.name !== ''"
        >
          {{ this.chapter.name }}
        </button>
        <div v-else>
          <button class="regularButton" @click="this.openModal()">Choose Chapter</button>
        </div>
        <ChooseChapter
          v-model="this.show"
          :folder-id="this.selectedFolderId"
          :chapters="this.chapters"
          @closeModalEvent="this.closeModal()"
          @emitAddChapterEvent="this.emitChapters"
          @emitChooseChapterEvent="this.selectChapter"
        ></ChooseChapter>
      </div>
    </div>
    <div class=""><QuillEditor></QuillEditor></div>
    <div class="flex justify-end mt-[20px]">
      <button class="regularButton">Save Post</button>
    </div>
  </div>
</template>

<script lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import ChooseChapter from './modals/ChooseChapter.vue';

export default {
  // TODO: Posti submittimise funktsionaalsus
  name: 'NewPost',
  components: { QuillEditor, ChooseChapter },
  props: ['selectedFolderId', 'chapters'],
  data: function () {
    return {
      show: false,
      chapter: {
        id: Number,
        name: '',
      },
    };
  },
  methods: {
    openModal: function () {
      this.show = true;
    },
    closeModal: function () {
      this.show = false;
    },
    emitChapters: function (chapters) {
      this.$emit('emitUpdateChaptersEvent', chapters);
    },
    selectChapter: function (chapter) {
      this.chapter.id = chapter.id;
      this.chapter.name = chapter.name;
    },
  },
};
</script>

<style scoped></style>
