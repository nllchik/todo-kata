import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import './App.css'

const App = () => {
	const todoData = [
		{ label: 'Completed task created' }, 
		{ label: 'Editing task created' }, 
		{ label: 'Active task' }
	]

	return (
		<section className='todoapp'>
			<NewTaskForm />
			<TaskList todoData={todoData} />
		</section>	
	)
}

export default App