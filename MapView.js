import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import { StyleSheet, WebView } from 'react-native';

const injectScript = `
(function () {
  if (WebViewBridge) {
    WebViewBridge.onMessage = function (message) {
      if (message === "hello from react-native") {
        WebViewBridge.send("got the message inside webview");
      }
    };
    WebViewBridge.send("hello from webview");
  }
}());
`;

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.webView = null;
        this.state = {
            isFinishedLoading: false
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.isFinishedLoading && this.state.isFinishedLoading) {
            console.log('sending message');
            this.webView.postMessage("hello webpage");
        }
    }

    onMessage = (event) => {
        console.log('message passed from html: ', event.nativeEvent.data);
    }

    render() {
        return (
            <WebView
                source={require("./web/map.html")}
                javaScriptEnabled={true}
                ref={(webView => this.webView = webView)}
                onMessage={this.onMessage}
                onLoadEnd={() => this.setState({isFinishedLoading: true})}
                scrollEnabled={false}
                style={styles.map}
            />
        )
    }
}

const styles = StyleSheet.create({
    map: {
     flex: 1,
     backgroundColor: '#000'
    }
  });