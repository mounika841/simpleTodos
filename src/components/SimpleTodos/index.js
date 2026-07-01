import {Component} from 'react'

import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

// Write your code here
class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList.map(eachTodo => ({
      ...eachTodo,
      isEditing: false,
      isCompleted: false,
    })),
    inputValue: '',
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  addTodo = () => {
    const {inputValue, todosList} = this.state

    if (inputValue.trim() === '') {
      return
    }

    const words = inputValue.trim().split(' ')
    const lastWord = words[words.length - 1]

    let count = 1
    let title = inputValue.trim()

    if (!Number.isNaN(Number(lastWord))) {
      count = Number(lastWord)
      title = words.slice(0, words.length - 1).join(' ')
    }

    const newTodos = []

    for (let i = 0; i < count; i += 1) {
      newTodos.push({
        id: Date.now() + i,
        title,
        isEditing: false,
        isCompleted: false,
      })
    }

    this.setState({
      todosList: [...todosList, ...newTodos],
      inputValue: '',
    })
  }

  deleteTodo = id => {
    const {todosList} = this.state

    const updatedTodosList = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({
      todosList: updatedTodosList,
    })
  }

  toggleEdit = id => {
    const {todosList} = this.state

    this.setState({
      todosList: todosList.map(eachTodo =>
        eachTodo.id === id
          ? {...eachTodo, isEditing: !eachTodo.isEditing}
          : eachTodo,
      ),
    })
  }

  updateTodo = (id, updatedTitle) => {
    const {todosList} = this.state

    this.setState({
      todosList: todosList.map(eachTodo =>
        eachTodo.id === id
          ? {
              ...eachTodo,
              title: updatedTitle,
              isEditing: false,
            }
          : eachTodo,
      ),
    })
  }

  toggleComplete = id => {
    const {todosList} = this.state

    this.setState({
      todosList: todosList.map(eachTodo =>
        eachTodo.id === id
          ? {
              ...eachTodo,
              isCompleted: !eachTodo.isCompleted,
            }
          : eachTodo,
      ),
    })
  }

  render() {
    const {todosList, inputValue} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={this.onChangeInput}
            />
            <button type="button" onClick={this.addTodo}>
              Add
            </button>
          </div>

          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                toggleEdit={this.toggleEdit}
                updateTodo={this.updateTodo}
                toggleComplete={this.toggleComplete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
