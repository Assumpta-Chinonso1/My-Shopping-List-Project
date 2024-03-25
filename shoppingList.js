const itemForm = document.getElementById('form-item')

const itemInput = document.getElementById('item-input')

const itemList = document.getElementById('item-list')

const itemClear = document.getElementById('clear')

const items = itemList.querySelectorAll('li')

const filterItems = document.getElementById('filter')

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

          //Add li to the DOM
          itemList.appendChild(li)

          checkUi()

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


//Second Task ie The Remove Items 
//from list by clicking the "X" btn and the clear button

function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){
        if (confirm('Are you sure?')) {
            
        
        e.target.parentElement.parentElement.remove()

     checkUi()
    }
  }  
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    checkUi()
}
       function clearItems(e) {
        const items = itemList.querySelectorAll('li')
        const text = e.target.value;

        items.forEach((item) =>{
            const itemName = item.firstChild.textContent.toLowerCase();
            if (itemName.indexOf(text) != -1) {
                item.style.display = 'flex'
            }else {
                item.style.display = 'none'
            }
        })
        
       }

 

function checkUi () {
    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        itemClear.style.display = 'none'
        filterItems.style.display = 'none'
    } else{
        itemClear.style.display = "block"
        filterItems.style.display = 'block'
    }
}
     


//Event Listener
itemForm.addEventListener('submit', addItem)

itemList.addEventListener('click', removeItem)

itemClear.addEventListener('click', clearItems)
filterItems.addEventListener('input',clearItems)

checkUi()