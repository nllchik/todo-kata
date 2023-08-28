import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ViewTask from '../ViewTask'
import './Task.css'
import EditTask from '../EditTask/EditTask'

function Task({
  id,
  label,
  active,
  toggleTaskStatus,
  toggleEditing,
  onDelete,
  created,
  isEditing,
  changeLabelTask,
  cancelEditingTask,
  elapsedSeconds,
  elapsedMinutes,
  updateTimer,
}) {
  const taskClassNames = classNames({ active, completed: !active })

  const handleTaskClick = () => {
    toggleTaskStatus(id)
  }

  const handleDeleteClick = () => {
    onDelete(id)
  }

  const cancelEditing = (e) => {
    cancelEditingTask(e, id)
  }

  const element = isEditing ? (
    <EditTask label={label} id={id} changeLabelTask={changeLabelTask} cancelEditing={cancelEditing} />
  ) : (
    <li className={taskClassNames}>
      <ViewTask
        label={label}
        handleTaskClick={handleTaskClick}
        handleDeleteClick={handleDeleteClick}
        active={active}
        created={created}
        toggleEditing={toggleEditing}
        id={id}
        elapsedSeconds={elapsedSeconds}
        elapsedMinutes={elapsedMinutes}
        updateTimer={updateTimer}
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
  isEditing: false,
  changeLabelTask: () => {},
  cancelEditingTask: () => {},
}

Task.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  active: PropTypes.bool,
  toggleTaskStatus: PropTypes.func,
  onDelete: PropTypes.func,
  created: PropTypes.string,
  isEditing: PropTypes.bool,
  changeLabelTask: PropTypes.func,
  cancelEditingTask: PropTypes.func,
}

export default Task
