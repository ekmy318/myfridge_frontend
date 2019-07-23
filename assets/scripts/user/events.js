'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const groceryApi = require('../grocery/api')
const groceryUi = require('../grocery/ui')
const store = require('../store')

const onSignUp = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  store.save = formData
  api.signUp(formData)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData)
    .then(ui.signInSuccess)
    .then(groceryApi.getGroceries)
    .then(groceryUi.getGroceriesSuccess)
    .catch(ui.signInFailure)
}

const onGuest = event => {
  event.preventDefault()
  const guestInfo = {
    'credentials': {
      'email': 'e@e',
      'password': 'e'
    }
  }
  api.signIn(guestInfo)
    .then(ui.signInSuccess)
    .then(groceryApi.getGroceries)
    .then(groceryUi.getGroceriesSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.changePassword(formData)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = () => {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
  store.user = undefined
}

const addHandlers = () => {
  $(document).on('submit', '#sign-in', onSignIn)
  $(document).on('submit', '#sign-up', onSignUp)
  $(document).on('click', '.guest', onGuest)
  $(document).on('submit', '#change-password', onChangePassword)
  $(document).on('click', '#sign-out', onSignOut)
}

module.exports = {
  addHandlers
}
