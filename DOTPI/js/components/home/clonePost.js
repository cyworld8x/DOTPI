import React, { Component } from 'react';
import { Image, Dimensions, WebView, ActivityIndicator, ListView, TouchableOpacity, RefreshControl, ScrollView, StyleSheet,Clipboard, Platform, ToastAndroid,AlertIOS } from "react-native";

// import Moment from 'moment';
import { connect } from 'react-redux';
import { InterstitialAdManager } from 'react-native-fbads';
import { bookmarkPost, countViewedPosts } from '../../api/actionCreators';
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
    Toast,
    Row,Col,Grid
} from 'native-base';
import Share, {ShareSheet} from 'react-native-share';
import DateHelper from '../../utilities/dateHelper';
import NotificationHelper from '../../utilities/notificationHelper';
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


const logo = require("../../../img/nothumbnail.png");
class ClonePost extends Component {
    //eslint-disable-line
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLoading: true,
            isShowAd:true,
            loadAnotherPost:false,
            Height:deviceHeight
        };
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        
        this.refresh = this.refresh.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.goBack = this.goBack.bind(this);
        this.checkingBookmark = this.checkingBookmark.bind(this);
       
    }
    onCancel() {
        this.setState({ visible: false });
    }
    onOpen() {
        
        this.setState({ visible: !this.state.visible });
    }
   
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }

    checkingBookmark(postid){
        if(this.props.FavoritedPosts!=null && this.props.FavoritedPosts.length>0){
            
            return this.props.FavoritedPosts.filter(post=>Number(post.postid) == Number(postid)).length>0;
        }
        
        return false;
    }
    saveUserState(){
       
        this.props.countViewedPosts();
        this.showFullScreenAd();
        
    }

    showFullScreenAd() {        
        if (!__DEV__) {
            try{
                if(this.props.Settings.ShowFacebookAd==true && this.props.Settings.Views % this.props.Settings.InterstitialRepeatedTime == 0){
                    NotificationHelper.Notify('Quảng cáo sẽ xuất hiện sau vài giây');
                    InterstitialAdManager.showAd(this.props.Settings.InterstitialPlacementId)
                    .then(didClick => { })
                    .catch(error => { NotificationHelper.Notify('CODE:0')})
                } 
            }
            catch(error){
                return;
            }                     
            
        }
    };
    
    savePost(){
        let post = this.state.post;
        if(post!=null){
            this.props.bookmarkPost({postid:post.postid, title:post.title, image:post.image, api:this.props.navigation.state.params.post.api});
        //var result = await StorageApi.addPost({postid:post.postid,title:post.title, image:post.image, api:this.props.navigation.state.params.post.api});
        
            NotificationHelper.Notify('Bài viết đã được lưu');
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
                        postcontent: htmlStyle + '<body>'+ responseJson[0].content+'</body>' + script,
                        isShowAd: true,
                    }, function () {
                        this.props.postcontent = this.state.postcontent;
                        this.saveUserState();
                    });
                    
                }

            })
            .catch((error) => {
                console.error(error);
                NotificationHelper.Notify('Kết nối không thành công!');
                this.props.navigation.navigate('SplashScreen');
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
                NotificationHelper.Notify('Kết nối không thành công!');
                this.props.navigation.navigate('SplashScreen');
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
                <View style={{ flex: 1, }}>
                    <Header style={{ backgroundColor: '#34B089' }}>
                        <Left />

                        <Body>
                            <Text style={{ color: "#FFF", fontWeight: '300' }}>MÓN ĂN NGON</Text>
                        </Body>
                        <Right >

                            <Button
                                transparent
                                onPress={() => this.props.navigation.navigate('Home')}
                            >
                                <Icon style={{ color: "#FFF" }} name="md-home" />
                            </Button>

                        </Right >

                    </Header>
                    <View style={{ flex: 1, }}>
                        <Spinner style={{ paddingTop: deviceHeight / 2 }} color='green' />
                    </View>
                </View>
            );

        }
        // Moment.locale('vn');
        let shareOptions = {
            title: "Chia sẻ bài viết từ ứng dụng Món Ăn Ngon",
            message: "Một ứng dụng tổng hợp nhiều bài viết về các món ăn đa dạng và phong phú",
            url: this.props.Settings.WebsiteUrl,
            title: "Chia sẻ bài viết từ ứng dụng Món Ăn Ngon"
        };

        return (
            <View  style={{ backgroundColor: '#FFF', flex: 1 }} >

                <Header style={{ backgroundColor: '#34B089' }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Category', { url: this.state.post.url, title: this.state.post.categoryname, categoryid: this.state.post.categoryid })}
                        >
                            <Icon style={{ color: "#FFF" }} name="md-arrow-round-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#FFF", fontWeight: '300' }}>MÓN ĂN NGON</Text>
                    </Body>
                    <Right >
                        <Button
                            transparent
                            onPress={() => this.onOpen()}
                        >
                            <Icon style={{ color: "#FFF" }} name="md-share" />
                        </Button>
                        {this.checkingBookmark(this.state.post.postid) == false ?
                            <Button
                                transparent
                                onPress={() => this.savePost()}
                            >
                                <Icon style={{ color: "#FFF" }} name="md-bookmarks" />
                            </Button> : <View />}
                        <Button
                            transparent
                            //onPress={this.showFullScreenAd.bind(this)} 
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Icon style={{ color: "#FFF" }} name="md-home" />
                        </Button>

                    </Right >

                </Header>

                {this.state.visible &&
                    <View style={styles.shareContainer}><View style={styles.shareContainer_Content} onCancel={this.onCancel.bind(this)}>

                        <View style={styles.shareContainer_Row}>
                            <TouchableOpacity style={styles.shareContainer_Row_Content}
                                onPress={() => {
                                    this.onCancel();
                                    setTimeout(() => {
                                        Share.shareSingle(Object.assign(shareOptions, {
                                            "social": "facebook"
                                        }));
                                    }, 300);
                                }}>
                                <Icon style={styles.shareContainer_Row_Icon} name="logo-facebook" /><Text style={styles.shareContainer_Row_Text}>Facebook</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.shareContainer_Row_Content}
                                onPress={() => {
                                    this.onCancel();
                                    setTimeout(() => {
                                        Share.shareSingle(Object.assign(shareOptions, {
                                            "social": "googleplus"
                                        }));
                                    }, 300);
                                }}>
                                <Icon style={styles.shareContainer_Row_Icon} name="logo-googleplus" /><Text style={styles.shareContainer_Row_Text}>Google +</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareContainer_Row_Content}
                                onPress={() => {
                                    this.onCancel();
                                    setTimeout(() => {
                                        Share.shareSingle(Object.assign(shareOptions, {
                                            "social": "twitter"
                                        }));
                                    }, 300);
                                }}>
                                <Icon style={styles.shareContainer_Row_Icon} name="logo-twitter" /><Text style={styles.shareContainer_Row_Text}> Twitter</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.shareContainer_Row}>
                            <TouchableOpacity style={styles.shareContainer_Row_Content}
                                onPress={() => {
                                    this.onCancel();
                                    setTimeout(() => {
                                        Share.shareSingle(Object.assign(shareOptions, {
                                            "social": "whatsapp"
                                        }));
                                    }, 300);
                                }}>
                                <Icon style={styles.shareContainer_Row_Icon} name="logo-whatsapp" /><Text style={styles.shareContainer_Row_Text}>Whatsapp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareContainer_Row_Content}

                                onPress={() => {
                                    this.onCancel();
                                    setTimeout(() => {
                                        if (typeof shareOptions["url"] !== undefined) {
                                            Clipboard.setString(shareOptions["url"]);
                                            if (Platform.OS === "android") {
                                                ToastAndroid.show("Đã sao chép nội dung", ToastAndroid.SHORT);
                                            } else if (Platform.OS === "ios") {
                                                AlertIOS.alert("Mời bạn cài đặt ứng dụng MÓN ĂN NGON", );
                                            }
                                        }
                                    }, 300);
                                }}>
                                <Icon style={styles.shareContainer_Row_Icon} name="md-copy" /><Text style={styles.shareContainer_Row_Text}>Sao chép</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareContainer_Row_Content}
                                onPress={() => {
                                    this.onCancel();
                                    setTimeout(() => {
                                        Share.shareSingle(Object.assign(shareOptions, {
                                            "social": "email"
                                        }));
                                    }, 300);
                                }}>
                                <Icon style={styles.shareContainer_Row_Icon} name="md-mail" /><Text style={styles.shareContainer_Row_Text}  >Email</Text>
                            </TouchableOpacity>



                        </View>
                    </View>
                    </View>
                }
                <ScrollView ref='_scrollView' scrollEnabled={true} >
                    <View style={{ padding: 10, flex: 1 }}>
                        <Text style={{ color: '#660000', fontSize: 20, flex: 1 }}>{this.state.post.title}</Text>
                        <View style={{ flex: 1, paddingVertical: 10, flexDirection: 'row' }}>
                            <Badge info >
                                <Text style={{ fontWeight: '700' }}>{this.state.post.categoryname}</Text>
                            </Badge>
                            <Text style={styles.postDetailMiddleDate}> | </Text>
                            <Text style={styles.postDetailDate}> {DateHelper.getLongDate(this.state.post.date)}</Text>
                        </View>


                        {this.state.postcontent != null ?
                            <WebView scrollEnabled={false}

                                ref='_webView'
                                domStorageEnabled={false}
                                source={{ html: this.state.postcontent, baseUrl:this.props.Settings.WebsiteUrl }}
                                style={{ height: this.state.Height, width: deviceWidth - 20 }}
                                automaticallyAdjustContentInsets={false}

                                renderLoading={() => {
                                    return <View style={{ flex: 1 }}>
                                        <Spinner style={{ paddingTop: deviceHeight / 2 }} color='green' />
                                    </View>
                                }
                                }
                                onNavigationStateChange={this.onNavigationStateChange.bind(this)}>
                            </WebView>
                            : <View></View>
                        }

                        {this.state.Height != deviceHeight && this.state.post.posts != null && this.state.post.posts.length > 0 ?
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={styles.singlePostContainer}>
                                    <Badge style={{ marginTop: 10, backgroundColor: '#34B089' }}>
                                        <Text style={{ fontWeight: '700', fontSize: 14 }}>Các bài khác trong mục {this.state.post.categoryname}</Text>
                                    </Badge>
                                    {this.state.post.posts.map((post) => {
                                        return (<TouchableOpacity key={post.id} onPress={() => {
                                            //this.refresh(post.api);
                                            this.props.navigation.navigate('Post', { post: post })
                                        }}>
                                            <View style={styles.postContent}>

                                                {post.image != null ? <Image style={styles.postImage} source={{ uri: post.image }} /> : <Image style={styles.postImage} source={logo} />}


                                                <View style={styles.postInfo} >
                                                    <Text style={styles.txtPostTitle}>{post.title}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={styles.postDate}>{DateHelper.getLongDate(post.date)}</Text>
                                                        <Text style={styles.postMiddleDate} > | </Text>
                                                        <Text style={styles.postDate}>{DateHelper.getView(post.date, post.id)}</Text>
                                                    </View>
                                                </View>

                                            </View>
                                        </TouchableOpacity>)
                                    }
                                    )}</View>
                            </View> : (<View></View>)}
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
       FavoritedPosts: state.Storage.FavoritedPosts,
       Settings: state.Settings
    };
}

export default connect(mapStateToProps,{bookmarkPost, countViewedPosts})(ClonePost);
