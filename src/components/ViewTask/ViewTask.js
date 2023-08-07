import React from 'react'
import './ViewTask.css'

function ViewTask({ label, handleTaskClick, handleDeleteClick }) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" onChange={handleTaskClick} />
      <label>
        <span className="description">{label}</span>
        <span className="created" />
      </label>
      <button type="button" className="icon icon-edit" aria-label="Edit" />
      <button type="button" className="icon icon-destroy" aria-label="Delete" onClick={handleDeleteClick} />
    </div>
  )
}

export default ViewTask
