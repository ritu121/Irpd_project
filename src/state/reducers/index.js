import { combineReducers } from 'redux';
import candidateReducer from './candidateReducer';

const reducers = combineReducers({
    candidateReducer:candidateReducer,
})


export default reducers