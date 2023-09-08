import React, { useState, useEffect } from 'react'

import './TaskTimer.css'

function TaskTimer({ elapsedMinutes, elapsedSeconds, id, updateTimer }) {
  const [second, setSecond] = useState(elapsedSeconds)
  const [minute, setMinute] = useState(elapsedMinutes)
  const [timerIsActive, setTimerIsActive] = useState(false)

  const updateTime = () => {
    setSecond((prevSecond) => {
      const newSecondValue = prevSecond + 1
      if (newSecondValue >= 60) {
        setMinute((prevMinute) => {
          const newMinuteValue = prevMinute + 1
          return newMinuteValue
        })
        return 0
      }
      return newSecondValue
    })
  }

  useEffect(() => {
    let timerId
    if (timerIsActive) {
      timerId = setInterval(updateTime, 1000)
    } else {
      clearInterval(timerId)
    }
    return () => {
      clearInterval(timerId)
    }
  }, [timerIsActive])

  useEffect(() => {
    updateTimer(id, minute, second)
  }, [minute, second])

  const startPauseTimer = () => {
    setTimerIsActive((PrevTimerIsActive) => !PrevTimerIsActive)
  }

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

export default TaskTimer
