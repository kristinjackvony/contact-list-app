const cookies = document.cookie
const token = cookies.substring(cookies.lastIndexOf("=") + 1)

const contactDiv = document.querySelector('div.contacts')

let tableHeaders = ["Name", "Birthdate", "Email", "Phone", "Address", "City, State/Province, Postal Code", "Country"]
    
const createContactTable = () => {
    while (contactDiv.firstChild) contactDiv.removeChild(contactDiv.firstChild)

    let contactTable = document.createElement('table')
    contactTable.className = 'contactTable'

    let contactTableHead = document.createElement('thead')
    contactTableHead.className = 'contactTableHead'

    let contactTableHeaderRow = document.createElement('tr')
    contactTableHeaderRow.classname = 'contactTableHeaderRow'

    tableHeaders.forEach(header => {
        let contactHeader = document.createElement('th')
        contactHeader.innerText = header
        contactTableHeaderRow.append(contactHeader)
    })

    contactTableHead.append(contactTableHeaderRow)
    contactTable.append(contactTableHead)

    let contactTableBody = document.createElement('tbody')
    contactTableBody.className = 'contactTable-Body'
    contactTable.append(contactTableBody)

    contactDiv.append(contactTable)
}

const appendContacts = (singleContact, singleContactIndex) => {
    const contactTable = document.querySelector('.contactTable')
    contactTable.setAttribute('id', 'myTable')

    let contactTableBodyRow = document.createElement('tr')
    contactTableBodyRow.className = 'contactTableBodyRow'

    let id = document.createElement('td')
    id.innerText = singleContact._id
    id.setAttribute("hidden", true )

    let name = document.createElement('td')
    name.innerText = singleContact.firstName + ' ' + singleContact.lastName

    let birthdate = document.createElement('td')
    if(singleContact.birthdate) {
        birthdate.innerText = singleContact.birthdate
    }  

    let email = document.createElement('td')
    if(singleContact.email) {
        email.innerText = singleContact.email
    }

    let phone = document.createElement('td')
    if(singleContact.phone) {
        phone.innerText = singleContact.phone
    }

    let address = document.createElement('td')
    let street1 = ''
    let street2 = ''
    if(singleContact.street1) {
        street1 = singleContact.street1
    }
    if(singleContact.street2) {
        street2 = singleContact.street2
    }
    address.innerText = street1 + ' ' + street2

    let address2 = document.createElement('td')
    let city = ''
    let stateProvince = ''
    let postalCode = ''
    if(singleContact.city) {
        city = singleContact.city
    }
    if(singleContact.stateProvince) {
        stateProvince = singleContact.stateProvince
    }
    if(singleContact.postalCode) {
        postalCode = singleContact.postalCode
    }
    address2.innerText = city + ' ' + stateProvince + ' ' + postalCode

    let country = document.createElement('td')
    if(singleContact.country) {
        country.innerText = singleContact.country
    }
   
    contactTableBodyRow.addEventListener('click', function(e) {
        localStorage.setItem('id', id.innerText)
        location.href = '/contactDetails'
    })

    contactTableBodyRow.append(id, name, birthdate, email, phone, address, address2, country)

    contactTable.append(contactTableBodyRow)
}

fetch('/contacts', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
}).then((response) => {
    response.json().then((contacts) => {
        if (contacts.error) {
            console.log(contacts.error)
        }  else {
            createContactTable()
            for (const contact of contacts) {
                let contactIndex = contacts.indexOf(contact) + 1
                appendContacts(contact, contactIndex)
            }
        }
    }) 
})