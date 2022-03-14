//Named export - Has a name. Have as many as needed
const message = 'Some message from myModule.js'
const name = 'Lalitus'

//Default - Has no name. Youn only have one
const location = 'Zapopan'

const getGreeting = (name) => {
  return `Welcome to the course ${name}`
}

export { message, name, getGreeting, location as default }
