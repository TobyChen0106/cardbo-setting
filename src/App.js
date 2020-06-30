import React from 'react';
import './App.css';
import SelectCards from './containers/SelectCards';
import Setting from './containers/Setting';

import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Setting />
    </BrowserRouter>
  );
}

export default App;
