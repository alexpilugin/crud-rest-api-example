const express = require('express')
const app = express()
const path = require('path')
const { v4 } = require('uuid')

// Our db on a serverside:
const CONTACTS = [
  {id: v4(), name: 'Default Contact', value: '+44-0000-000-0000', marked: false}
]

app.use(express.json())

// GET
app.get('/api/contacts', (req, res) => {
  setTimeout( () => {
    res.status(200).json(CONTACTS)
  }, 1000)
})

// POST
app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false}
  CONTACTS.push(contact)
  res.status(201).json(contact)
})

app.use(express.static(path.resolve(__dirname, 'client')))

// GET
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => {
  console.log('Server has been started on port 3000...')
})