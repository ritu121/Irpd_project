const reducer = (state=[],action)=>{
    switch(action.type){
        case 'all_skills':
            return [...state,action.payload]
        case "clear_skills":
            return state = [];
        default:
            return state
    }   
}

export default reducer;