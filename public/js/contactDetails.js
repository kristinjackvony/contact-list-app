const form = document.querySelector('#contactDetails')
const deleteButton = document.querySelector('#delete')
const id  = localStorage.getItem('id')

const cookies = document.cookie
const token = cookies.substring(cookies.lastIndexOf("=") + 1)

const populateForm = (contact) => {
    form.querySelector('#firstName').innerHTML = contact.firstName
    form.querySelector('#lastName').innerHTML = contact.lastName
    if(contact.birthdate) {
        form.querySelector('#birthdate').innerHTML = contact.birthdate
    }
    if(contact.email) {
        form.querySelector('#email').innerHTML = contact.email
    }
    if(contact.phone) {
        form.querySelector('#phone').innerHTML = contact.phone
    }
    if(contact.street1) {
        form.querySelector('#street1').innerHTML = contact.street1
    }
    if(contact.street2) {
        form.querySelector('#street2').innerHTML = contact.street2
    }
    if(contact.city) {
        form.querySelector('#city').innerHTML = contact.city
    }
    if(contact.stateProvince) {
        form.querySelector('#stateProvince').innerHTML = contact.stateProvince
    }
    if(contact.postalCode) {
        form.querySelector('#postalCode').innerHTML = contact.postalCode
    }
    if(contact.country) {
        form.querySelector('#country').innerHTML = contact.country
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

deleteButton.addEventListener('click', (e) => {
    var response = confirm('Are you sure you want to delete this contact?')
    if(response == true) {
        fetch('/contacts/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
        }).then((response) => {
            if (response.error) {
                console.log(response.error)
            }  else {
                window.location = "/contactList"
            }
        }) 
    }    
})

