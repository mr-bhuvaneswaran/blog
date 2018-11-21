import React, { Component } from 'react'
import Entry from './components/Entry';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home';
import AddBlog from './components/AddBlog';
import ViewBlog from './components/ViewBlog';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Entry} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/newBlog" component={AddBlog} />
          <Route exact path="/viewBlog" component={ViewBlog} />
        </div>
      </Router>
    )
  }
}

export default App;