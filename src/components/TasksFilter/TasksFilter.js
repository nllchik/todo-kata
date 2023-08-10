import './TasksFilter.css'

function TasksFilter({ setFilter, filterStatus }) {
  const filterClick = (filter) => {
    setFilter(filter)
  }
  return (
    <ul className="filters">
      <li>
        <button type="button" className={filterStatus === 'all' ? 'selected' : ''} onClick={() => filterClick('all')}>
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filterStatus === 'active' ? 'selected' : ''}
          onClick={() => filterClick('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filterStatus === 'completed' ? 'selected' : ''}
          onClick={() => filterClick('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TasksFilter
