const reducer = (state=[],action)=>{
    switch(action.type){
        case 'add_cart_item':
            return state=[...state,action.payload]
        case "edit_cart_item":
            return state.map((item,index)=>{
                if(action.payload.cartId !=""){
                    if(item.cartId === action.payload.cartId){
                        const tempObj = {
                            "cartId":item.cartId,
                            "projectCodeData":action.payload.projectCodeData,
                            "activityData":action.payload.activityData,
                            "ItemDescriptionData":action.payload.ItemDescriptionData,
                            "bpData":action.payload.bpData,
                            "plannedDate":action.payload.plannedDate,
                            "quantity":action.payload.quantity,
                            "comments":action.payload.comments
                        }
                        return tempObj
                    }
                }
                return item;
            });
        case "remove_cart_item":
            return  state.filter(item=>item.cartId !== action.payload)
        case "clear_cart":
            return state =[]
        default:
            return state
    }   
}

export default reducer;