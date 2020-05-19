import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
    state = { 
        file: null
    }
    
    setFile = (file) => { this.setState({ file:file }); console.log("AppContext:SetFile"); }

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