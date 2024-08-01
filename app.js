const formAdd = document.querySelector('[data-js="form-add-todo"]')
const todosContainer = document.querySelector('[data-js="todos-container"]')
const formSearch = document.querySelector('[data-search="form-search"]')

const localStorageTasks = JSON.parse(localStorage.getItem('tasks'))
let tasks = localStorage.getItem('tasks') !== null ? localStorageTasks : []

const updateLocalStorage = () => localStorage.setItem('tasks', JSON.stringify(tasks))

const renderTodos = inputValue => {
    const li = document.createElement('li')
    const span = document.createElement('span')
    const i = document.createElement('i')

    li.setAttribute('class','list-group-item d-flex justify-content-between align-items-center')
    li.setAttribute('data-li',inputValue)   
    i.setAttribute('class','far fa-trash-alt delete')
    i.setAttribute('data-delete',inputValue)

    span.textContent = inputValue

    todosContainer.append(li)
    li.append(span, i)
}

if (tasks.length) {
    tasks.forEach(item => renderTodos(item))
}

const addTodos = e => {
    e.preventDefault()
    const inputValue = DOMPurify.sanitize(e.target.add.value)

    tasks.push(inputValue)
    updateLocalStorage()

    if(inputValue.length) {
        renderTodos(inputValue)
    }
    
    e.target.reset()
}

const deleteTodos = e => {
    const dataDelete = e.target.dataset.delete

    tasks = tasks.filter(item => item !== dataDelete)
    updateLocalStorage()
    
    if (dataDelete) {
        const li = document.querySelector(`[data-li='${dataDelete}']`)
        li.remove()
    }
}

const filterTodos = (todos, inputValue, showOrHidden) =>  todos
        .filter(todo => showOrHidden 
            ? todo.textContent.toLowerCase().includes(inputValue) 
            : !todo.textContent.toLowerCase().includes(inputValue))

const manipulateClasses = (todos, classAdd, classRemove) => todos
        .forEach(todo => {
            todo.classList.remove(classRemove)
            todo.classList.add(classAdd)
        })

const hideTodos = (todos, inputValue) => {
    const todosToHide = filterTodos(todos, inputValue, false)
    manipulateClasses(todosToHide, 'hidden', 'd-flex')
}

const showTodos = (todos, inputValue) => {
    const todosToShow = filterTodos(todos, inputValue, true)
    manipulateClasses(todosToShow, 'd-flex', 'hidden')
}

const searchTodos = e => {
    const inputValue = e.target.value.trim().toLowerCase()
    const todos = [...todosContainer.children]
    hideTodos(todos, inputValue)
    showTodos(todos, inputValue)
}

formAdd.addEventListener('submit', addTodos)
todosContainer.addEventListener('click', deleteTodos)
formSearch.addEventListener('input', searchTodos)
