import './Task.css'

const Task = (props) => {
   const {todos} = props

   return (
      todos.map((item) => {
         return (
            <li className="completed">
               <div className="view">
                  <input className="toggle" type="checkbox" />
                  <label>
                      <span className="description">{ item.label }</span>
                      <span className="created"></span>
                  </label>
                  <button type="button" className="icon icon-edit" />
                  <button className="icon icon-destroy" />
               </div>
            </li>
         )
      })
   )
}

export default Task

