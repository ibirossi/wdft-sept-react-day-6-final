import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function MyNav(props) {

    let buttonStyle = {marginLeft: '10px'}

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/">Todos</Link>
                    <Link style={buttonStyle} to="/add-form">Add Todo</Link>
                    <Link style={buttonStyle}  to="/sign-in">Sign In</Link>
                    <Link style={buttonStyle}to="/sign-up">Sign Up</Link>
                    <button style={buttonStyle}  onClick={props.onLogout}>Logout</button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNav