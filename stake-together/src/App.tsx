import React from 'react';
import './App.css';
import ButtonAppBar from './NavBar';
import ContentArea from './ContentArea'
import { useState } from 'react';
import PageEnum from './PageEnum';

function App() {
  const [pageType, setPageType] = useState(PageEnum.HOME);
  const onPageChange = (pageType: PageEnum) => {
    setPageType(pageType);
  };

  return (
    <div className="App">
      <ButtonAppBar onPageChange={onPageChange}/>
      <ContentArea pageType={pageType} onPageChange={onPageChange}/>
    </div>
  );
}

export default App;
