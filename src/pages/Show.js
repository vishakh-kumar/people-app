import React from "react";
import { useState, useEffect } from "react";

const Show = ({ match, people, updatePeople, deletePeople, history }) => {
    const [editForm, setEditForm] = useState({
        name: "",
        title: "",
        image: "",
    });
    const [person, setPerson] = useState(null);
    //we doing this so when the form loads for edit, it has the previous values
    useEffect(() => {
        if (people) {
            const id = match.params.id;
            const person = people.find((p) => p._id === id);
            setPerson(person);
            setEditForm(person);
        }
        // because people, match are dependencies so it needs to be added to the [] below, which is the depedency array.
    }, [people, match]);
    const loading = () => {
        return <h1>Loading...</h1>;
    };
    const loaded = () => {
        // store the params value in id,(ie. the part of the URL)
        //put everthing in loaded so it doesn't give an error when you refresh
        const id = match.params.id;
        //find takes in a predicate function ie. nothing more than a function that return a boolean, find tries to find the first match that returns true.
        const person = people.find((p) => p._id === id);

        return (
            <div className="person">
                <h1>{person.name}</h1>
                <h2>{person.title}</h2>
                {person.image && <img src={person.image} alt={person.name} />}
                {/* add delete button*/}
                {/* you cannot just do {handleDelete._id} cuz this event will run right away if we dont have an anonymous function  */}
                <button onClick={() => handleDelete(person._id)}>DELETE</button>
            </div>
        );
    };
    const handleChange = (event) => {
        setEditForm({ ...editForm, [event.target.name]: event.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        //   destructuring them for edit
        const { _id, name, title, image } = editForm;
        updatePeople({ name, title, image }, _id);
    };
    const handleDelete = (id) => {
        deletePeople(id);
        // this will redirect us to the homepage
        history.push("/");
    };
    return (
        <div>
            {person ? loaded() : loading()}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="image"
                    value={editForm.image}
                    onChange={handleChange}
                />
                <input type="submit" value="Edit Person" />
            </form>
        </div>
    );
};

export default Show;
