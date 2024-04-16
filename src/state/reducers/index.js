import { combineReducers } from 'redux';
import candidateReducer from './candidateReducer';
import skillReducer from './skillsReducer'

const reducers = combineReducers({
    candidateReducer:candidateReducer,
    skillReducer:skillReducer
})


export default reducers