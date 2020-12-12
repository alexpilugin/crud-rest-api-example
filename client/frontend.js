import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

new Vue({
  el: '#app',
  data() {
    return {
      form: {
        name: '',
        value: ''
      },
      contacts: []
    }
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