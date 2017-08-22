import React, { Component } from 'react';
import { Image, Dimensions, WebView, ActivityIndicator, ListView, TouchableOpacity, RefreshControl, ScrollView, StyleSheet } from "react-native";

// import Moment from 'moment';
import { connect } from 'react-redux';
import { bookmarkPost, unbookmarkPost } from '../../api/actionCreators';
import {
    Container, Header, Title, Content, Button,
    Badge,Spinner,
    Card,
    CardItem, Text, View, Thumbnail,
    Left,
    Right,
    Body,
    Fab,
    DeckSwiper,
    Icon,
    Toast
} from 'native-base';
const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;
import styles from './styles';
import StorageApi from '../../api/storagePosts';
import HTMLView from 'react-native-htmlview';
const script = `<script>
                       ;(function() {
                        var calculator = document.createElement("div");
                        calculator.id = "height-calculator";
                        while (document.body.firstChild) {
                            calculator.appendChild(document.body.firstChild);
                        }
                        document.body.appendChild(calculator);
                        
                        var i = 0;
                        function updateHeight() {
                            document.title = calculator.clientHeight;
                            window.location.hash = ++i;
                        }
                        updateHeight();
                        window.addEventListener("load", function() {
                            updateHeight();
                            setTimeout(updateHeight, 1000);
                        });
                        window.addEventListener("resize", updateHeight);
                        }());
                        </script>`;

const htmlStyle = `<style>
        body, html, #height-calculator {
            margin: 0;
            padding: 0;
        }
        #height-calculator {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
        body {
            width:98%;
        }
        h2 {
            font-size: 48px;
        }
        p {
            font-size: 18px;
        }
        h3 {
            font-size: 32px
        }
        img {
            width:100%;
        }
        td {
            display: block !important;
            width: 95% !important;
        }
        img {
            width:100%;
            radius:5px;
        }
        hr {
            width: 98%;
        }
        ol li ol li ol li {
            position: relative; right: 85px;
        }
        ul {
            width: 98%,
            margin-left: -25px;
        }
        li {
            width: 98%;
        }
        .tabs {
            display: none;
        }
        .tabs > li {
            display: none;
        }
        .tabs-content {
            padding: 0;
            list-style-type: none;
        }
        tr {
            display: flex;
            flex-direction: column;
        }
</style>`;
class Post extends Component {
    //eslint-disable-line
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            loadAnotherPost:false,
            Height:deviceHeight
        };
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.checkingBookmark = this.checkingBookmark.bind(this);
    }
   
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }

    checkingBookmark(postid){
        //conslode.error(this.props.FavoritedPosts);
        if(this.props.FavoritedPosts!=null && this.props.FavoritedPosts.length>0){
            
            return this.props.FavoritedPosts.filter(post=>Number(post.postid) == Number(postid)).length>0;
        }
        
        return false;
    }

    savePost(){
        let post = this.state.post;
            if(post!=null){
                this.props.bookmarkPost({postid:post.postid, title:post.title, image:post.image });
            //var result = await StorageApi.addPost({postid:post.postid,title:post.title, image:post.image, api:this.props.navigation.state.params.post.api});
            Toast.show({
                text: 'Bài viết đã được lưu để xem sau!',
                position: 'bottom',
                type: 'success',
                duration: 1000
            });
        }
        
    }

    componentDidMount() {
        var url = this.props.navigation.state.params.post.api;
        
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
               
                if (responseJson.length > 0) {
                    this.arr = responseJson[0].posts;
                    this.setState({
                        isLoading: false,
                        post: responseJson[0],
                        postcontent: htmlStyle + '<body>'+ responseJson[0].content+'</body>' + script
                    }, function () {
                        this.props.postcontent = this.state.postcontent;
                    });
                    
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    refresh(url){

        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.length > 0) {
                    this.arr = responseJson[0].posts;
                    this.setState({
                        isLoading: false,
                        post: responseJson[0],
                        postcontent: htmlStyle + '<body>'+ responseJson[0].content+'</body>' + script,
                        loadAnotherPost:true
                    }, function () {
                        
                       
                    });
                    this.props.postcontent = this.state.postcontent;
                    // let seen = [];

                    // let json = JSON.stringify(this.refs._webView, function(key, val) {
                    // if (val != null && typeof val == "object") {
                    //         if (seen.indexOf(val) >= 0) {
                    //             return;
                    //         }
                    //         seen.push(val);
                    //     }
                    //     return val;
                    // });
                    // console.error(json);
                    //this.refs._webView.reload();
                    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true}); 
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    onNavigationStateChange(event) {
        if (event.title) {
            const htmlHeight = Number(event.title);//convert to number
            this.setState({Height:htmlHeight});
        }

     }
    
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
            
        }
        // Moment.locale('vn');
      
              
         return (
             <View style={{ backgroundColor: '#FFF', flex: 1 }} >

                 <Header style={{ backgroundColor: '#34B089' }}>
                     <Left>
                         <Button
                             transparent
                             onPress={() => this.props.navigation.navigate('Category', { url: this.state.post.url, title: this.state.post.categoryname })}
                         >
                             <Icon style={{ color: "#FFF" }} name="md-arrow-round-back" />
                         </Button>
                     </Left>
                     <Body>
                         <Title style={{ color: "#FFF" }}>{this.state.post.categoryname} </Title>
                     </Body>
                     <Right >
                         {this.checkingBookmark(this.state.post.postid)==false?
                         <Button
                             transparent
                             onPress={() => this.savePost()}
                         >
                             <Icon style={{ color: "#FFF" }} name="md-bookmarks" />
                         </Button>:<View/>}
                         <Button
                             transparent
                             onPress={() => this.props.navigation.navigate('DrawerOpen')}
                         >
                             <Icon style={{ color: "#FFF" }} name="menu" />
                         </Button>
                     </Right >
                 </Header>
                 <ScrollView ref='_scrollView' scrollEnabled={true} >
                     <View style={{padding:10, flex:1}}>
                      <Text style={{ color: '#660000', fontSize: 20, flex:1 }}>{this.state.post.title}</Text>
                      <View style={{flex:1, paddingVertical: 10, flexDirection:'row'}}>
                             <Badge infrro >
                                 <Text style={{fontWeight :'700'}}>{this.state.post.categoryname}</Text>
                             </Badge>
                             <Text style={{paddingLeft:10}}>|</Text> 
                      </View>
                      {/* {this.state.postcontent!=null ?
                      <WebView scrollEnabled={false}
                      
                             ref='_webView'
                             domStorageEnabled={false}
                             html={this.state.postcontent}
                             style={{ height: this.state.Height, width: deviceWidth - 20 }}
                             automaticallyAdjustContentInsets={false}
                             renderLoading={() => {
                                return <View style={{ flex: 1, paddingTop: deviceHeight/2 }}>
                                     <Spinner color='green' />
                                 </View>
                                }
                            }
                            onNavigationStateChange={this.onNavigationStateChange.bind(this)}>
                      </WebView>
                      :<View></View>
                      } */}
                        {this.state.postcontent!=null ?
                      <WebView scrollEnabled={false}
                      
                             ref='_webView'
                             domStorageEnabled={false}
                             source={{html:this.state.postcontent}}
                             style={{ height: this.state.Height, width: deviceWidth - 20 }}
                             automaticallyAdjustContentInsets={false}
                             renderLoading={() => {
                                return <View style={{ flex: 1, paddingTop: deviceHeight/2 }}>
                                     <Spinner color='green' />
                                 </View>
                                }
                            }
                            onNavigationStateChange={this.onNavigationStateChange.bind(this)}>
                      </WebView>
                      :<View></View>
                      }
                                          
                   {this.state.post.posts!=null && this.state.post.posts.length>0?
                        <View style={{flexDirection: 'row', flex:1}}> 
                            <View style={styles.singlePostContainer}>
                                <Badge  style={{marginTop:10, backgroundColor:'#34B089'}}>
                                    <Text style={{fontWeight :'700', fontSize:14}}>Các bài khác trong mục {this.state.post.categoryname}</Text>
                                </Badge>
                            {this.state.post.posts.map((post)=>
                                {
                                    return (<TouchableOpacity key={post.id} onPress={() => {  
                                          //this.refresh(post.api);
                                             this.props.navigation.navigate('ClonePost',{post:post})
                                        }}>
                                                    <View  style={styles.postContent}>

                                                        <Image style={styles.postImage} source={{ uri: post.image}}/>
                                                        

                                                        <View style={styles.postInfo} >
                                                            <Text style={styles.txtName}>{post.title}</Text>
                                                        </View>

                                                    </View>
                                                </TouchableOpacity>)
                                } 
                            )}</View>
                        </View>:(<View></View>)}
                     </View>
                     
                     
                 </ScrollView>
             </View>
                );
    }
    renderNode(node, index, siblings, parent, defaultRenderer) {
        if (node.name == 'img') {
            const src = node.attribs.src;
            
            return (
  
                <Image style={{
                    flex: 1,
                    alignSelf: 'cover',
                    height: deviceWidth * 2 / 3,
                    width: deviceWidth,
                    borderWidth: 1,
                    borderRadius: 75
                }} source={{ uri: src, cache: 'only-if-cached' }} resizeMode="contain" />
            )
        }
    }
}

function mapStateToProps(state) {
    return { 
       FavoritedPosts: state.FavoritedPosts
    };
}

export default connect(mapStateToProps,{ bookmarkPost, unbookmarkPost })(Post);
