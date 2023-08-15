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
        this.createTodoItem('Completed task created', new Date(2023, 1, 15), false),
        this.createTodoItem('Editing task created', new Date(2023, 3, 15)),
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
    const { todoData } = this.state
    const idx = todoData.findIndex((el) => el.id === id)

    const newItem = { ...todoData[idx] }
    newItem.active = !newItem.active

    const copyTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    this.setState({
      todoData: copyTodoData,
    })
  }

  toggleEditing = (id, bool) => {
    const { todoData } = this.state
    const idx = todoData.findIndex((el) => el.id === id)

    const newItem = { ...todoData[idx] }
    newItem.isEditing = bool

    const copyTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    this.setState({
      todoData: copyTodoData,
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
    const { todoData } = this.state

    const idx = todoData.findIndex((el) => el.id === id)

    let newItem = { ...todoData[idx] }

    newItem = { ...newItem, label: newLabel, isEditing: false }

    const copyTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
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
