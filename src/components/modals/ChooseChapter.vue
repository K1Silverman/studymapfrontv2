<template>
  <VueFinalModal
    class="chapter-modal"
    content-class="containerWindow chapterModal"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="min-h-min">
      <h3>Choose chapter</h3>
      <label>Create new: </label>
      <input
        v-model="this.newChapterName"
        class="textInput font-bold placeholder:opacity-60 mr-5 placeholder:text-indigo-950"
        type="text"
        placeholder="Chapter name"
      />
      <i
        class="cursor-pointer fa-solid fa-plus containerWindowReverse -hue-rotate-90 p-2 hover:drop-shadow-xl active:brightness-50"
        @click="this.saveNewChapter()"
        style="color: #dfe9fb"
      ></i>
      <div v-if="this.chapters == undefined || this.chapters.length < 1">
        <p class="font-bold">Create a new chapter for your next post</p>
      </div>
      <div class="grid" v-else>
        <span class="font-bold">Or choose an existing one: </span>
        <button
          class="windowButton m-2"
          :class="{ selectedChapter: this.isSelectedChapter(chapter.id) }"
          @click="selectChapter(chapter.id)"
          v-for="chapter in chapters"
        >
          {{ chapter.name }}
        </button>
      </div>
      <div class="mt-2">
        <button
          class="windowButton -hue-rotate-90"
          @click="
            this.closeModal();
            this.saveSelection();
          "
        >
          Save
        </button>
        <button class="windowButton invert" @click="closeModal">Close</button>
      </div>
    </div>
  </VueFinalModal>
</template>
<script>
import { VueFinalModal } from 'vue-final-modal';

export default {
  name: 'ChooseChapter',
  components: {
    VueFinalModal,
  },
  props: ['folderId', 'chapters'],
  data: function () {
    return {
      newChapterName: '',
      selectedChapterId: Number,
    };
  },
  methods: {
    closeModal: function () {
      this.$emit('closeModalEvent');
    },
    saveNewChapter: function () {
      this.$http
        .post('/content/folder/chapter', {
          id: null,
          name: this.newChapterName,
          theme: null,
          position: null,
          status: 'Active',
          folderId: this.folderId,
          posts: null,
        })
        .then((response) => {
          this.$emit('emitAddChapterEvent', response.data);
        });
    },
    selectChapter: function (chapterId) {
      this.selectedChapterId = chapterId;
    },
    isSelectedChapter: function (chapterId) {
      if (chapterId === this.selectedChapterId) {
        return true;
      }
    },
    saveSelection: function () {
      let selectedChapter = this.chapters.filter((chapter) => {
        return chapter.id === this.selectedChapterId;
      });
      this.$emit('emitChooseChapterEvent', selectedChapter[0]);
    },
  },
};
</script>

<style>
.chapter-modal {
  display: grid;
  justify-content: center;
}
</style>
