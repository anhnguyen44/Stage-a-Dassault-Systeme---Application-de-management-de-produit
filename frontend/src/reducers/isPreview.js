let defaultState = {
    isPreview:false,
    modeOverview: true,
};

let isPreview = (state=defaultState,action)=>{
    switch(action.type){
        case "OPEN_PREVIEW":
            state = true;
            return state;
        case "CLOSE_PREVIEW":
            state = false;
            return state;
        case "EDIT_POST":
            console.log("edit post");
            return {isPreview:false,modeOverview:false};
        case "PREVIEW":
            return {...state,isPreview:true};
        case "PUBLIC_POST":
            return {isPreview:false,modeOverview:true};
        default:
            return state;
    }
}

export default isPreview;

