import StoragePosts from './storagePosts';

const PostReducer = (state = [], action) => {
    if (action.type === 'BOOK_MARK_POST') {
        
        if(state!=null && action.post!=null){
                (async () => {
                    await StoragePosts.addPost(action.post);
                    })();
                let existed =  StoragePosts.checkingExistedPost(action.post,state);
                
                if(!existed){ 
                    return [action.post].concat(state);
                }
                
        } 
        return state;      
    }
    if (action.type === 'LOAD_CONFIGURATION') {
        var posts = StorageApi.getPosts().then((data)=> {
            let posts = JSON.parse(data);
            return posts;
         });
        state.posts = posts;
        return state;
    }
    if (action.type === 'UN_BOOK_MARK_POST') {
        var posts = [];
        if (state.FavoritedPosts != null && state.FavoritedPosts.length >= 0) {
            state.FavoritedPosts.map((item) => {
                if (item.postid != action.post.postid) {
                    posts.push(item);
                }
            });
        }
        action.posts = posts;       
        StorageApi.deletePost(action.post);
        return state;
    }
    if(action.type === 'CHECKING-BOOKMARK'){
        let existed =  StoragePosts.checkingExistedPost(action.post,state.FavoritedPosts);
        return { ...state, booked:existed};
    }
    return state;
};

export default PostReducer;