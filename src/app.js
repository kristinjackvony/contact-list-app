const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')

require('./db/mongoose')
const contactRouter = require('./routers/contact')
const userRouter = require('./routers/user')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.use(express.json())
app.use(contactRouter)
app.use(userRouter)
app.use(cookieParser)

module.exports = app