<template>
  <div class="containerWindow p-5 w-full min-w-[180px]">
    <div>
      <h2>Folders</h2>
      <div
        v-for="folder in this.folders"
        class="folder"
        :class="{ selectedFolder: isSelectFolder(folder) }"
        @click="selectFolder(folder.id)"
      >
        <p>{{ folder.folderName }}</p>
      </div>
      <p
        v-if="this.folders.length < 2"
        class="text-neutral-600 text-base text-opacity-60 text-center p-2 bg-indigo-950 bg-opacity-10 my-2"
      >
        Here you can store <br />
        all your projects
      </p>
      <div v-if="addNewFolder" class="w-full text-center">
        <input
          class="textInput -hue-rotate-90 font-bold placeholder:opacity-60 placeholder:text-indigo-950 w-full text-center"
          type="text"
          placeholder="New Folder"
        />
      </div>
      <div class="w-full text-center">
        <div v-if="!addNewFolder">
          <i
            @click="activateAddFolderField()"
            class="cursor-pointer fa-solid fa-plus containerWindowReverse -hue-rotate-90 p-2 hover:drop-shadow-xl active:brightness-50"
            style="color: #dfe9fb"
          ></i>
        </div>
        <div v-else>
          <i
            @click="addFolder()"
            class="cursor-pointer fa-solid fa-check containerWindowReverse -hue-rotate-90 p-2 hover:drop-shadow-xl active:brightness-50 mr-2"
            style="color: #ffffff"
          ></i>
          <i
            class="cursor-pointer fa-solid fa-x containerWindowReverse invert p-2 hover:drop-shadow-xl active:brightness-50 ml-2"
            style=""
          ></i>
        </div>
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
      selectedFolderId: undefined,
      folders: [],
    };
  },
  mounted() {
    this.getFolders();
  },
  methods: {
    getFolders: function () {
      this.$http
        .get('/content/folder', {
          params: {
            userId: this.$cookie.get('uid'),
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.folders = response.data;
            this.selectedFolderId = this.folders[0].id;
          } else {
            // TODO: võta vastu muu response kood.
          }
        });
    },
    activateAddFolderField: function () {
      this.addNewFolder = true;
    },
    deactivateAddFolderField: function () {
      this.addNewFolder = false;
      this.newFolderName = '';
    },
    addFolder: function () {
      this.$http.post('/content/folder', {
        params: {
          folderName: this.newFolderName,
          userId: this.userStore.id,
        },
      });
    },
    isSelectFolder: function (folder) {
      if (folder.id === this.selectedFolderId) {
        return true;
      }
    },

    selectFolder: function (folderId) {
      this.selectedFolderId = folderId;
    },
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
};
</script>
