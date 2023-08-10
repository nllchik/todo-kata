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

export default Footer
