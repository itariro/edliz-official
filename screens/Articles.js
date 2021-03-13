import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  View
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
import { argonTheme, Images, tabs, Template } from "../constants/";
import WebView from "react-native-webview";
import base64 from 'react-native-base64'

const { width } = Dimensions.get("screen");

class Articles extends React.Component {

  componentDidMount() {
    console.log('file => ');
  }

  render() {
    const content =
      base64.decode(Template.PAGE.TOP) + '<p>works right?</p>' +
      base64.decode(Template.PAGE.BOTTOM);
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: content, baseUrl: '' }}
        style={{ marginTop: 20 }}
        allowFileAccess
        allowingReadAccessToURL={'file://'}
        allowUniversalAccessFromFileURLs
        allowFileAccessFromFileURLs
        mixedContentMode={'always'}
        scalesPageToFit={true}
        useWebKit
      />
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor: 'white',
  },
  header_title: {
    paddingHorizontal: theme.SIZES.BASE * 1,
    marginTop: 10,
    color: '#FFFFFF'
  },
  header_subtitle: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 1,
    marginTop: 4,
    color: argonTheme.COLORS.ACTIVE
  },
});

export default Articles;
