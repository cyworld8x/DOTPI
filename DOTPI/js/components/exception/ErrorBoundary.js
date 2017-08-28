import React, { Component } from "react";
export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
      this.props.navigation.navigate('SplashScreen');
    }
  
    render() {
      return this.props.children;
    }
  }