import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Task from '../Task/Task'
import './TaskList.css'

function TaskList({
  todoData,
  toggleTaskStatus,
  toggleEditing,
  onDelete,
  filter,
  changeLabelTask,
  cancelEditingTask,
  updateTimer,
}) {
  let filteredData = [...todoData]
  if (filter === 'active') {
    filteredData = filteredData.filter((task) => task.active)
  } else if (filter === 'completed') {
    filteredData = filteredData.filter((task) => !task.active)
  }
  return (
    <section className="main">
      <ul className="todo-list">
        {filteredData.map(({ id, label, active, created, isEditing, elapsedSeconds, elapsedMinutes }) => (
          <Task
            key={id}
            id={id}
            label={label}
            active={active}
            toggleTaskStatus={toggleTaskStatus}
            toggleEditing={toggleEditing}
            onDelete={onDelete}
            created={formatDistanceToNow(created, { addSuffix: true })}
            isEditing={isEditing}
            changeLabelTask={changeLabelTask}
            cancelEditingTask={cancelEditingTask}
            elapsedSeconds={elapsedSeconds}
            elapsedMinutes={elapsedMinutes}
            updateTimer={updateTimer}
          />
        ))}
      </ul>
    </section>
  )
}

TaskList.defaultProps = {
  todoData: [],
  toggleTaskStatus: () => {},
  onDelete: () => {},
  filter: 'all',
  changeLabelTask: () => {},
  cancelEditingTask: () => {},
}

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      active: PropTypes.bool,
      created: PropTypes.instanceOf(Date),
    })
  ),
  toggleTaskStatus: PropTypes.func,
  onDelete: PropTypes.func,
  filter: PropTypes.string,
  changeLabelTask: PropTypes.func,
  cancelEditingTask: PropTypes.func,
}

export default TaskList
