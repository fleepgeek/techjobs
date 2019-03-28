import React, { Component } from 'react';
import { Container } from "reactstrap";
import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavbar from "./components/AppNavbar";
import JobList from "./components/JobList";
import CreateJob from "./components/CreateJob";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <Route path="/add-job" component={CreateJob} />
          <Route path="/" exact component={JobList} />
        </Container>
      </div>
    );
  }
}

export default App;
