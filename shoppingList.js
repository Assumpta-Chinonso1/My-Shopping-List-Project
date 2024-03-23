const itemForm = document.getElementById('form-item')

const itemInput = document.getElementById('item-input')

const itemList = document.getElementById('item-list')

const itemClear = document.getElementById('clear')

     function  addItem (e) {
        e.preventDefault();


        //Validate Input
          
         const newItem = itemInput.value

             if ( newItem === '' ) {
                alert(' Please Add an Item to the shopping list');
                return;
             }

     const li = document.createElement('li')
     li.appendChild(document.createTextNode(newItem))
    
     const button = createButton('remove-item btn-links text-red')
          li.appendChild(button)

          itemList.appendChild(li)

          itemInput.value = '';
     }

     function createButton(classes) {
        const button = document.createElement('button')
        button.className = classes
      const icon = createIcon('fa-solid fa-xmark')
         button.appendChild(icon)
        return button;
     }

   function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes
    return icon;
   }


//Secon Task ie The Remove Items 
//from list by clicking the "X" btn and the clear button

function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){
        e.target.parentElement.parentElement.remove()
    }
      
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
}



//Event Listener
itemForm.addEventListener('submit', addItem)

itemList.addEventListener('click', removeItem)

itemClear.addEventListener('click', clearItems)