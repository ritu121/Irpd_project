const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_project_code':
            return [...state,action.payload];
        case "clear_project_code":
            return state = [];
        default:
            return state
    }   
}

export default reducer;