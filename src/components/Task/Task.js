import React from 'react'

import ViewTask from '../ViewTask'
import './Task.css'

function Task({ id, label, active, toggleTaskStatus, onDelete }) {
  let classNames = 'active'
  if (!active) {
    classNames = 'completed'
  }

  const handleTaskClick = () => {
    toggleTaskStatus(id)
  }

  const handleDeleteClick = () => {
    onDelete(id)
  }
  return (
    <li className={classNames}>
      <ViewTask label={label} handleTaskClick={handleTaskClick} handleDeleteClick={handleDeleteClick} />
    </li>
  )
}

export default Task
