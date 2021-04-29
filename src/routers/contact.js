const express = require('express')
const isId = require('is-object-id')
const Contact = require('../models/contact')
const auth = require('../middleware/auth')
const router = new express.Router()

// UI Endpoints
router.get('/addContact', (req, res) => {
    res.render('addContact', {
        title: 'Add Contact',
    })
})

router.get('/contactList', (req, res) => {
    res.render('contactList', {
        title: 'Contact List',
    })
})

router.get('/contactDetails/', (req, res) => {
    res.render('contactDetails', {
        title: 'Contact Details',
    })
})

router.get('/editContact', (req, res) => {
    res.render('editContact', {
        title: 'Edit Contact',
    })
})

// API Endpoints
router.post('/contacts', auth, async (req, res) => {
    const contact = new Contact({
        ...req.body,
        owner: req.user._id
    })

    try {
        await contact.save()
        res.status(201).send(contact)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/contacts', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({owner: req.user._id}).sort({lastName:1, firstName:1})
        res.send(contacts)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/contacts/:id', auth, async (req, res) => {
    const _id = req.params.id
    if(!(isId(_id))){
        return res.status(400).send("Invalid Contact ID")
    }
    else {
        try {
            const contact = await Contact.findOne({ _id, owner: req.user._id})
            if (!contact) {
                return res.status(404).send()
            }
            res.send(contact)
        } catch (e) {
            res.status(500).send(e)
        }  
    }  
})

router.put('/contacts/:id', auth, async (req, res) => {
    const _id = req.params.id
    if(!(isId(_id))){
        return res.status(400).send("Invalid Contact ID")
    }
    else {
        try {
            const contact = await Contact.findOneAndUpdate({ _id, owner: req.user._id}, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthdate: req.body.birthdate,
                email: req.body.email,
                phone: req.body.phone,
                street1: req.body.street1,
                street2: req.body.street2,
                city: req.body.city,
                stateProvince: req.body.stateProvince,
                postalCode: req.body.postalCode,
                country: req.body.country
            }, { new: true, runValidators: true, useFindAndModify: false})

            if (!contact) {
                return res.status(404).send()
            }
            res.send(contact)
        } catch (e) {
            console.log(e)
            res.status(400).send(e)
        }
    }   
})

router.patch('/contacts/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    if(!(isId(_id))){
        return res.status(400).send("Invalid Contact ID")
    }
    else {
        try {
            const contact = await Contact.findOneAndUpdate({ _id, owner: req.user._id}, { new: true, runValidators: true, useFindAndModify: false})

            if (!contact) {
                return res.status(404).send()
            }
            updates.forEach((update) => contact[update] = req.body[update])
            await contact.save()
            res.send(contact)
        } catch (e) {
            res.status(400).send(e)
        }
    }
})

router.delete('/contacts/:id', auth, async (req, res) => {
    const _id = req.params.id
    if(!(isId(_id))){
        return res.status(400).send("Invalid Contact ID")
    }
    else {
        try {
            const contact = await Contact.findOneAndDelete({_id, owner: req.user._id})
            if (!contact) {
                return res.status(404).send()
            }

            res.send('Contact deleted')
        } catch (e) {
            res.status(500).send(e)
        }
    }
})
module.exports = router