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
import {API_URL} from './config'


class App extends Component {

  state = {
    todos: [],
    loggedInUser: null,
    errorMessage: null,
  }

  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((response) => {
            this.setState({
              loggedInUser: response.data
            })
        })
    }

    axios.get(`${API_URL}/todos`)
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

    axios.post(`${API_URL}/upload`, uploadForm)
      .then((response) => {

          let newTodo = {
            name: name.value,
            description: description.value,
            completed: false,
            image: response.data.image
          }
      
          axios.post(`${API_URL}/create`, newTodo)
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
    axios.delete(`${API_URL}/todos/${todoId}`)
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
    axios.patch(`${API_URL}/todos/${todo._id}`, {
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

    axios.post(`${API_URL}/signup` , {
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

    axios.post(`${API_URL}/signin` , {
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
      .catch((marta) => {
          this.setState({
            errorMessage: marta.response.data.error
          })
      })
  }

  handleLogOut = (e) => {
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      .then(() => {
          this.setState({
            loggedInUser: null
          })
      })
  }

  handleUnMount = () => {
    this.setState({
      errorMessage: null
    })
  }

  render() {
    const {loggedInUser, errorMessage} = this.state

    return (
      <div>   
        <Nav loggedInUser={loggedInUser} onLogout={this.handleLogOut} />
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
              return <AddForm  loggedInUser={loggedInUser} onAdd={this.handleAdd} />
            }} />
            {/* <Route path="/todo/:todoId" component={TodoDetail}/> */}
            <Route exact path="/todo/:todoId" render={(routeProps) => {
              return <TodoDetail loggedInUser={loggedInUser}  onDelete={this.handleDelete}  {...routeProps} />
            }} />
            <Route path="/todo/:todoId/edit" render={(routeProps) => {
              return <EditForm onEdit={this.handleEdit} {...routeProps} />
            }} />
               <Route path="/sign-in" render={(routeProps) => {
            return <SignIn onUnmount={this.handleUnMount}  errorMessage={errorMessage}   onSignIn={this.handleSignIn} {...routeProps} />
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