import React from 'react'
import {Link} from 'react-router-dom'

function TodoList(props) {

    // props.todos = [{}, {}, {}]

    return (
        <div>
           In todo list  
           {
               props.todos.map((todo) => {
                    return <Link to={`/todo/${todo._id}`}>
                        <p key={todo._id} >{todo.name}</p>
                        </Link>
               })
           }
        </div>
    )
}


export default TodoList