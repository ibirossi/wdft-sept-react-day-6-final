import React from 'react'
import {Link} from 'react-router-dom'
import MyChatBot from './MyChatBot'
import MyMap from './MyMap'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
//make sure you check your paths correctly
import "../App.css";



function TodoList(props) {

    // props.todos = [{}, {}, {}]
    const promise = loadStripe("pk_test_51HJ0c0BfOEj3QZ8feuSBtbYIRg1Jz8vYESZmvp1SweikDC6I0M4OkpHmZjwj2A7qXVayZr5fS07Sz9mBZZb1O0fA00GrlcvlMN");

    return (
        <div>
            {/* <MyMap /> */}
            {/* <MyChatBot /> */}
            <Elements stripe={promise}>
                <CheckoutForm />
            </Elements>
           {/* In todo list  
           {
               props.todos.map((todo) => {
                    return <Link to={`/todo/${todo._id}`}>
                        <p key={todo._id} >{todo.name}</p>
                        </Link>
               })
           } */}
        </div>
    )
}


export default TodoList