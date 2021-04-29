const form = document.querySelector('#edit-contact')
const errorMessage = document.querySelector('#error')
const id  = localStorage.getItem('id')

const cookies = document.cookie
const token = cookies.substring(cookies.lastIndexOf("=") + 1)

const populateForm = (contact) => {
    form.querySelector('#firstName').value = contact.firstName
    form.querySelector('#lastName').value = contact.lastName
    if(contact.birthdate) {
        form.querySelector('#birthdate').value = contact.birthdate
    }
    if(contact.email) {
        form.querySelector('#email').value = contact.email
    }
    if(contact.phone) {
        form.querySelector('#phone').value = contact.phone
    }
    if(contact.street1) {
        form.querySelector('#street1').value = contact.street1
    }
    if(contact.street2) {
        form.querySelector('#street2').value = contact.street2
    }
    if(contact.city) {
        form.querySelector('#city').value = contact.city
    }
    if(contact.stateProvince) {
        form.querySelector('#stateProvince').value = contact.stateProvince
    }
    if(contact.postalCode) {
        form.querySelector('#postalCode').value = contact.postalCode
    }
    if(contact.country) {
        form.querySelector('#country').value = contact.country
    }
}

fetch('/contacts/' + id, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    }
}).then((response) => {
    response.json().then((contact) => {
        if (contact.error) {
            console.log(contact.error)
        }  else {
            populateForm(contact)
        }
    }) 
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const firstName = form.querySelector('#firstName').value
    const lastName = form.querySelector('#lastName').value
    const birthdate = form.querySelector('#birthdate').value
    const email = form.querySelector('#email').value
    const phone = form.querySelector('#phone').value
    const street1 = form.querySelector('#street1').value
    const street2 = form.querySelector('#street2').value
    const city = form.querySelector('#city').value
    const stateProvince = form.querySelector('#stateProvince').value
    const postalCode = form.querySelector('#postalCode').value
    const country = form.querySelector('#country').value

    const bodyData = {
        'firstName': firstName,
        'lastName': lastName
    }

    if(birthdate) {
        bodyData.birthdate = birthdate
    }

    if(email) {
        bodyData.email = email
    }

    if(phone) {
        bodyData.phone = phone
    }

    if(street1) {
        bodyData.street1 = street1
    }

    if(street2) {
        bodyData.street2 = street2
    }

    if(city) {
        bodyData.city = city
    }

    if(stateProvince) {
        bodyData.stateProvince = stateProvince
    }

    if(postalCode) {
        bodyData.postalCode = postalCode
    }

    if(country) {
        bodyData.country = country
    }

    fetch('/contacts/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(bodyData)
    }).then((response) => {
        if(response.status != 200) {
            response.json().then((data) => {
                errorMessage.innerHTML =  data.message
            })
        } else {
            window.location = "/contactDetails"
        }
    }) 
})