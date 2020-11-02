import React from 'react'

function AddForm(props) {

    //props.onAdd = function
    return (
        <form onSubmit={props.onAdd} >
            <input name="name" type="text" placeholder="Enter name"></input>
            <input name="description"  type="text" placeholder="Enter description"></input>
            <input type="file" className="form-control" name="image" id="image" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default AddForm