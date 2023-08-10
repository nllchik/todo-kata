/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
  }

  onLabelChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { inputValue } = this.state
    const { addItem } = this.props
    addItem(inputValue)
    this.setState({ inputValue: '' })
  }

  render() {
    const { inputValue } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={inputValue}
            onChange={this.onLabelChange}
          />
        </form>
      </header>
    )
  }
}
