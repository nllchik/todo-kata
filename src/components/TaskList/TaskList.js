import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

function TaskList({ todoData, toggleTaskStatus, toggleEditing, onDelete, filter, changeLabelTask }) {
  let filteredData = [...todoData]
  if (filter === 'active') {
    filteredData = filteredData.filter((task) => task.active)
  } else if (filter === 'completed') {
    filteredData = filteredData.filter((task) => !task.active)
  }
  return (
    <section className="main">
      <ul className="todo-list">
        {filteredData.map(({ id, label, active, created, isEditing }) => (
          <Task
            key={id}
            id={id}
            label={label}
            active={active}
            toggleTaskStatus={toggleTaskStatus}
            toggleEditing={toggleEditing}
            onDelete={onDelete}
            created={created}
            isEditing={isEditing}
            changeLabelTask={changeLabelTask}
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
}

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      active: PropTypes.bool,
      created: PropTypes.string,
    })
  ),
  toggleTaskStatus: PropTypes.func,
  onDelete: PropTypes.func,
  filter: PropTypes.string,
}

export default TaskList
