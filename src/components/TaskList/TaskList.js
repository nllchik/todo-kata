import React from 'react'

import Task from '../Task/Task'
import './TaskList.css'

function TaskList({ todoData, toggleTaskStatus, onDelete }) {
  return (
    <section className="main">
      <ul className="todo-list">
        {todoData.map(({ id, label, active }) => (
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
