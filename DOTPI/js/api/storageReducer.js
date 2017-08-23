import { combineReducers } from 'redux';

import PostReducer from './postReducer';

const StorageReducer = combineReducers({
    Storage: PostReducer
});

export default StorageReducer;