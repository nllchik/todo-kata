import React, { Component } from 'react'

import './TaskTimer.css'

export default class TaskTimer extends Component {
  constructor(props) {
    super(props)

    const { second, minute } = this.props

    this.state = {
      second,
      minute,
      timerIsActive: false,
      timerId: null,
    }
  }

  componentWillUnmount() {
    const { timerId } = this.state
    clearInterval(timerId)
  }

  updateTime = () => {
    const { second, minute } = this.state
    const { updateTimer, id } = this.props

    if (second === 59) {
      this.setState((state) => {
        const newMinuteValue = state.minute === 59 ? 0 : state.minute + 1
        updateTimer(id, newMinuteValue, 0)
        return {
          minute: newMinuteValue,
          second: 0,
        }
      })
    } else {
      this.setState((state) => {
        const newSecondValue = state.second + 1
        updateTimer(id, minute, newSecondValue)
        return {
          second: newSecondValue,
        }
      })
    }
  }

  startPauseTimer = () => {
    const { timerIsActive, timerId } = this.state
    if (!timerIsActive) {
      this.setState({
        timerIsActive: true,
        timerId: setInterval(this.updateTime, 1000),
      })
    } else {
      clearInterval(timerId)
      this.setState({
        timerIsActive: false,
        timerId: null,
      })
    }
  }

  render() {
    const { second, minute, timerIsActive } = this.state
    const { startPauseTimer } = this
    return (
      <span>
        <button
          type="button"
          className={timerIsActive ? 'icon icon-pause' : 'icon icon-play'}
          aria-label="Play"
          onClick={startPauseTimer}
        />
        <span className="time">
          {minute}:{second < 10 ? `0${second}` : second}
        </span>
      </span>
    )
  }
}
