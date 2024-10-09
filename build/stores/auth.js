import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const { data } = await useFetch('/api/login', {
          method: 'POST',
          body: { email, password },
        })
        this.token = data.value.token
        this.user = data.value.user
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    async register(name, email, password) {
      try {
        const { data } = await useFetch('/api/register', {
          method: 'POST',
          body: { name, email, password },
        })
        this.token = data.value.token
        this.user = data.value.user
      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },
    async getUser() {
      try {
        const { data } = await useFetch('/api/user', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.user = data.value
        return this.user
      } catch (error) {
        console.error('Failed to fetch user:', error)
        throw error
      }
    },
    async addEmail(email) {
      try {
        await useFetch('/api/user/emails', {
          method: 'POST',
          body: { email },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
      } catch (error) {
        console.error('Failed to add email:', error)
        throw error
      }
    },
    async removeEmail(email) {
      try {
        await useFetch('/api/user/emails', {
          method: 'DELETE',
          body: { email },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
      } catch (error) {
        console.error('Failed to remove email:', error)
        throw error
      }
    },
    logout() {
      this.user = null
      this.token = null
    },
  },
})