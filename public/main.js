const editProfileBtn = document.getElementById('edit-save')

const getProfileElements = () => {
  const name = document.getElementById('fullname')
  const city = document.getElementById('city')
  return { name, city }
}
const editClick = function (event) {
  editProfileBtn.innerHTML = 'Save Profile'
  const { name, city } = getProfileElements()
  const currName = name.innerHTML
  const currCity = city.innerHTML
  name.outerHTML = `<input id="fullname" value="${currName}"></input>`
  city.outerHTML = `<input id="city" value="${currCity}"></input>`
}

const saveClick = function (event) {
  const { name, city } = getProfileElements()
  editProfileBtn.innerHTML = 'Edit Profile'
  const newName = name.value
  const newCity = city.value
  name.outerHTML = `<span id="fullname">${newName}</span>`
  city.outerHTML = `<span id="city">${newCity}</span>`
  event.preventDefault()
  fetch('/profile-update', {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ newName, newCity }),
  })
    .then(result => result.json())
    .then(console.log)
}

if (editProfileBtn) {
  editProfileBtn.addEventListener('click', function (event) {
    if (this.innerHTML.startsWith('E')) {
      editClick(event)
    } else {
      saveClick(event)
    }
  })
}
