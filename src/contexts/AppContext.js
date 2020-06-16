import React, { createContext, useReducer } from 'react';
import { AppReducer } from '../reducers/AppReducer';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const initialState = { 
        file: null,
        files: [],
        sliceIndex: { x:0, y:0, z:0 }
    }
    
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            { props.children }
        </AppContext.Provider>
    )
}

/*
class AppContextProvider extends Component {

    state = { 
        file: null,
        files: [],
        sliceIndex: { x:0, y:0, z:0 }
    }
    
    setFile = (file) => { this.setState({ file:file }); console.log("AppContext:SetFile"); }
    addFile = (file) => { this.setState({ files:[...this.state.files, file] }); console.log("AppContext:AddFile"); }
    setSliceIndex = (indexXYZ) => { let { x, y, z } = {...indexXYZ}; this.setState({ sliceIndex: { x:x, y:y, z:z } }); console.log("AppContext:SliceIndex"); }
    setXSliceIndex = (x) => { let { y, z } = {...this.state.sliceIndex}; this.setState({ sliceIndex:{ x:x, y:y, z:z } }); console.log("AppContext:XSliceIndex"); }
    setYSliceIndex = (y) => { let { x, z } = {...this.state.sliceIndex}; this.setState({ sliceIndex:{ x:x, y:y, z:z } }); console.log("AppContext:YSliceIndex"); }
    setZSliceIndex = (z) => { let { x, y } = {...this.state.sliceIndex}; this.setState({ sliceIndex:{ x:x, y:y, z:z } }); console.log("AppContext:ZSliceIndex"); }
    
    render() {
        return (
            <AppContext.Provider value={{
                ...this.state,
                setFile:this.setFile,
                addFile:this.addFile,
                setSliceIndex:this.setSliceIndex,
                setXSliceIndex:this.setXSliceIndex,
                setYSliceIndex:this.setYSliceIndex,
                setZSliceIndex:this.setZSliceIndex,
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
*/

export default AppContextProvider;