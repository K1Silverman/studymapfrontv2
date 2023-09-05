import { defineStore } from "pinia";

export const useLoginStatusStore = defineStore('loginStatusStore', {
  state: () => ({
    isLogIn: false,
    isLoggedIn: false,
  }),
  actions: {
    toggleIsLogIn() {
      this.isLogIn = !this.isLogIn;
    }
  },
  }
)