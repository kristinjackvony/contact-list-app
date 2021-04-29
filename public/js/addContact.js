const contactForm = document.querySelector('#add-contact')
const errorMessage = document.querySelector('#error')
const cookies = document.cookie
const token = cookies.substring(cookies.lastIndexOf("=") + 1)

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const firstName = contactForm.querySelector('#firstName').value
    const lastName = contactForm.querySelector('#lastName').value
    var birthdate = contactForm.querySelector('#birthdate').value
    const email = contactForm.querySelector('#email').value
    const phone = contactForm.querySelector('#phone').value
    const street1 = contactForm.querySelector('#street1').value
    const street2 = contactForm.querySelector('#street2').value
    const city = contactForm.querySelector('#city').value
    const stateProvince = contactForm.querySelector('#stateProvince').value
    const postalCode = contactForm.querySelector('#postalCode').value
    const country = contactForm.querySelector('#country').value

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
    
    fetch('/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(bodyData)
    }).then((response) => {
        if(response.status != 201) {
            response.json().then((data) => {
                errorMessage.innerHTML =  data.message
            })
        }
        else {
            window.location = "/contactList"
        }    
    }) 
})