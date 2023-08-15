import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'

import './Footer.css'

function Footer({ remainingTasks, setFilter, filter, clearCompleted }) {
  const tasksCount = remainingTasks()
  return (
    <footer className="footer">
      <span className="todo-count">{tasksCount} items left</span>
      <TasksFilter setFilter={setFilter} filterStatus={filter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  remainingTasks: () => 0,
  setFilter: () => {},
  filter: 'all',
  clearCompleted: () => {},
}

Footer.propTypes = {
  remainingTasks: PropTypes.func,
  setFilter: PropTypes.func,
  filter: PropTypes.string,
  clearCompleted: PropTypes.func,
}

export default Footer
