const editButton = document.getElementById('edit-save')
const name = document.getElementById('fullname')
const city = document.getElementById('city')

const editClick =  (event) => {
  editButton.innerHTML = 'Save Profile'
  const currName = name.innerHTML
  const currCity = city.innerHTML
  name.outerHTML = `<input id="fullname" value="${currName}"></input>`
  city.outerHTML = `<input id="city" value="${currCity}"></input>`
}

const saveClick = function (event) {
  editButton.innerHTML = 'Edit Profile'
  const newName = name.innerHTML
  const newCity = city.innerHTML
  name.outerHTML = `<span id="fullname">${newName}</span>`
  city.outerHTML = `<span id="city">${newCity}</span>`
  //fetch('/')
}

editButton.addEventListener('click', function (event) {
    if(this.innerHTML.startsWith('E')){
      editClick(event)
    } else {
      saveClick(event)
    }
})
