import React from 'react';
import './App.css';
import NavOne from './component/NavOne'
import NavTwo from './component/NavTwo'
import ContentWrapper from './component/ContentWrapper';

function App() {
  return (
    <div className="App">
      <NavOne />    
      <NavTwo /> 
      <ContentWrapper />
    </div>
  );
}

export default App;
