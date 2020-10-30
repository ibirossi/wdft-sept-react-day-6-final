import React, { Component } from 'react'
import axios from 'axios' 

class EditForm extends Component {

    state ={
        todo: {}
    }

    componentDidMount() {
       let todoId = this.props.match.params.todoId
        axios.get(`http://localhost:5000/api/todos/${todoId}`)
            .then((response) => {
                this.setState({
                    todo: response.data
                })
            })
    }

    handleNameChange = (e) => {
       let cloneTodo = JSON.parse(JSON.stringify(this.state.todo))
       cloneTodo.name =  e.target.value
       this.setState({
           todo: cloneTodo
       })
    }

    handleDescChange = (e) => {
        let cloneTodo = JSON.parse(JSON.stringify(this.state.todo))
        cloneTodo.description =  e.target.value
        this.setState({
            todo: cloneTodo
        })
    }


    render() {
        const {name, description} = this.state.todo

        return (
            <div>
                <input onChange={this.handleNameChange} type="text" value={name} ></input>
                <input  onChange={this.handleDescChange} type="text" value={description} ></input>
                <button onClick={() => { this.props.onEdit(this.state.todo) }  } >Edit</button>
            </div>
        )
    }
}

export default EditForm