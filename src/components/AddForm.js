import React from 'react'
import { Redirect } from 'react-router-dom'

function AddForm(props) {

    //props.onAdd = function

    if (!props.loggedInUser) {
        return <Redirect to={'/sign-in'} />
    }

    return (
        <form onSubmit={props.onAdd} >
            <input name="name" type="text" placeholder="Enter name"></input>
            <input name="description"  type="text" placeholder="Enter description"></input>
            <input type="file" name="image" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default AddForm