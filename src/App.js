import React from 'react';
import AppContextProvider from './contexts/AppContext';
import Viewport from './components/Viewport';
import FileLoader from './components/FileLoader';
import Header from './components/Header';
import SideNav from './components/SideNav';

const MainView = (props) => {
  return (
    <div className="main-view blueprint-dots">
      {props.children}
    </div>
  )
}

const App = () => (
  <section className='app'>  
    <AppContextProvider>
        <Header></Header>
        <div className="layout-row">
          <SideNav></SideNav>
          <MainView> 
            <div className="layout-row flex">
              <Viewport/>
              <Viewport/>
            </div>
            <div className="layout-row flex">
              <Viewport/>
              <Viewport/>
            </div>
          </MainView>
        </div>
    </AppContextProvider>
  </section>
);

export default App; 
