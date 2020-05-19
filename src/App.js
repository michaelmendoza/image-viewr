import React from 'react';
import AppContextProvider from './contexts/AppContext';
import Viewport from './components/Viewport';
import FileLoader from './components/FileLoader';

const App = () => (
  <section className='app'>  
    <AppContextProvider>
        <FileLoader/>
        <div className="layout-row flex">
          <Viewport/>
          <Viewport/>
        </div>
        <div className="layout-row flex">
          <Viewport/>
          <Viewport/>
        </div>
    </AppContextProvider>
  </section>
);

export default App; 
