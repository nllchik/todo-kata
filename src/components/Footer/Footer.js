import TasksFilter from '../TasksFilter'
import './Footer.css'

function Footer({ remainingTasks }) {
  const tasksCount = remainingTasks()
  return (
    <footer className="footer">
      <span className="todo-count">{tasksCount} items left</span>
      <TasksFilter />
      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
