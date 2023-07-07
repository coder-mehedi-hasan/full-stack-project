export const initialState = null
export const empReducer = (state,action)=>{
    if(action.type === "employee"){
        return action.payload
    }
    return state
}