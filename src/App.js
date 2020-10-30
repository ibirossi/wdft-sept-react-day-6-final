import React, { Component } from 'react'
import Nav from './components/MyNav'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import {Switch , Route, withRouter} from 'react-router-dom'
import TodoList from './components/TodoList'
import AddForm from './components/AddForm'
import TodoDetail from './components/TodoDetail'
import EditForm from './components/EditForm'

class App extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/todos')
      .then((response) => {
        // response.data
        this.setState({
          todos: response.data
        })
      })
  }

  handleAdd = (e) => {
    e.preventDefault()
    const {name, description} = e.target

    let newTodo = {
      name: name.value,
      description: description.value,
      completed: false,
    }

    axios.post('http://localhost:5000/api/create', newTodo)
    .then((response) =>{
        this.setState({
          todos: [ response.data , ...this.state.todos]
        }, () => {
          this.props.history.push('/')
        })      
    })
  }

  handleDelete = (todoId) => {
    axios.delete(`http://localhost:5000/api/todos/${todoId}`)
      .then(() => {
          let filteredTodos = this.state.todos.filter((todo) => {
              return todo._id !== todoId
          })

          this.setState({
            todos: filteredTodos
          }, () => {
            this.props.history.push('/')
          })
      })

  }

  handleEdit = (todo) => {
    axios.patch(`http://localhost:5000/api/todos/${todo._id}`, {
      name: todo.name,
      description: todo.description,
      completed: todo.completed
    })
    .then(() => {
        let updatedTodos = this.state.todos.map((myTodo) => {
          if (myTodo._id == todo._id) {
            myTodo = todo
          }
          return myTodo
        })

        this.setState({
          todos: updatedTodos
        }, () => {
          this.props.history.push('/')
        })
    })
  }

  render() {
    console.log(this.props)
    return (
      <div>   
        <Nav />
        <h3>Shopping List</h3>
        <Switch>
            <Route exact path="/" render={() => {
              return <TodoList todos={this.state.todos} />
            }} />
            {/* <Route path="/" component={AddForm} /> */}
            <Route path="/add-form" render={() => {
              return <AddForm onAdd={this.handleAdd} />
            }} />
            {/* <Route path="/todo/:todoId" component={TodoDetail}/> */}
            <Route exact path="/todo/:todoId" render={(routeProps) => {
              return <TodoDetail onDelete={this.handleDelete}  {...routeProps} />
            }} />
            <Route path="/todo/:todoId/edit" render={(routeProps) => {
              return <EditForm onEdit={this.handleEdit} {...routeProps} />
            }} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)