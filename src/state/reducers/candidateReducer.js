const reducer = (state=[],action)=>{
    switch(action.type){
        case 'init_candidates':
            return [...state,action.payload]
        case 'update_candidates':
            return state.map((item,index)=>{                       
                if(item.candidate_id === Number(action.payload.candidate_id)){
                    const tempObj = {
                        "candidate_id":item.candidate_id,
                        "status":action.payload.status,
                        "comments":action.payload.comments
                    }
                    return tempObj;
                }else{
                    return item;
                }   
            });
        case "clear_candidates":
            return state = [];
        default:
            return state
    }   
}

export default reducer;
