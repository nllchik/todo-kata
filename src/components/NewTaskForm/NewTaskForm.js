/* eslint-disable react/prefer-stateless-function */
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

  // eslint-disable-next-line class-methods-use-this
  onLabelChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { inputValue } = this.state
    // eslint-disable-next-line react/destructuring-assignment
    this.props.addItem(inputValue)
    this.setState({ inputValue: '' })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            // eslint-disable-next-line react/destructuring-assignment
            value={this.state.inputValue}
            onChange={this.onLabelChange}
          />
        </form>
      </header>
    )
  }
}
