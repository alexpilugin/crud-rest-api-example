import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

Vue.component('loader', {
  template: `
    <div style="display: flex; justify-content: center; align-items: center;">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `
})

new Vue({
  el: '#app',
  data() {
    return {
      form: {
        name: '',
        value: ''
      },
      contacts: [],
      loading: false
    }
  }, 
  async mounted() {
    this.loading = true
    this.contacts = await request('/api/contacts')
    this.loading = false
  },
  computed: {
    canCreate() {
      return this.form.name.trim() && this.form.value.trim()
    }
  },
  methods: {
    onSubmit() {
      const {...contact} = this.form
      this.contacts.push({...contact, id: Date.now(), marked: false})
      this.form.name = this.form.value = ''
    },
    tagContact(id) {
      console.log("tagContact: " + id)
      const contact = this.contacts.find(c => c.id === id)
      contact.marked = true
    },
    deleteContact(id) {
      this.contacts = this.contacts.filter(c => c.id !== id)
    }
  }
})

async function request(url, method = 'GET', data = null) {
  try {
    const headers = {}
    let body
    if (data) {
      headers['Content-Type'] = 'application/json',
      body = JSON.stringify(data)
    }
    const response = await fetch(url, {
      method,
      headers,
      body
    })
    return await response.json()
  } catch (e) {
    console.error(e.message)
  }
}