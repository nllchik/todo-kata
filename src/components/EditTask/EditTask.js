import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './EditTask.css'

export default class EditTask extends Component {
  static defaultProps = {
    id: null,
    label: 'Неизвестная задача',
    changeLabelTask: () => {},
  }

  static propTypes = {
    id: PropTypes.number,
    label: PropTypes.string,
    changeLabelTask: PropTypes.func,
  }

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
    const { cancelEditing } = this.props
    return (
      <li className="editing">
        <form onSubmit={saveNewLabel}>
          <input type="text" className="edit" value={inputValue} onChange={onInputChange} onKeyDown={cancelEditing} />
        </form>
      </li>
    )
  }
}
