import React from 'react';
import './App.css';
import ButtonAppBar from './NavBar';
import ContentArea from './ContentArea'

function App() {

  return (
    <div className="App">
      <ButtonAppBar/>
      <header className="App-header">
        <ContentArea/>
      </header>
    </div>
  );
}

export default App;
