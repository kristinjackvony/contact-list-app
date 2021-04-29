const signupForm = document.querySelector('#add-user')
const errorMessage = document.querySelector('#error')
var token = ''

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const firstName = signupForm.querySelector('#firstName').value
    const lastName = signupForm.querySelector('#lastName').value
    const email = signupForm.querySelector('#email').value
    const password = signupForm.querySelector('#password').value

    const bodyData = {'firstName': firstName, 'lastName': lastName, 'email': email, 'password': password}

    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }).then((response) => {
        if(response.status != 201) {
            response.json().then((data) => {
                errorMessage.innerHTML =  data.message
            })
        }
        else {
            response.json().then((data) => {    
                token = data.token
                console.log(token)
                window.location = "/contactList"
            })
        }
    })
})