import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: '',
  })
})