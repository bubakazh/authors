import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const AddAuthor = () => {

    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const createAuthor = (e) => {
        e.preventDefault()
        if (name.trim().length === 0){
            setName("");
        }
        let body = {
            "name" : name.trim()
        }
        // ! MAKE AN AXIOS REQUEST TO MY API
        axios.post("http://localhost:8000/api/authors", body)
            .then ( res => {
                console.log(res.data)
                // setName("")
                navigate("/");

            })
            .catch ( err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })            
            // .catch ( errors => console.log(errors))
        // ! not https. WE ARE NOT SET UP TO RECEIVE SECURE REQUESTS YET.
    }

    return (
        <fieldset>
            <legend>AddAuthor.jsx</legend>
            <h1>Favorite Authors</h1>
            <Link to = "/" >Home</Link>
            <h3>Add a new author:</h3>
            <form onSubmit = {createAuthor}>
                <p>
                    Name:
                    <input type="text" value = { name } onChange = { e => setName(e.target.value)}/>
                </p>
                <div>
                    <Link to = "/">Cancel</Link>
                    {
                        name.trim().length < 3 ?
                        <input disabled type="submit" value = "SUBMIT" /> :
                        <input type="submit" value = "SUBMIT" />
                    }
                </div>
            </form>
            {
                errors.map((error) => <p> { error } </p>)
            }
        </fieldset>
    )
}

export default AddAuthor