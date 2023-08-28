import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  maxId = 100

  constructor(props) {
    super(props)

    this.state = {
      todoData: [
        this.createTodoItem('Completed task', new Date(2023, 1, 15), false),
        this.createTodoItem('Editing task', new Date(2023, 3, 15)),
        this.createTodoItem('Active task', new Date(2023, 7, 15)),
      ],
      filter: 'all',
      date: new Date(),
    }
  }

  componentDidMount() {
    this.minuteTimerID = setInterval(() => {
      this.minute()
    }, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.minuteTimerID)
  }

  setFilter = (filter) => {
    this.setState((prevState) => ({
      ...prevState,
      filter,
    }))
  }

  toggleTaskStatus = (id) => {
    this.updateTodoData(id, (newItem) => {
      const updatedItem = { ...newItem, active: !newItem.active }
      return updatedItem
    })
  }

  toggleEditing = (id, bool) => {
    this.updateTodoData(id, (newItem) => {
      const updatedItem = { ...newItem, isEditing: bool }
      return updatedItem
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const copyTodoData = todoData.filter((el) => el.id !== id)
      return {
        todoData: copyTodoData,
      }
    })
  }

  addItem = (inputValue, date, minutes, seconds) => {
    if (inputValue.trim() === '') {
      return
    }
    const newItem = this.createTodoItem(inputValue, date, true, false, minutes, seconds)
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }))
  }

  remainingTasks = () => {
    const { todoData } = this.state
    const activeTasks = todoData.filter((task) => task.active)
    return activeTasks.length
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((task) => task.active),
    }))
  }

  changeLabelTask = (id, newLabel) => {
    this.updateTodoData(id, (newItem) => {
      let updatedItem
      if (newLabel.trim() === '') {
        updatedItem = { ...newItem, isEditing: false }
      } else {
        updatedItem = { ...newItem, label: newLabel, isEditing: false }
      }
      return updatedItem
    })
  }

  cancelEditingTask = (e, id) => {
    if (e.key === 'Escape') {
      this.updateTodoData(id, (newItem) => {
        const updatedItem = { ...newItem, isEditing: false }
        return updatedItem
      })
    }
  }

  updateTimer = (id, minutes, seconds) => {
    this.updateTodoData(id, (task) => {
      return { ...task, elapsedSeconds: seconds, elapsedMinutes: minutes }
    })
  }

  minute() {
    this.setState({
      date: new Date(),
    })
  }

  updateTodoData(id, updateFunc) {
    this.setState((prevState) => {
      const { todoData } = prevState
      const idx = todoData.findIndex((el) => el.id === id)
      const currentItem = todoData[idx]
      const updatedItem = updateFunc(currentItem)
      const copyTodoData = [...todoData.slice(0, idx), updatedItem, ...todoData.slice(idx + 1)]

      return { todoData: copyTodoData }
    })
  }

  createTodoItem(label, date, active = true, isEditing = false, minutes = 0, seconds = 0) {
    return {
      label,
      id: this.maxId++,
      active,
      created: date,
      isEditing,
      started: false,
      elapsedMinutes: minutes,
      elapsedSeconds: seconds,
    }
  }

  render() {
    const { todoData, filter } = this.state
    const {
      toggleTaskStatus,
      toggleEditing,
      deleteItem,
      addItem,
      remainingTasks,
      setFilter,
      clearCompleted,
      changeLabelTask,
      cancelEditingTask,
      updateTimer,
    } = this
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
          todoData={todoData}
          remainingTasks={remainingTasks}
          setFilter={setFilter}
          filter={filter}
          clearCompleted={clearCompleted}
        />
      </section>
    )
  }
}
