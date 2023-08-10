import React from 'react'

import Task from '../Task/Task'
import './TaskList.css'

function TaskList({ todoData, toggleTaskStatus, onDelete, filter }) {
  let filteredData = [...todoData]
  if (filter === 'active') {
    filteredData = filteredData.filter((task) => task.active)
  } else if (filter === 'completed') {
    filteredData = filteredData.filter((task) => !task.active)
  }
  return (
    <section className="main">
      <ul className="todo-list">
        {filteredData.map(({ id, label, active }) => (
          <Task
            key={id}
            id={id}
            label={label}
            active={active}
            toggleTaskStatus={toggleTaskStatus}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  )
}

export default TaskList
