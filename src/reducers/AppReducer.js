
export const AppReducer = (state, action) => {
    console.log("AppReducer: " + action.type + ' ' + action); 

    switch(action.type) {
        case 'SET_FILE':
            return {
                ...state,
                file: action.file
            }; 
        case 'ADD_FILE':
            return {
                ...state,
                files: [...state.files, action.file]
            };
        case 'SET_SLICE_INDEX':
            return {
                ...state,
                sliceIndex: { x: action.x, y: action.y, z: action.z } 
            };
        case 'SET_X_SLICE_INDEX':
            return {
                ...state,
                sliceIndex: { ...state.sliceIndex, x:action.x}
            };
        case 'SET_Y_SLICE_INDEX':
            return {
                ...state,
                sliceIndex: { ...state.sliceIndex, x:action.y}
            };            
        case 'SET_Z_SLICE_INDEX':
            return {
                ...state,
                sliceIndex: { ...state.sliceIndex, x:action.z}
            };
        default:
            return state
    }        
}
