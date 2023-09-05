<template>
  <div class="containerWindow p-5 w-full">
    <div>
      <h2>Folders</h2>
      <p v-if="folders.length < 1" class="text-neutral-600 text-base text-opacity-60">
        Here you can store <br />
        all your projects
      </p>
      <div class="w-full text-center">
        <input
          class="textInput -hue-rotate-90 font-bold placeholder:opacity-60 placeholder:text-indigo-950 w-full"
          type="text"
          placeholder="New Folder"
        />
      </div>
    </div>
    <div class="w-full text-center">
      <div>
        <i
          class="cursor-pointer fa-solid fa-plus containerWindowReverse -hue-rotate-90 p-2 hover:drop-shadow-xl active:brightness-50"
          style="color: #dfe9fb"
        ></i>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useUserStore } from '../stores/UserStore';
export default {
  name: 'Folders',
  data: function () {
    return {
      addNewFolder: false,
      newFolderName: '',
      folders: [],
    };
  },
  beforeMount() {
    this.getFolders();
  },
  methods: {
    getFolders: function () {
      // this.$http
      //   .get('/content/folder', {
      //     params: {
      //       userId: this.userStore.id,
      //     },
      //   })
      //   .then((response) => {
      //     if (response.status == 200) {
      //       console.log('folders: ' + JSON.stringify(response.data.folders));
      //       this.folders = response.data.folders;
      //     } else {
      //       // TODO: võta vastu muu response kood.
      //     }
      //   });
    },
    addFolder: function () {
      this.$http.post('/content/folder', {
        params: {
          folderName: this.newFolderName,
          userId: this.userStore.id,
        },
      });
    },
  },

  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
};
</script>
