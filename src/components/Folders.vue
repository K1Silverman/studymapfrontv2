<template>
  <div class="containerWindow p-5 w-full min-w-[300px]">
    <div>
      <h2>Folders</h2>
      <div
        v-for="folder in this.folders"
        :key="folder.id"
        class="folder"
        :class="{ selectedFolder: this.isSelectedFolder(folder.id) }"
        @click="this.selectFolder(folder.id)"
      >
        <label>{{ folder.folderName }}</label>
      </div>
      <p
        v-if="this.folders.length < 2"
        class="text-neutral-600 text-base text-opacity-60 text-center p-2 bg-indigo-950 bg-opacity-10 my-2"
      >
        Here you can store <br />
        all your projects
      </p>
      <input
        v-if="this.addNewFolder"
        v-model="this.newFolderName"
        class="textInput w-full -hue-rotate-90 font-bold placeholder:opacity-60 placeholder:text-indigo-950 text-center"
        type="text"
        placeholder="New Folder"
      />
      <div class="text-center">
        <div v-if="!this.addNewFolder">
          <i
            @click="this.activateAddFolderField()"
            class="cursor-pointer fa-solid fa-plus containerWindowReverse -hue-rotate-90 p-2 hover:drop-shadow-xl active:brightness-50"
            style="color: #dfe9fb"
          ></i>
        </div>
        <div v-else class="w-[50%] mx-auto">
          <i
            @click="this.addFolder()"
            class="cursor-pointer fa-solid fa-check containerWindowReverse -hue-rotate-90 p-2 hover:drop-shadow-xl active:brightness-50 mr-2"
            style="color: #ffffff"
          ></i>
          <i
            @click="this.deactivateAddFolderField()"
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
          if (this.$cookie.get('selectedFolderId')) {
            this.selectedFolderId = parseInt(this.$cookie.get('selectedFolderId'));
          }

          this.emitSelectedFolderId();
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
      if (this.newFolderName === '') {
        this.newFolderName = 'Unnamed folder';
      }
      this.$http
        .post('/content/folder', {
          id: 0,
          folderName: this.newFolderName,
          position: 0,
          status: '',
          userId: this.userStore.id,
        })
        .then((response) => {
          this.folders = response.data;
          this.deactivateAddFolderField();
        });
    },
    isSelectedFolder: function (folderId: Number) {
      if (folderId === this.selectedFolderId) {
        return true;
      } else {
        return false;
      }
    },

    selectFolder: function (folderId: Number) {
      this.selectedFolderId = folderId;
      this.$cookie.set('selectedFolderId', this.selectedFolderId);
      this.emitSelectedFolderId();
    },
    emitSelectedFolderId: function () {
      this.$emit('emitSelectedFolderIdEvent', this.selectedFolderId);
    },
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  mounted() {
    this.getFolders();
  },
};
</script>
