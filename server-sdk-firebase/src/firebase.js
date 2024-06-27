require('dotenv').config();

 const {initializeApp, applicationDefault } = require('firebase-admin/app')
 const { getAuth } = require("firebase-admin/auth")

initializeApp({
    credential: applicationDefault()
})

const auth = getAuth()

module.exports = {auth}