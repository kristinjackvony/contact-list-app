const cookies = document.cookie
const token = cookies.substring(cookies.lastIndexOf("=") + 1)

fetch('/users/logout', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + token
    }
}).then((response) => {
    if (response.error) {
        console.log(response.error)
    }  else {
        window.location = "/"
    }
}) 