const express = require('express')
const isId = require('is-object-id')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// UI Endpoints
router.get('', (req,res) => {
    res.render('login', {
        title: 'Contact List App'
    })
})

router.get('/login', (req,res) => {
    res.render('login', {
        title: 'Contact List App'
    })
})

router.get('/addUser', (req, res) => {
    res.render('addUser', {
        title: 'Add User',
    })
})

router.get('/logout', (req, res) => {
    res.render('logout', {
        title: 'Contact List App'
    })
})

// API Endpoints
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie('token', token, {maxAge: 684000})
        res.status(201).send({user, token})
    } catch (e) {
        errorMessage = JSON.stringify(e)
        if(errorMessage.includes('MongoError')) {
            res.status(400).send({'message': 'Email address is already in use'})
        }  else {
            res.status(400).send(e)
        }
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('token', token, {maxAge:36000000})
        res.send({user, token})
    } catch (e) {
        res.status(401).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const user = req.user
    const updates = Object.keys(req.body)

    try {
    updates.forEach((update) => {
        user[update] = req.body[update]
    })

    await user.save()

    res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found'
    })
})

module.exports = router
