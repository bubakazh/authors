import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'

const EditAuthor = () => {

    const { author_id } = useParams();

    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${author_id}`)
            .then(res => {
                setName(res.data.name)
            })
            .catch(errors => console.log(errors))
    }, [])

    const updateAuthor = (e) => {
        e.preventDefault()
        if (name.trim().length === 0){
            setName("");
        }
        let updatedBody = {
            "name" : name.trim()
        }
        // ! MAKE AN AXIOS REQUEST TO MY API
        axios.put(`http://localhost:8000/api/authors/update/${author_id}`, updatedBody)
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
            <legend>EditAuthor.jsx</legend>
            <h1>Favorite Authors</h1>
            <Link to = "/" >Home</Link>
            <h3>Edit this author:</h3>
            <form onSubmit= {updateAuthor}>
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

export default EditAuthor