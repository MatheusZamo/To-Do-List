const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const formSearch = document.querySelector('.form-search input')

const addTodosInHTML = (value) => {
 return  todosContainer.innerHTML += `
  <li class="list-group-item d-flex justify-content-between align-items-center" data-todo = '${value}'>
    <span>${value}</span>
    <i class="far fa-trash-alt" data-trash = '${value}'></i>
  </li>
`
}

const handleSubmit = event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()

  if(inputValue.length){
    addTodosInHTML(inputValue)
  }
  
  event.target.reset()
}

const removeTodo = element => {
  const trashData = element.dataset.trash
    const todo = document.querySelector(`[data-todo = '${trashData}']`)
    if(trashData){
      todo.remove()
    }
}

const handleClicked = event => {
  const clickedElement = event.target
  removeTodo(clickedElement)
}

const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
  .filter(todo => {
    const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
    return returnMatchedTodos ? matchedTodos : !matchedTodos
  })

const manipulateClasses = (todos,classAdd,classRemove) => todos
  .forEach(todo => {
    todo.classList.remove(classRemove)
    todo.classList.add(classAdd)
  })


const hideTodos = (todos,inputValue) => {
  const todosToHide = filterTodos(todos,inputValue,false)
  manipulateClasses(todosToHide,'hidden','d-flex')
}

const showTodos = (todos,inputValue) => {
  const todosToShow = filterTodos(todos,inputValue,true)
  manipulateClasses(todosToShow,'d-flex','hidden')
}

const handleInput = event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)

  hideTodos(todos,inputValue)

  showTodos(todos,inputValue)
    
}

formAddTodo.addEventListener('submit',handleSubmit)

todosContainer.addEventListener('click',handleClicked)

formSearch.addEventListener('input',handleInput)
