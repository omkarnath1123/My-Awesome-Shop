import React, { Component } from 'react';
import MainPage from './Containers/MainPage/MainPage';
import {BrowserRouter} from 'react-router-dom';
// import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainPage />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
 