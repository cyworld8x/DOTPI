import React from "react";
import App from "./js/App";
import StoreManagement from "./js/api/storageManagement";
import { Provider } from 'react-redux';
// import App from './src/components/App';

export default class App1 extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
    
  }

  render() {
    return (
         <Provider store={StoreManagement}>
                <App />
          </Provider>
    );
  }
}