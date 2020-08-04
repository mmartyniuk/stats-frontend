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
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Router>
            <div>
                <ul className="list-unstyled">
                    <li>
                        <Link  class="badge badge-success my-2 w-25" to="/"><h1 class="h3">Statistics</h1></Link>
                    </li>
                    <li>
                        <Link class="badge badge-warning my-2 w-25" to="/form"><h1 class="h3">Form</h1></Link>
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
