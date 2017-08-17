import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

const addPost = async (post) => {
        
        
        let result =await getPosts();
        let posts = JSON.parse(result);
        let existed = checkExistPost(post, posts);
        if(post !=null && post.length > 0 && existed) {
               return true;
        } else {
            
            if(posts.length >= 20) {
                posts.slice(19, 1);             
                
            }
             posts.push(post);
           
        }
            
        try {
            
            await AsyncStorage.setItem('@Posts:key', JSON.stringify(posts),(err, result) => { console.log(result); });
        } catch (error) {
            console.error(error);
            return false;
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
    
const checkExistPost = (obj, list)=>{
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].postid == obj.postid) {
                return true;
            }
        }

        return false;
    };
module.exports =
{
    getPosts: getPosts,
    addPost: addPost
} ;
