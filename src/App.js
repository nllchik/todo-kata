import React, { Component } from 'react'

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
        this.createTodoItem('Completed task created'),
        this.createTodoItem('Editing task created'),
        this.createTodoItem('Active task'),
      ],
    }
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

  deleteItem = (id) => {
    const { todoData } = this.state
    const copyTodoData = todoData.filter((el) => el.id !== id)
    this.setState({
      todoData: copyTodoData,
    })
  }

  addItem = (inputValue) => {
    const newItem = this.createTodoItem(inputValue)
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }))
  }

  remainingTasks = () => {
    const { todoData } = this.state
    const activeTasks = todoData.filter((task) => task.active)
    return activeTasks.length
  }

  createTodoItem(label) {
    return {
      label,
      id: this.maxId++,
      active: true,
    }
  }

  render() {
    const { todoData } = this.state
    const { toggleTaskStatus, deleteItem, addItem, remainingTasks } = this
    return (
      <section className="todoapp">
        <NewTaskForm addItem={addItem} />
        <TaskList todoData={todoData} toggleTaskStatus={toggleTaskStatus} onDelete={deleteItem} />
        <Footer todoData={todoData} remainingTasks={remainingTasks} />
      </section>
    )
  }
}
