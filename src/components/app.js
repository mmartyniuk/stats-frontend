import React from 'react';
import Person from './person';
import Statistics from './statistics';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import '../styles/app.css';

function App() {
  return (
    <div className="App">
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Statistics</Link>
                    </li>
                    <li>
                        <Link to="/form">Form</Link>
                    </li>
                </ul>
                <hr />
                <Switch>
                    <Route exact path="/">
                        <Statistics />
                    </Route>
                    <Route path="/form">
                        <Person />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
