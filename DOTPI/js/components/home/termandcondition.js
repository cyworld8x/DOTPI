import React, { Component } from 'react';
import { Image, Dimensions, WebView, ActivityIndicator, ListView, TouchableOpacity, RefreshControl, ScrollView, StyleSheet,Clipboard, Platform, ToastAndroid,AlertIOS } from "react-native";

import {
  Container,
  Header,
  Title,  
  View,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Text,
  Spinner

} from "native-base";
const html = `
<div class="content">
    <p>Vui lòng đọc kỹ Thỏa Thuận Sử Dụng (“Thỏa Thuận”) trước khi bạn tiến hành tải, cài đặt, sử dụng tất cả hoặc bất kỳ phần nào của ứng dụng “MÓN ĂN NGON” (“Ứng Dụng”) (bao gồm nhưng không giới hạn phần mềm, các file và các tài liệu liên quan) hoặc sử dụng các dịch vụ do chúng tôi cung cấp để kết nối đến Ứng Dụng. Bạn chấp thuận và đồng ý bị ràng buộc bởi các quy định và điều kiện trong Thỏa Thuận này khi thực hiện các thao tác trên đây. Trường hợp bạn không đồng ý với bất kỳ điều khoản sử dụng nào của chúng tôi (phiên bản này và các phiên bản cập nhật), bạn vui lòng không tải, cài đặt, sử dụng Ứng dụng hoặc tháo gỡ Ứng Dụng ra khỏi thiết bị di động của bạn.</p>
    <p>&nbsp;</p>
    <h1>1. Cập nhật:</h1>
    <p>Thỏa Thuận này có thể được cập nhật thường xuyên, phiên bản cập nhật sẽ được chúng tôi công bố trên ứng dụng. Phiên bản cập nhật sẽ thay thế cho các quy định và điều kiện trong thỏa thuận ban đầu. Bạn có thể truy cập vào Ứng Dụng hoặc vào website trên đây để xem nội dung chi tiết của phiên bản cập nhật.</p>
    <p>&nbsp;</p>
    <h1>2. Giới Thiệu Về Ứng Dụng</h1>
    <p>MÓN ĂN NGON là ứng dụng cung cấp thông tin liên quan đến món ăn, thưởng thức ẩm thực dành riêng cho người dùng di đông tại Việt Nam. Ứng dụng hỗ trợ tất cả các nền tảng Android, iOS.</p>
    <p>&nbsp;</p>
    <h1>3. Quyền Sở Hữu Ứng Dụng</h1>
    <p>Ứng Dụng này được phát triển và sở hữu bởi chúng tôi, tất cả các quyền sở hữu trí tuệ liên quan đến Ứng Dụng (bao gồm nhưng không giới hạn mã nguồn, hình ảnh, dữ liệu, thông tin, nội dung chứa đựng trong Ứng Dụng; các sửa đổi, bổ sung, cập nhật của Ứng Dụng) và các tài liệu hướng dẫn liên quan (nếu có) không cho phép các tổ chức cá nhân nào có quyền sao chép.</p>

    <h1>4. Xử Lý Vi Phạm</h1>
    <p>Trường hợp bạn vi phạm bất kỳ quy định nào trong Thỏa Thuận này, chu có quyền ngay lập tức khóa tài khoản của bạn và/hoặc xóa bỏ toàn bộ các thông tin, nội dung vi phạm, đồng thời tùy thuộc vào tính chất, mức độ vi phạm bạn sẽ phải chịu trách nhiệm trước cơ quan có thẩm quyền, chúng tôi và bên thứ ba về mọi thiệt hại gây ra bởi hoặc xuất phát từ hành vi vi phạm của bạn.</p>
    <p>&nbsp;</p>
    <h1>5. Quyền Truy Cập và Thu Thập Thông Tin</h1>
    <p>Khi sử dụng Ứng Dụng, bạn thừa nhận rằng  chúng tôi có quyền sử dụng những API hệ thống sau để truy cập vào dữ liệu trên  điện thoại của bạn: (1) Khởi động ứng dụng cùng điển thoại, (2) Ghi dữ liệu của Ứng Dụng lên thẻ nhớ, (3)  Truy cập vào Internet từ thiết bị của bạn. Tất cả các truy cập này đều được  chúng tôi thực hiện sau khi có sự đồng ý của bạn, vì vậy bạn cam kết và thừa nhận  rằng, khi bạn đã cấp quyền cho chúng tôi, bạn sẽ không có bất kỳ khiếu nại nào  đối với chúng tôi về việc truy cập này.</p>
    <p>&nbsp;</p>
    <h1>6. Cam Kết Bảo Mật Thông Tin</h1>
    <p>VNG sử dụng các phương thức truyền tin an toàn https và mã hóa để truyền tải và lưu trữ các dữ liệu cá nhân và giao tiếp của bạn. Chúng tôi cam kết giữ bí mật tất cả thông tin mà bạn cung cấp cho chúng tôi hoặc chúng tôi thu thập từ bạn và không tiết lộ với bất kỳ bên thứ ba nào trừ khi có yêu cầu từ Cơ quan Nhà nước có thẩm quyền.</p>
    <p>&nbsp;</p>
    <h1>7. Phí Và Các Khoản Thu</h1>
    <p>Chúng tôi cam kết không thu bất cứ khoản phí nào từ người dùng cho các dịch vụ cơ bản mà hiện tại chúng tôi đang cung cấp.</p>
    <p>&nbsp;</p>
    <h1>8. Quảng cáo và các nội dung thương mại được phân phối bởi MÓN ĂN NGON</h1>
    <p>Khi sử dụng ứng dụng, bạn thừa nhận rằng chúng tôi có quyền cung cấp các nội dung quảng cáo cho bạn.</p>

    <p>&nbsp;</p>
    <h1>9. Liên Lạc Với Chúng Tôi</h1>

    <p>- Địa chỉ email <a href="mailto:cyworld8x@gmail.com">cyworld8x@gmail.com</a>;</p>


    <p><strong>Trân trọng cảm ơn bạn đã sử dụng sản phẩm và dịch vụ của chúng tôi.</strong></p>

</div>`;
const htmlStyle = `<style>
        body{color:#333;margin:0;-webkit-user-select:none;word-wrap:break-word; background:#eee;}
        body {font-family:Helvetica;font-size:14px}

        a,img{border:none}
        a{color:#466da4;cursor:pointer;display:inline;text-decoration:inherit;text-decoration:none}

        h1 {font-size:16px; margin:0 0 8px 0; padding:0; color:white}
        p {margin:0 0 10px 0; line-height:18px;color:white}
        
        .content {border-radius:10px; border:1px solid #ccc; background:#209872; padding:20px; margin:10px 6px;}
        
        .hili01 {margin-top:20px; font-style:italic; color:#666;}
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
class TermAndCondition extends Component {
    constructor(props) {
        super(props);    
    }
  
  componentDidMount() {
  }

  render() {       
    return (
      <View style={{flex:1,backgroundColor: '#34B089'}} >
        <Header  hasTabs style={{ backgroundColor: '#34B089' }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon style={{ color: "#FFF" }} name="menu" />
            </Button>
          </Left>
            <Body>
              <Text style={{ color: "#FFF", fontWeight:'300' }}>MÓN ĂN NGON</Text>
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
        <View style={{ flex: 1, backgroundColor: '#34b089' }}>
            <WebView  source={{ html: htmlStyle + '<body>'+html+'</body>' }} domStorageEnabled={true}
            style={{padding:10}}
                automaticallyAdjustContentInsets={false}
                renderLoading={() => {
                    return (<View style={{ flex: 1 }}>
                        <Spinner style={{ paddingTop: 200}} color='green' />
                    </View>)
                }} />
        </View>
      </View>     
    );
  }
}

export default  TermAndCondition;



