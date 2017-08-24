import StoragePosts from './storagePosts';

const SettingReducer = (state = {}, action) => {
    
    if (action.type === 'SAVE_SETTINGS') {
        return action.settings;
       
    }
    return state;
};

export default SettingReducer;