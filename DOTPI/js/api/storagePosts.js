import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

const deletePost = async (post) => {
        
        let posts =await getPosts().then((data)=> {return JSON.parse(data);});

        posts = posts!=null?posts:[];
       
        posts = checkExistPost(post, posts);
       
        
        try {

            await AsyncStorage.setItem('@Posts:key', JSON.stringify(posts), (err, result) => { console.log(result); });
        } catch (error) {
            console.error(error);
            return false;
        }
        return posts;
};

const addPost =async (post) => {
        //await AsyncStorage.setItem('@Posts:key', '', (err, result) => { console.log(err); });
        let posts =await getPosts().then((data)=> {return JSON.parse(data);});
        posts = posts!=null?posts:[];
        
        let  existed = checkingExistedPost(post, posts);
        if(existed==false && posts!=null){
            
            if (posts.length >= 20) {
                posts = posts.slice(0, 18);
            }

            posts= [post].concat(posts);
            
            try {

                await AsyncStorage.setItem('@Posts:key', JSON.stringify(posts), (err, result) => { console.log(err); });
            } catch (error) {
                console.error(error);
                return false;
            }
            return true;
        }
        
        return true;
};
const getPosts = async () => {
        try {
            return await AsyncStorage.getItem('@Posts:key')
           
        } catch (error) {
        // Error retrieving data
            console.error(error);
            return [];
        }
        
    }
    
const checkExistPost = (obj, list) => {
    if (list != null) {
        return list.filter((item) => Number(item.postid) == Number(obj.postid));
        
    }

    return [];
};

const checkingExistedPost = (obj, list) => {
    
    if (list != null) {
        let existedList = checkExistPost(obj,list);
       
        if(existedList.length>0){
            return true;
        }
    }

    return false;
};
module.exports =
{
    getPosts: getPosts,
    addPost: addPost,
    deletePost:deletePost,
    checkExistPost:checkExistPost,
    checkingExistedPost:checkingExistedPost
    
} ;
