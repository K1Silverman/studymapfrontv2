<template>
  <div class="m-10 flex flex-grow flex-wrap">
    <div class="sticky mr-5 min-h-max">
      <folders @emitGetSelectedFolderIdEvent="setSelectedFolderId"></folders>
    </div>
    <div class="containerWindow mx-auto ml-[2%] h-min w-[80%] min-w-max max-w-[60%]">
      <div class="w-full mt-10 mb-10 pb-8">
        <div class="m-auto w-2/3">
          <NewPost></NewPost>
        </div>
      </div>
    </div>
    <div>
      <!-- POSTS -->
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

export default {
  name: 'HomeView',
  components: { NewPost, Folders },
  methods: {
    setSelectedFolderId: function (folderId: Number) {
      console.log('FolderId: ' + folderId);
      this.selectedFolderId = folderId;
      this.$http
        .get('/content/folder/post', {
          params: {
            userId: this.userStore.id,
            folderId: this.selectedFolderId,
          },
        })
        .then((response) => {
          console.log(response.data);
        });
    },
  },
  data: function () {
    return {
      selectedFolderId: 0,
      posts: [
        {
          id: 0,
          body: '',
          position: 1,
          timestamp: '',
          subject: {
            id: 0,
            name: '',
            theme: {
              id: 0,
              name: '',
              firstColor: '',
              secondaryColor: '',
              buttonsColor: '',
              status: '',
            },
            status: '',
          },
          attachments: [
            {
              id: 0,
              body: '',
              postId: 0,
              status: '',
            },
          ],
          ownerId: 0,
          status: '',
          folderId: 0,
        },
      ],
    };
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
          this.userStore.firstName = response.data.firstname;
          this.userStore.lastName = response.data.lastname;
          this.userStore.email = response.data.email;
          this.userStore.role = response.data.role;
          this.userStore.status = response.data.status;
          this.loginStatusStore.isLoggedIn = true;
        });
    }
  },
};
</script>
