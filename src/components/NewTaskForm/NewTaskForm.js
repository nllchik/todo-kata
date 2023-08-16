/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static propTypes = {
    addItem: PropTypes.func,
  }

  static defaultProps = {
    addItem: () => {},
  }

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
    addItem(inputValue, Date.now())
    this.setState({ inputValue: '' })
  }

  cancelTaskAddition = (event) => {
    if (event.key === 'Escape') {
      this.setState({ inputValue: '' })
      event.target.blur()
    }
  }

  render() {
    const { inputValue } = this.state
    const { cancelTaskAddition } = this
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
            onKeyDown={cancelTaskAddition}
          />
        </form>
      </header>
    )
  }
}
