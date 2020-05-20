import React, { useState, useEffect, useContext } from 'react';
import FileLoader from './FileLoader';

const SideNavItem = (props) => {
      
  return (
    <div className="sidenav-item"> 
      <div className="sidenav-icon" onClick={props.handleClick}>
        <div> <i className="material-icons">{props.icon}</i> </div>
        <div> <label> {props.name} </label> </div>
      </div>
    </div> 
  )
}

const SidePanel = (props) => {
    return(
        <section className="side-panel">
        <div>
            <FileLoader handleClose={props.handleClose}></FileLoader>
        </div>
    </section>
    )
}

const SideNav = () => {
    const [show, setShow] = useState(false);

    return (
        <nav className='sidenav'>  
            { show ? <SidePanel handleClose={ e => setShow(false) }></SidePanel> : null }
            <SideNavItem icon={"add_box"} name={"Upload"} handleClick={ e => setShow(!show) }></SideNavItem>
            <SideNavItem icon={"photo"} name={"View"}></SideNavItem>
        </nav>
    )
}

export default SideNav;