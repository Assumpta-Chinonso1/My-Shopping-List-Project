const itemForm = document.getElementById('form-item')

const itemInput = document.getElementById('item-input')

const itemList = document.getElementById('item-list')

const itemClear = document.getElementById('clear')

const items = itemList.querySelectorAll('li')

const filterItems = document.getElementById('filter')

const formBtn = itemForm.querySelector('button')

let isEditMode = false;


         function displayItems() {
            const itemsFromStorge = getItemsFromStorage()
            itemsFromStorge.forEach(item => addItemToDom(item))

            checkUi()
         }

     function  onAddItemSubmit (e) {
        e.preventDefault();


        //Validate Input
          
         const newItem = itemInput.value

             if ( newItem === '' ) {
                alert(' Please Add an Item to the shopping list');
                return;
             }
                
             //check for edit mode

         if (isEditMode) {
            const itemToEdit = itemList.querySelector('.edit-mode')

            removeItemFromStorage(itemToEdit.textContent);
            itemToEdit.classList.remove('edit-mode')
            itemToEdit.remove()
            isEditMode = false
         } else{
            if (checkIfItemExit(newItem)) {
                alert('Item already exists!')
                return;
            }
         }


           addItemToDom(newItem)
       
           addItemToStorage(newItem)

          checkUi()

          itemInput.value = '';
     }

          function addItemToDom(item) {
            const li = document.createElement('li')
            li.appendChild(document.createTextNode(item))
           
            const button = createButton('remove-item btn-links text-red')
                 li.appendChild(button)
       
                 //Add li to the DOM
                 itemList.appendChild(li)
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
   function addItemToStorage(item) {

    const itemsFromStorge = getItemsFromStorage()



    itemsFromStorge.push(item)


    localStorage.setItem('items', JSON.stringify(itemsFromStorge))
   }


  function getItemsFromStorage() {
    let itemsFromStorge;

    if (localStorage.getItem('items') === null) {
        itemsFromStorge = []
    } else{
        itemsFromStorge = JSON.parse(localStorage.getItem('items'))
    }
          return itemsFromStorge
  }

         function onclickItem(e) {
            if(e.target.parentElement.classList.contains('remove-item')){
                removeItem(e.target.parentElement.parentElement)
            } else{
                setItemToEdit (e.target)
            }
         } 

         function checkIfItemExit(item) {
            const itemsFromStorge = getItemsFromStorage()
            return itemsFromStorge.includes(item)
         }

         function setItemToEdit(item) {
            isEditMode = true;
                
            itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'))

            item.classList.add('edit-mode')

            formBtn.innerHTML = 
            '<i class="fa-solid fa-pen"></i> Update Item  '
            
            formBtn.style.backgroundColor = '#808000'
            itemInput.value = item.textContent;
         }


function removeItem(item) {
    if (confirm('Are You Sure?')) {

        //Remove Item from Dom
        item.remove()
    

        //Remove Item from Storage
        removeItemFromStorage(item.textContent)



        checkUi()
    }
}
       function removeItemFromStorage(item) {
        let itemsFromStorge = getItemsFromStorage()

    //Fillter out item from the removed
    itemsFromStorge = itemsFromStorge.filter((i) => i !== item)

    //REset to LocalStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorge))
       }



function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
   //Clear from localStorage

   localStorage.removeItem('items')


    checkUi()
}
       function clearItems(e) {
        const items = itemList.querySelectorAll('li')
        const text = e.target.value.toLowerCase;

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
    itemInput.value = ''
    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        itemClear.style.display = 'none'
        filterItems.style.display = 'none'
    } else{
        itemClear.style.display = "block"
        filterItems.style.display = 'block'
    }
     formBtn.innerHTML = ' <i class="fa-solid fa-plus"></i> Add Items';
     formBtn.style.backgroundColor = '#333'

    isEditMode = false;
}
   


function init() {
//Event Listener
itemForm.addEventListener('submit', onAddItemSubmit)

itemList.addEventListener('click', onclickItem)

itemClear.addEventListener('click', clearItems)
filterItems.addEventListener('input',clearItems)
document.addEventListener('DOMContentLoaded', displayItems)

checkUi ()

}

init()