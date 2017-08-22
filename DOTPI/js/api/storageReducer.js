import { combineReducers } from 'redux';

import PostReducer from './postReducer';

const StorageReducer = combineReducers({
    FavoritedPosts: PostReducer
});

export default StorageReducer;