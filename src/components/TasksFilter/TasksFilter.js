import './TasksFilter.css'
import PropTypes from 'prop-types'

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

TasksFilter.defaultProps = {
  setFilter: () => {},
  filterStatus: 'all',
}

TasksFilter.propTypes = {
  setFilter: PropTypes.func,
  filterStatus: PropTypes.string,
}

export default TasksFilter
