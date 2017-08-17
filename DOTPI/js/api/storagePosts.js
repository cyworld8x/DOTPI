import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

const deletePost = async (post) => {
        
        let result =await getPosts();
        
        let posts =result!=null? JSON.parse(result):[];
       
        posts = checkExistPost(post, posts);
       
        
        try {

            await AsyncStorage.setItem('@Posts:key', JSON.stringify(posts), (err, result) => { console.log(result); });
        } catch (error) {
            console.error(error);
            return false;
        }
        return posts;
};

const addPost = async (post) => {
        
        let result =await getPosts();
        
        let posts =result!=null? JSON.parse(result):[];
       
        posts = checkExistPost(post, posts);
        
        if (posts.length >= 2) {
            posts = posts.slice(0, 1);
        }
        posts.push(post);
        try {

            await AsyncStorage.setItem('@Posts:key', JSON.stringify(posts), (err, result) => { console.log(result); });
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
    
const checkExistPost = (obj, list) => {
    if (list != null && list.length >= 0) {
        list.map((item) => {
            if (item.postid != obj.postid) {
                return item;
            }
        })
    }

    return [];
};
module.exports =
{
    getPosts: getPosts,
    addPost: addPost,
    deletePost:deletePost
} ;
