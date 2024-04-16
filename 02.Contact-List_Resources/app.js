window.addEventListener("load", solve);

function solve() {
  const [nameElement, phoneNumberElement, addBtnElement] = document.getElementsByTagName('input');
  const categoryElement = document.getElementById('category');
  const contactElement = document.getElementById('contact-list')
  const checkListElement = document.getElementById('check-list');

  addBtnElement.addEventListener('click', () => {
    if (nameElement.value === ''
      || phoneNumberElement.value === ''
      || categoryElement.value === '') {
      return;
    }
    checkListElement.appendChild(createContact(nameElement, phoneNumberElement, addBtnElement));
    clearInput()
  })

  function createContact() {

    const name = nameElement.value;
    const phone = phoneNumberElement.value;
    const category = categoryElement.value;

    const liElement = document.createElement('li');
    const articleELement = document.createElement('article');
    articleELement.innerHTML = `
      <P>name:${name}</p>
      <p>phone:${phone}</p>
      <p>category:${category}</p> `

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn')
    editButton.addEventListener('click', () => {
      nameElement.value = name;
      phoneNumberElement.value = phone;
      categoryElement.value = category;
      liElement.remove()
      addBtnElement.disabled = false;
    })
    const saveButton = document.createElement('button');
    saveButton.classList.add('save-btn')
    saveButton.addEventListener('click', () => {
      contactElement.appendChild(saveContact(name, phone, category))
      liElement.remove()
    })

    const divElement = document.createElement('div')
    divElement.classList.add('buttons')
    divElement.appendChild(editButton);
    divElement.appendChild(saveButton);
    liElement.appendChild(articleELement);
    liElement.appendChild(divElement);


    return liElement;
  }

  function saveContact(name, phone, category) {
    const liElement = document.createElement('li');
    liElement.classList.add('contact-list')
    const articleELement = document.createElement('article');
    articleELement.innerHTML = `
      <P>name:${name}</p>
      <p>phone:${phone}</p>
      <p>category:${category}</p> `

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('del-btn')
    deleteButton.addEventListener('click', () => {
      contactElement.innerHTML = ''
    })
    liElement.appendChild(articleELement);
    liElement.appendChild(deleteButton);
    return liElement;
  }
  function clearInput() {
    nameElement.value = '';
    phoneNumberElement.value = '';
    categoryElement.value = '';
  }
}
