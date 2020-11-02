import React, { Component } from 'react'
import Nav from './components/MyNav'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import {Switch , Route, withRouter} from 'react-router-dom'
import TodoList from './components/TodoList'
import AddForm from './components/AddForm'
import TodoDetail from './components/TodoDetail'
import EditForm from './components/EditForm'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'


class App extends Component {

  state = {
    todos: [],
    loggedInUser: null,
  }

  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios.get('http://localhost:5000/api/user', {withCredentials: true})
        .then((response) => {
            this.setState({
              loggedInUser: response.data
            })
        })
    }

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
    const {name, description, image} = e.target
    let imageFile = image.files[0]

    let uploadForm = new FormData()
    uploadForm.append('imageUrl', imageFile)

    axios.post('http://localhost:5000/api/upload', uploadForm)
      .then((response) => {

          let newTodo = {
            name: name.value,
            description: description.value,
            completed: false,
            image: response.data.image
          }
      
          axios.post('http://localhost:5000/api/create', newTodo)
          .then((response) =>{
              this.setState({
                todos: [ response.data , ...this.state.todos]
              }, () => {
                this.props.history.push('/')
              })      
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

  handleSignUp = (e) => {
    e.preventDefault()
    const {username, email, password} = e.target

    axios.post(`http://localhost:5000/api/signup` , {
      username: username.value, 
      email: email.value, 
      password: password.value
    }, {withCredentials: true})
    .then((response) => {
      this.setState({
        loggedInUser: response.data
      }, () => {
        this.props.history.push('/')
      })
    })


  }


  handleSignIn = (e) => {
    e.preventDefault()
    e.preventDefault()
    const {email, password} = e.target

    axios.post(`http://localhost:5000/api/signin` , {
      email: email.value, 
      password: password.value
    }, {withCredentials: true})
    .then((response) => {
      this.setState({
        loggedInUser: response.data
      }, () => {
        this.props.history.push('/')
      })
    })

  }

  handleLogOut = (e) => {
    axios.post('http://localhost:5000/api/logout', {}, {withCredentials: true})
      .then(() => {
          this.setState({
            loggedInUser: null
          })
      })
  }

  render() {
    const {loggedInUser} = this.state

    return (
      <div>   
        <Nav onLogout={this.handleLogOut} />
        <h3>Shopping List</h3>
        {
          loggedInUser ? (<h5>User is: {loggedInUser.username}</h5>) : null
        }
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
               <Route path="/sign-in" render={(routeProps) => {
            return <SignIn onSignIn={this.handleSignIn} {...routeProps} />
          }}/>
          <Route path="/sign-up" render={(routeProps) => {
            return <SignUp onSignUp={this.handleSignUp} {...routeProps} />
          }}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)