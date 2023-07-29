import Task from "../Task/Task"
import Footer from "../Footer"
import './TaskList.css'

const TaskList = (props) => {
	const {todoData} = props

	return (
		<section className="main">
			<ul className="todo-list">
				<Task todos={todoData}/>
			</ul>
			<Footer />
	 </section>
	)
}

export default TaskList