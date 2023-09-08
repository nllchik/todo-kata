import React, { useState, useEffect } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

let maxId = 100

const createTodoItem = (label, date, active = true, isEditing = false, minutes = 0, seconds = 0) => {
  return {
    label,
    id: maxId++,
    active,
    created: date,
    isEditing,
    started: false,
    elapsedMinutes: minutes || 0,
    elapsedSeconds: seconds || 0,
  }
}

function App() {
  const [todoData, setTodoData] = useState([
    createTodoItem('Completed task', new Date(2023, 1, 15), false),
    createTodoItem('Editing task', new Date(2023, 3, 15)),
    createTodoItem('Active task', new Date(2023, 7, 15)),
  ])

  const [filter, setFilter] = useState('all')
  const [currentDate, setDate] = useState(new Date())

  const minute = () => {
    setDate(new Date())
  }

  useEffect(() => {
    const minuteTimerID = setInterval(() => {
      minute()
    }, 60000)

    return () => {
      clearInterval(minuteTimerID)
    }
  }, [])

  const updateFilter = (newFilter) => {
    setFilter(newFilter)
  }

  const updateTodoData = (id, updateFunc) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id)
      const currentItem = prevTodoData[idx]
      const updatedItem = updateFunc(currentItem)
      return [...prevTodoData.slice(0, idx), updatedItem, ...prevTodoData.slice(idx + 1)]
    })
  }

  const toggleTaskStatus = (id) => {
    updateTodoData(id, (newItem) => {
      const updatedItem = { ...newItem, active: !newItem.active }
      return updatedItem
    })
  }

  const toggleEditing = (id, bool) => {
    updateTodoData(id, (newItem) => {
      const updatedItem = { ...newItem, isEditing: bool }
      return updatedItem
    })
  }

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => el.id !== id))
  }

  const addItem = (inputValue, taskDate, minutes, seconds) => {
    if (inputValue.trim() === '') {
      return
    }
    const newItem = createTodoItem(inputValue, taskDate, true, false, minutes, seconds)
    setTodoData((prevTodoData) => [...prevTodoData, newItem])
  }

  const remainingTasks = () => {
    const activeTasks = todoData.filter((task) => task.active)
    return activeTasks.length
  }

  const clearCompleted = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((task) => task.active))
  }

  const changeLabelTask = (id, newLabel) => {
    updateTodoData(id, (newItem) => {
      let updatedItem
      if (newLabel.trim() === '') {
        updatedItem = { ...newItem, isEditing: false }
      } else {
        updatedItem = { ...newItem, label: newLabel, isEditing: false }
      }
      return updatedItem
    })
  }

  const cancelEditingTask = (e, id) => {
    if (e.key === 'Escape') {
      updateTodoData(id, (newItem) => {
        const updatedItem = { ...newItem, isEditing: false }
        return updatedItem
      })
    }
  }

  const updateTimer = (id, minutes, seconds) => {
    updateTodoData(id, (task) => {
      return { ...task, elapsedSeconds: seconds, elapsedMinutes: minutes }
    })
  }

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        todoData={todoData}
        toggleTaskStatus={toggleTaskStatus}
        onDelete={deleteItem}
        filter={filter}
        toggleEditing={toggleEditing}
        changeLabelTask={changeLabelTask}
        cancelEditingTask={cancelEditingTask}
        updateTimer={updateTimer}
      />
      <Footer
        currentDate={currentDate}
        todoData={todoData}
        remainingTasks={remainingTasks}
        setFilter={updateFilter}
        filter={filter}
        clearCompleted={clearCompleted}
      />
    </section>
  )
}

export default App
