import React from 'react';
import HomeScreen from './HomeScreen/HomeScreen';
import './App.css';
import ButtonAppBar from './NavBar';

function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <header className="App-header">
        <HomeScreen style={{height:'90%'}}/>
      </header>
    </div>
  );
}

export default App;
