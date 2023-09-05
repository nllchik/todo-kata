/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

function NewTaskForm({ addItem }) {
  const [inputValue, setInputValue] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const minutesInput = (event) => {
    setMinutes(event.target.value)
  }

  const secondsInput = (event) => {
    setSeconds(event.target.value)
  }

  const onLabelChange = (event) => {
    setInputValue(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    addItem(inputValue, new Date(), minutes, seconds)
    setMinutes('')
    setSeconds('')
    setInputValue('')
  }

  const cancelTaskAddition = (event) => {
    if (event.key === 'Escape') {
      setMinutes('')
      setSeconds('')
      setInputValue('')
      event.target.blur()
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={inputValue}
          onChange={onLabelChange}
          onKeyDown={cancelTaskAddition}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          value={minutes}
          onChange={minutesInput}
          placeholder="Min"
          onKeyDown={cancelTaskAddition}
          min={0}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          value={seconds}
          onChange={secondsInput}
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

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}

NewTaskForm.defaultProps = {
  addItem: () => {},
}

export default NewTaskForm
