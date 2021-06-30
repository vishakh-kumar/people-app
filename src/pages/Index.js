import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const Index = (props) => {
    //state to hold formData
    const [newForm, setNewForm] = useState({
        name: "",
        image: "",
        title: "",
    });

    //handleChange function for form
    const handleChange = (event) => {
        //   everytime this function gets called, it spreads out the form so nothing get overwritten and then we dynamically select by [event.target.name]
        setNewForm({ ...newForm, [event.target.name]: event.target.value });
    };

    //handle submit function for form
    const handleSubmit = (event) => {
        event.preventDefault();
        // create people is being passed as props
        props.createPeople(newForm);
        setNewForm({
            name: "",
            image: "",
            title: "",
        });
    };

    //loaded function
    const loaded = () => {
        return props.people.map((person) => (
            <div key={person._id} className="person">
                <Link to={`/people/${person._id}`}>
                    <h1>{person.name}</h1>
                </Link>
                {/* && - & percent so that image only shows up if it is available */}
                {person.image && <img src={person.image} alt={person.name} />}
                <h3>{person.title}</h3>
            </div>
        ));
    };
    const loading = () => {
        return <h1>Loading...</h1>;
    };
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    value={newForm.image}
                    name="image"
                    placeholder="image URL"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    value={newForm.title}
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                />
                <input type="submit" value="Create Person" />
            </form>
            {/* it returns loaded is people are passing else loading() */}
            {props.people ? loaded() : loading()}
        </section>
    );
};

export default Index;
