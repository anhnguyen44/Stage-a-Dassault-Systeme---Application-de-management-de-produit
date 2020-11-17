let defaultState = false;

let publish = (state=defaultState,action)=>{
    switch(action.type){
        case "PUBLISH_TEMPLATE":
            state = true;
            return state;
        case "IS_PUBLISHED":
            state = false;
            return state;
        default:
            return state;
    }
}

export default publish;