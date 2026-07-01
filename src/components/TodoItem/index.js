// Write your code here
import {Component} from 'react'

import './index.css'

class TodoItem extends Component {
  state = {
    editedText: '',
  }

  onClickEdit = () => {
    const {todoDetails, toggleEdit} = this.props 
    const {id, title} = todoDetails 

    this.setState({editedText: title})
    toggleEdit(id)
  }

  onChangeText = event => {
    this.setState({editedText: 
    event.target.value})
  }

  onClickSave = () => {
    const {todoDetails, updateTodo} = this.props 
    const {id} = todoDetails 
    const {editedText} = this.state 

    updateTodo(id, editedText)
  }

  render() {
    const {
      todoDetails,
      deleteTodo,
      toggleComplete,
    } = this.props 

    const {
      id,
      title,
      isEditing,
      isCompleted,
    } = todoDetails 

    const {editedText} = this.state 

    return (
      <li className="todo-item">
        {isEditing ? (
          <input 
            type="text"
            value={editedText}
            onChange={this.onChangeText}
          />
        ) : (
          <p 
          style={{
            textDecoration: isCompleted ? 'line-through' : 'none',
          }}
          >
          {title}
          </p>
        )}

        {isEditing ? (
          <button type="button"
          onClick={this.onClickSave}>Save</button>
        ) : (
          <button type="button"
          onClick={this.onClickEdit}>Edit</button>
        )}

        <button type="button" onClick={() => 
    toggleComplete(id)}>
          Complete
          </button>
          
          <button type="button" onClick={() => 
    deleteTodo(id)}>
          Delete
        </button>
      </li>
      )
    }
  }

export default TodoItem
