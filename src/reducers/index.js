import { combineReducers } from 'redux';

import queueReducer from './queueReducer';

const rootReducer = combineReducers({
    queueReducer,
});

export default rootReducer;