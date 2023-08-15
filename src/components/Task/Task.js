import React from 'react'
import PropTypes from 'prop-types'

import ViewTask from '../ViewTask'
import './Task.css'
import EditTask from '../EditTask/EditTask'

function Task({ id, label, active, toggleTaskStatus, toggleEditing, onDelete, created, isEditing, changeLabelTask }) {
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

  const element = isEditing ? (
    <EditTask label={label} id={id} changeLabelTask={changeLabelTask} />
  ) : (
    <li className={classNames}>
      <ViewTask
        label={label}
        handleTaskClick={handleTaskClick}
        handleDeleteClick={handleDeleteClick}
        active={active}
        created={created}
        toggleEditing={toggleEditing}
        id={id}
      />
    </li>
  )

  return element
}

Task.defaultProps = {
  id: null,
  label: 'Неизвестная задача',
  active: true,
  toggleTaskStatus: () => {},
  onDelete: () => {},
  created: 'Неизвестно',
}

Task.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  active: PropTypes.bool,
  toggleTaskStatus: PropTypes.func,
  onDelete: PropTypes.func,
  created: PropTypes.string,
}

export default Task
