import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

export const App = () => {
    return (
        <BrowserRouter >
            <Route exact path="/" render={() => <h1>Popular Events</h1>} />
            <Route path="/event/:id" render={(props) => <h1>{JSON.stringify(props)}</h1>} />
        </BrowserRouter>
    )
}