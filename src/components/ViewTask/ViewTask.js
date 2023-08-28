import React from 'react'
import PropTypes from 'prop-types'

import './ViewTask.css'
import Timer from '../Timer'

function ViewTask({
  label,
  handleTaskClick,
  toggleEditing,
  handleDeleteClick,
  active,
  created,
  id,
  elapsedSeconds,
  elapsedMinutes,
  updateTimer,
}) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={!active} onChange={handleTaskClick} />
      <label>
        <span className="title">{label}</span>
        {active ? (
          <Timer
            minute={parseInt(elapsedMinutes, 10)}
            second={parseInt(elapsedSeconds, 10)}
            id={id}
            updateTimer={updateTimer}
          />
        ) : null}
        <span className="description">{created}</span>
      </label>
      <button type="button" className="icon icon-edit" aria-label="Edit" onClick={() => toggleEditing(id, true)} />
      <button type="button" className="icon icon-destroy" aria-label="Delete" onClick={handleDeleteClick} />
    </div>
  )
}

ViewTask.defaultProps = {
  label: 'Неизвестная задача',
  id: null,
  handleTaskClick: () => {},
  handleDeleteClick: () => {},
  active: true,
  created: 'Неизвестно',
}

ViewTask.propTypes = {
  label: PropTypes.string,
  id: PropTypes.number,
  active: PropTypes.bool,
  handleTaskClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  created: PropTypes.string,
}

export default ViewTask
