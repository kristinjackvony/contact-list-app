const signupForm = document.querySelector('form')
const errorMessage = document.querySelector('#error')
var token = ''

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const email = signupForm.querySelector('#email').value
    const password = signupForm.querySelector('#password').value

    const bodyData = {'email': email, 'password': password}

    fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }).then((response) => {
        if(response.status != 200) {
            errorMessage.innerHTML = 'Incorrect username or password'
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