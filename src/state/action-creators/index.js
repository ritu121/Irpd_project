// //Address Start
// export const allCandidates = (candidates) =>{
//     return (dispatch) =>{
//         dispatch({
//             type:'all_candidates',
//             payload:candidates
//         })
//     }
// }

export const init_candidates = (candidates) =>{
   
    return (dispatch) =>{
        dispatch({
            type:'init_candidates',
            payload:candidates
        })
       
    }
}

export const update_candidates = (candidates) =>{
   
    return (dispatch) =>{
        dispatch({
            type:'update_candidates',
            payload:candidates
        })
       
    }
}

export const clear_candidates = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_candidates'
        })
    }
}

export const get_skills=(skills)=>{
    return (dispatch)=>{
        dispatch({
            type:'all_skills',
            payload:skills
        })
    }
}
export const  clear_skills =()=>{
    return (dispatch)=>{
        dispatch({
            type:'clear_skills'
        })
    }
}




