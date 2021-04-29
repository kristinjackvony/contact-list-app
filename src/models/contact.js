const mongoose = require('mongoose')
const validator = require('validator')

const Contact = mongoose.model('Contact', {
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    birthdate: {
        type: String,
        validate(value) {
            if (!validator.isDate(value)) {
                throw new Error('Birthdate is invalid')
            }
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                //local text between 1 and 64 characters
                //domain text between 1 and 63 characters
                //text after dot between 2 and 63 characters
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type: String,
        trim: true,
        maxlength: 15,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Phone number is invalid')
            }
        }
    },
    street1: {
        type: String,
        maxlength: 40,
        trim: true
    },
    street2: {
        type: String,
        maxlength: 40,
        trim: true
    },
    city: {
        type: String,
        maxlength: 40,
        trim: true
    },
    stateProvince: {
        type: String,
        maxlength: 20,
        trim: true,
    },
    postalCode: {
        type: String,
        maxlength: 10,
        trim: true,
        validate(value) {
            if (!validator.isPostalCode(value, 'any')) {
                throw new Error('Postal code is invalid')
            }
        }
    },
    country: {
        type: String,
        maxlength: 40,
        trim: true
    }
})

module.exports = Contact

