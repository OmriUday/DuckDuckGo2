import React from 'react';
import './App.css';
import SearchPage from './SearchPage/SearchPage';
import Themes from './UI/Themes';

function App() {
  return (
    <div className='App'>
      <Themes>
        <SearchPage />
      </Themes>
    </div>
  );
}

export default App;
