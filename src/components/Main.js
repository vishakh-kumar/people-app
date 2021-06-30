import React from "react";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "../pages/Index";
import Show from "../pages/Show";
const Main = (props) => {
    const [people, setPeople] = useState(null);

    const URL = "https://everest-people.herokuapp.com/people/";

    //fetch people data from our backend
    const getPeople = async () => {
        const response = await fetch(URL);
        // turn that json data into usable JS
        const data = await response.json();
        setPeople(data);
    };
    //===================
    //  create people
    //===================
    const createPeople = async (person) => {
        //make post request to create people
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            //serialised to json data, turn js to json data
            body: JSON.stringify(person),
        });
        //this is to make sure the state is updated, this fetches a brand new data
        getPeople();
    };
    //===================
    //  UPDATE PEOPLE
    //===================
    const updatePeople = async (person, id) => {
        await fetch(URL + id, {
            // add config method
            method: "PUT",
            headers: {
                "Content-type": "Application/json",
            },
            body: JSON.stringify(person),
        });
        getPeople();
    };

    //===================
    //  DELETE PEOPLE
    //===================
    const deletePeople = async (id) => {
        await fetch(URL + id, {
            method: "DELETE",
        });
        getPeople();
    };

    //we want a side effect to run, as a result of component being mounted to the DOM, that effect is carried out by useEffect function, []-empty dependecy array is to make sure it only run once and not after every state change.
    useEffect(() => getPeople(), []);
    return (
        <main>
            <Switch>
                {/* exact is used otherwise everything that starts with / will will go on index */}
                <Route exact path="/">
                    <Index people={people} createPeople={createPeople} />
                </Route>
                {/* implicitly return the show page and then we spread out the props using spread value */}
                <Route
                    //other functionality to check if user logged in
                    // if not, programmitacally redirect somewhere else
                    //<Redirect/> helps used to sent somewhere else if they not logged in
                    //reason we using render prop is because we want the history so we can pass the url param
                    path="/people/:id"
                    render={(rp) => (
                        <Show
                            {...rp}
                            people={people}
                            deletePeople={deletePeople}
                            updatePeople={updatePeople}
                        />
                    )}
                />
            </Switch>
        </main>
    );
};

export default Main;
