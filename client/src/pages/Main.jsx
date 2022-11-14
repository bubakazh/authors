import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Main = () => {

    const [authorList, setAuthorList] = useState([]);
    const [errors, setErrors] = useState([]);
    const [flip, setFlip] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
        .then( res => {
            // console.log(res.data)
            setAuthorList(res.data);
        })
        .catch( errors => console.log(errors.response.data.errors))
    }, [flip])

    const deleteAuthor = (author_id) => {
        axios.delete(`http://localhost:8000/api/authors/delete/${author_id}`)
            .then( res => {
                console.log(res.data)
                setFlip(!flip)
            })
            .catch(errors => console.log(errors))
    }

    return (
        <fieldset>
            <legend>Main.jsx</legend>
            <h1>Favorite Authors</h1>
            <Link to = "/new">Add an author</Link>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {
                    authorList.map( (author) => {
                        const {_id, name} = author;
                        return(
                            <tr>
                                <td> { name } </td>
                                <td>
                                    <Link to = {`/edit/${_id}`}>Edit</Link>
                                    <button onClick = {() => deleteAuthor(_id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </fieldset>
    )
}

export default Main