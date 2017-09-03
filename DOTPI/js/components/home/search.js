import React, { Component } from 'react';
import { Image, Dimensions, ListView, TouchableOpacity, StyleSheet, TextInput, Platform, ToastAndroid, AlertIOS } from "react-native";

import {
    Container, Header, Title, Content, Button,
    Icon,
    Card,
    CardItem, Text, View, Thumbnail,
    Left,
    Right,
    Body,
    Toast, Badge,
    Spinner
} from 'native-base';
import DateHelper from '../../utilities/dateHelper';
import NotificationHelper from '../../utilities/notificationHelper';
import styles from './styles';
import ColorHelper from '../../utilities/colorHelper';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

import { connect } from 'react-redux';
const noThumbnail = require("../../../img/logo.png");

class Search extends Component {
    //eslint-disable-line
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            listPosts: ds,
            isLoading: true,
            refreshing: false,
            page: 1,
            txtSearch: ''
        };
        this.arr = [];
    }

    componentDidMount() {
        this.setState({
            isLoading: false,
        });
    }


    queryData() {
        if (!this.state.refreshing) {
            var url = this.props.Settings.ApiUrl +'/search/' + this.state.txtSearch;

            this.setState({
                refreshing: true,
                isLoading: this.state.page==1?true:false
            });
            fetch(url)
                .then((response) => response.json())
                .then(responseJson => {
                    responseJson = responseJson == null ? [] : responseJson;
                    //responseJson = this.preProcessList(responseJson);
                    this.arr = this.state.page > 1 ? this.arr.concat(responseJson) : responseJson;

                    this.setState({
                        refreshing: false,
                        isLoading: false,
                        listPosts: this.state.listPosts.cloneWithRows(this.arr),
                    }, function () {

                        // do something with new state
                    });

                    if (this.arr.length == 0) {
                        NotificationHelper.Notify('Không tìm thấy kết quả nào cho từ khóa "' + this.state.txtSearch + '"');
                    }
                }).catch((error) => {
                    NotificationHelper.Notify('Kết nối không thành công!');
                    this.props.navigation.navigate('SplashScreen');
                });
        }

    }

    onValidate() {
        if (this.state.txtSearch.length < 3) {
            NotificationHelper.Notify('Từ khóa tìm kiếm phải ít nhất 3 ký tự');
            
            return false;
        }

        if (this.state.page > 5) {
            return false;
        }

        return true;
    }

    onLoadMore() {
        if (this.onValidate()) {
            if (this.state.page <= 5)
                this.state.page = this.state.page + 1;
            this.queryData();
        }

    }

    onSearch() {
        if (this.onValidate()) {
            this.state.page = 1;
            this.queryData();
        }

    }

    render() {

        return (<View style={{ flex: 1, backgroundColor: '#34B089' }} >
            <Header hasTabs style={{ backgroundColor: '#34B089' }}>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate("DrawerOpen")}
                    >
                        <Icon style={{ color: "#FFF" }} name="menu" />
                    </Button>
                </Left>
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
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{
                    paddingHorizontal: 10,
                    height: 50
                }}>
                    <TextInput style={{
                        height: 40,
                        backgroundColor: '#FFF',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                    }}

                        maxLength={50}
                        placeholder="Nhập từ khóa tìm kiếm"
                        underlineColorAndroid="transparent"
                        value={this.state.txtSearch}
                        onChangeText={text => {
                                if (text != this.state.txtSearch) {
                                    this.setState({ txtSearch: text, page: 1 })
                                }
                            }
                        }
                        onSubmitEditing={this.onSearch.bind(this)}
                    />
                </View>
                {this.state.isLoading ? (
                    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                        <Spinner style={{ paddingTop: deviceHeight / 2 }} color='green' />
                    </View>
                ) : (<View style={{ flex: 1, backgroundColor: this.arr.length > 0 ? 'silver' : '#FFF' }}>
                    <ListView
                        style={{ flex: 1, borderBottomColor: 'silver', paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 1 }}
                        enableEmptySections={true}
                        key={this._data}
                        removeClippedSubviews={false}
                        dataSource={this.state.listPosts}
                        onEndReached={this.onLoadMore.bind(this)}
                        renderRow={post => (
                            <View style={styles.search_postContainer}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(post.type=='Post'?'Post':'Youtube', { post: post })}>
                                    <View style={styles.search_content}>
                                        {post.image != null ? <Image style={styles.postImage} source={{ uri: post.image }} /> : <Image style={styles.postImage} source={noThumbnail} />}
                                        <View style={styles.search_postInfo}>
                                            <Text style={styles.txtPostTitle}>{post.title}</Text>

                                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ backgroundColor: ColorHelper.getHexColor(post.categoryid), fontSize: 13, borderRadius: 5, color: '#FFF', paddingHorizontal: 7, alignSelf: 'center' }}>{post.categoryname}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.postDate}>{DateHelper.getLongDate(post.date)}</Text>
                                                    <Text style={styles.postMiddleDate} > | </Text>
                                                    <Text style={styles.postDate}>{DateHelper.getView(post.date, post.id)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </TouchableOpacity>

                            </View>

                        )}
                    />
                </View>)}
            </View>
        </View>);
    }

}


function mapStateToProps(state) {
    return { 
	   Settings: state.Settings
    };
}

export default connect(mapStateToProps)(Search);