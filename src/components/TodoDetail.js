import React, { Component } from 'react'
import axios from 'axios' 
import { Link } from 'react-router-dom'

class TodoDetail extends Component {

    // this.props.onDelete = fnc

    state ={
        todo: {}
    }

    componentDidMount() {
       let todoId = this.props.match.params.todoId
       console.log(this.props)
    //    this.props.history.push('/manish.com')
        axios.get(`http://localhost:5000/api/todos/${todoId}`)
            .then((response) => {
                this.setState({
                    todo: response.data
                })
            })
    }


    render() {
        const {name, description, _id, image} = this.state.todo
        return (
            <div>
                <div>Name: {name}</div>
                <div>Detail: {description}</div>
                <img src={image} alt={name}/>
                <Link to={`/todo/${_id}/edit`} ><button>Edit</button></Link>
                <button onClick={() => { this.props.onDelete(_id) } }>Delete</button>
            </div>
        )
    }
}



export default TodoDetail