import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

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
    }
  }

  setFilter = (filter) => {
    this.setState({
      filter,
    })
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
    const { todoData } = this.state
    const copyTodoData = todoData.filter((el) => el.id !== id)
    this.setState({
      todoData: copyTodoData,
    })
  }

  addItem = (inputValue, date) => {
    if (inputValue.trim() === '') {
      return
    }
    const newItem = this.createTodoItem(inputValue, date)
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
    const { todoData } = this.state

    const idx = todoData.findIndex((el) => el.id === id)

    let newItem = { ...todoData[idx] }

    if (e.key === 'Escape') {
      newItem = { ...newItem, isEditing: false }
      const copyTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      this.setState({
        todoData: copyTodoData,
      })
    }
  }

  updateTodoData(id, updateFunc) {
    const { todoData } = this.state

    const idx = todoData.findIndex((el) => el.id === id)

    const currentItem = todoData[idx]
    const updatedItem = updateFunc(currentItem)
    const copyTodoData = [...todoData.slice(0, idx), updatedItem, ...todoData.slice(idx + 1)]
    this.setState({
      todoData: copyTodoData,
    })
  }

  createTodoItem(label, date, active = true, isEditing = false) {
    return {
      label,
      id: this.maxId++,
      active,
      created: formatDistanceToNow(date, { addSuffix: true }),
      isEditing,
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
