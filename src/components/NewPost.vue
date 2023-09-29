<template>
  <div>
    <h2>What NEW have you learned?</h2>
    <div class="justify-start">
      <div>
        <button
          class="regularButton pl-2 my-2 ml-0 w-full text-left"
          @click="this.openModal()"
          v-if="this.chapter.name != ''"
        >
          {{ this.chapter.name }}
        </button>
        <div v-else>
          <button class="regularButton px-3" @click="this.openModal()">Choose Chapter</button>
        </div>
        <ChooseChapter
          v-model="this.show"
          :folder-id="this.selectedFolderId"
          :chapters="this.chapters"
          @closeModalEvent="this.closeModal()"
          @emitAddChapterEvent="this.emitChapters"
          @emitChooseChapterEvent="this.selectChapter"
        ></ChooseChapter>
        <div class="mb-2 w-full">
          <input
            v-model="this.post.subject"
            class="textInputReverse w-full font-bold placeholder:opacity-60 mr-5 mb-0 placeholder:text-indigo-950"
            type="text"
            placeholder="Subject"
          />
        </div>
      </div>
    </div>
    <div class="">
      <QuillEditor spellcheck="false" v-model:content="this.editorContent"></QuillEditor>
    </div>
    <div v-html="this.post.body"></div>
    <div class="flex justify-end mt-[20px]">
      <button class="regularButton px-3" @click="this.savePost()">Save Post</button>
      <button class="regularButton px-3" @click="this.resetPost()">reset Post</button>
    </div>
  </div>
</template>

<script lang="ts">
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { QuillEditor } from '@vueup/vue-quill';
import ChooseChapter from './modals/ChooseChapter.vue';

export default {
  // TODO: Posti submittimise funktsionaalsus
  name: 'NewPost',
  components: { QuillEditor, ChooseChapter },
  props: ['selectedFolderId', 'chapters'],
  data: function () {
    return {
      editorContent: undefined,
      show: false,
      chapter: {
        id: Number,
        name: '',
      },
      post: {
        subject: '',
        body: '',
        position: Number,
        timestamp: '',
        chapterId: Number,
        status: 'Active',
      },
    };
  },
  watch: {
    editorContent: function (val) {
      var converter = new QuillDeltaToHtmlConverter(val.ops);
      this.post.body = converter.convert();
    },
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
      this.post.chapterId = chapter.id;
    },
    savePost: function () {
      this.post.timestamp = new Date().toISOString();
      this.$http.post('/content/folder/chapter/post', this.post).then((response) => {
        this.$emit('emitPostSavedEvent', response.data);
      });
      this.resetPost();
    },
    resetPost: function () {
      //TODO: New Post ei reseti ära millegipärast.
      this.editorContent = undefined;
      this.chapter.id = Number;
      this.chapter.name = '';
      this.post.subject = '';
      this.post.body = '';
      this.post.position = Number;
      this.post.timestamp = '';
      this.post.chapterId = Number;
      this.post.status = 'Active';
    },
  },
};
</script>

<style scoped></style>
