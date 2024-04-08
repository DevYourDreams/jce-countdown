import React from 'react';
import './App.css';
import {Countdown} from "./countdown/countdown";
import jce from './assets/jce-cannes.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={jce} alt='JCE Cannes' />
        <Countdown />
      </header>
    </div>
  );
}

export default App;
