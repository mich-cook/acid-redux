import React, { Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="page-body">
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route component={NotFoundPage} />
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
