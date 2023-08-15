import React, { Component } from 'react'
import './EditTask.css'

export default class EditTask extends Component {
  constructor(props) {
    super(props)
    const { label } = props
    this.state = {
      inputValue: label,
    }
  }

  onInputChange = (e) => {
    const currentValue = e.target.value

    this.setState({
      inputValue: currentValue,
    })
  }

  saveNewLabel = (e) => {
    e.preventDefault()
    const { id, changeLabelTask } = this.props
    const { inputValue } = this.state
    changeLabelTask(id, inputValue)
  }

  render() {
    const { onInputChange, saveNewLabel } = this
    const { inputValue } = this.state
    return (
      <li className="editing">
        <form onSubmit={saveNewLabel}>
          <input type="text" className="edit" value={inputValue} onChange={onInputChange} />
        </form>
      </li>
    )
  }
}
