
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    rol: null,
    userData: null,
    token: null
  }),
  actions: {
    login(user) {
      this.isLoggedIn = true
      this.rol = user.rol
      this.userData = user
      this.token = user.token || null
    },
    logout() {
      this.isLoggedIn = false
      this.rol = null
      this.userData = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
})