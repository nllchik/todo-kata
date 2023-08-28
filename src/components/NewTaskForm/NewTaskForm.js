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
      minutes: '',
      seconds: '',
    }
  }

  minutesInput = (event) => {
    this.setState({
      minutes: event.target.value,
    })
  }

  secondsInput = (event) => {
    this.setState({
      seconds: event.target.value,
    })
  }

  onLabelChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { inputValue, minutes, seconds } = this.state
    const { addItem } = this.props
    addItem(inputValue, new Date(), minutes, seconds)
    this.setState({ inputValue: '', minutes: '', seconds: '' })
  }

  cancelTaskAddition = (event) => {
    if (event.key === 'Escape') {
      this.setState({ inputValue: '', seconds: '', minutes: '' })
      event.target.blur()
    }
  }

  render() {
    const { inputValue, minutes, seconds } = this.state
    const { cancelTaskAddition } = this
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={inputValue}
            onChange={this.onLabelChange}
            onKeyDown={cancelTaskAddition}
          />
          <input
            className="new-todo-form__timer"
            type="number"
            value={minutes}
            onChange={this.minutesInput}
            placeholder="Min"
            onKeyDown={cancelTaskAddition}
            min={0}
          />
          <input
            className="new-todo-form__timer"
            type="number"
            value={seconds}
            onChange={this.secondsInput}
            placeholder="Sec"
            onKeyDown={cancelTaskAddition}
            max={59}
            min={0}
          />
          <button type="submit" style={{ display: 'none' }} aria-label="Submit form" />
        </form>
      </header>
    )
  }
}
