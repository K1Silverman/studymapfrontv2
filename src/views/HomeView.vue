<template>
  <div class="m-10 flex flex-grow flex-wrap">
    <div class="sticky mr-5 min-h-max">
      <folders @emitSelectedFolderIdEvent="this.setSelectedFolderId"></folders>
    </div>
    <div class="grid mx-auto ml-[2%] h-min w-[80%] max-w-[60%]">
      <div class="containerWindow">
        <div class="w-full mt-10 pb-8">
          <div class="m-auto max-w-[70%]">
            <NewPost
              :selected-folder-id="this.selectedFolderId"
              :chapters="this.chapters"
              @emitUpdateChaptersEvent="this.updateChapters"
              @emitPostSavedEvent="this.appendChapterPosts"
            ></NewPost>
          </div>
        </div>
      </div>
      <div>
        <div
          v-if="this.chapters == undefined || this.chapters.length < 1"
          class="containerWindow -hue-rotate-90 text-center bg-opacity-5"
        >
          <p class="font-bold">Be sure to create a Chapter before saving some posts</p>
        </div>
        <div v-else>
          <Chapter
            v-for="chapter in orderedChapters"
            :key="chapter.id"
            class="containerWindow"
            :chapter="chapter"
          ></Chapter>
        </div>
      </div>
    </div>
    <div class="sticky">
      <button class="windowButton -hue-rotate-90 right-1 px-2 p-2 w-[100px] absolute">
        Add post
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '../stores/UserStore';
import Folders from '../components/Folders.vue';
import NewPost from '../components/NewPost.vue';
import { useLoginStatusStore } from '../stores/LoginStatusStore';
import Chapter from '../components/Chapter.vue';

export default {
  name: 'HomeView',
  components: { NewPost, Folders, Chapter },

  data: function () {
    return {
      selectedFolderId: Number,
      orderAsc: true,
      chapters: [
        {
          id: Number,
          name: '',
          theme: {
            id: Number,
            name: '',
            firstColor: '',
            secondaryColor: '',
            buttonsColor: '',
            status: '',
          },
          position: Number,
          status: '',
          folderId: Number,
          posts: [
            {
              id: Number,
              subject: '',
              body: '',
              position: Number,
              timestamp: '',
              chapterId: Number,
              status: '',
            },
          ],
        },
      ],
    };
  },
  watch: {
    selectedFolderId: function (newVal) {
      this.$http
        .get('/content/folder/chapter', {
          params: {
            userId: this.$cookie.get('uid'),
            folderId: newVal,
          },
        })
        .then((response) => {
          this.chapters = response.data;
        });
    },
  },
  methods: {
    setSelectedFolderId: function (folderId: Number) {
      this.selectedFolderId = folderId;
    },
    updateChapters: function (chapters) {
      this.chapters = chapters;
    },
    appendChapterPosts: function (newPost) {
      const chapter = this.chapters.find((chapter) => chapter.id === newPost.chapterId);
      chapter.posts.push(newPost);
    },
    toggleOrder: function () {
      this.orderAsc = !this.orderAsc;
    },
  },
  computed: {
    orderedChapters() {
      return this.chapters.slice().sort((a, b) => a.position - b.position);
    },
  },
  setup() {
    const userStore = useUserStore();
    const loginStatusStore = useLoginStatusStore();
    return { userStore, loginStatusStore };
  },
  beforeMount() {
    if (this.$cookie.get('sessionHash') !== undefined) {
      this.$http
        .get('/user/login', {
          params: {
            sessionHash: this.$cookie.get('sessionHash'),
          },
        })
        .then((response) => {
          this.userStore.id = response.data.id;
          this.userStore.firstName = response.data.firstName;
          this.userStore.lastName = response.data.lastName;
          this.userStore.email = response.data.email;
          this.userStore.role = response.data.roleName;
          this.userStore.status = response.data.status;
          this.loginStatusStore.isLoggedIn = true;
        });
    }
  },
};
</script>
