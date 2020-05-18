import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
    state = { 
        file: ''
    }
    
    setFile = (file) => { this.setState({file:file})}

    render() {
        return (
            <AppContext.Provider value={{
                ...this.state,
                setFile:this.setFile
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export default AppContextProvider;