import React from 'react';
import AppContextProvider from './contexts/AppContext';
import Viewport from './components/Viewport';
import FileLoader from './components/FileLoader';

const App = () => (
  <section className='app'>  
    <AppContextProvider>
        <FileLoader/>
        <Viewport/>
    </AppContextProvider>
  </section>
);

export default App; 
