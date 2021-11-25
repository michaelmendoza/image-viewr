import React from 'react';
import AppContextProvider from './contexts/AppContext';
import Header from './components/Header';
import SideNav from './components/SideNav';
import Viewports from './components/Viewports';
import Viewport3d from './components/Viewport3d/Viewport3d';

const MainView = (props) => {
  return (
    <div className="main-view blueprint-dots">
      {props.children}
    </div>
  )
}

const App = () => {
  return(
    <section className='app'>  
    <AppContextProvider>
        <Header></Header>
        <div className="layout-row">
          <SideNav></SideNav>
          <MainView> 
            <Viewport3d/>
            <Viewports></Viewports>
          </MainView>
        </div>
    </AppContextProvider>
  </section>
  )
}

export default App; 
