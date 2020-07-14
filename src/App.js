import React, { Component } from 'react';
import './App.css';
import Setting from './containers/Setting';

import { BrowserRouter } from "react-router-dom";
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Setting />
      </BrowserRouter>
    );
  }
}

