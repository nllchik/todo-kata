import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './EditTask.css'

function EditTask({ label, id, changeLabelTask, cancelEditing }) {
  const [inputValue, setInputValue] = useState(label)

  const onInputChange = (e) => {
    const currentValue = e.target.value
    setInputValue(currentValue)
  }

  const saveNewLabel = (e) => {
    e.preventDefault()
    changeLabelTask(id, inputValue)
  }

  return (
    <li className="editing">
      <form onSubmit={saveNewLabel}>
        <input type="text" className="edit" value={inputValue} onChange={onInputChange} onKeyDown={cancelEditing} />
      </form>
    </li>
  )
}

EditTask.defaultProps = {
  id: null,
  label: 'Неизвестная задача',
  changeLabelTask: () => {},
}

EditTask.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  changeLabelTask: PropTypes.func,
}

export default EditTask
