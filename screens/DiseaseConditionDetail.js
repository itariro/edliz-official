import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";
//galio
import { theme } from "galio-framework";
import { argonTheme, Template } from "../constants";
import WebView from "react-native-webview";
import base64 from 'react-native-base64'

const { width } = Dimensions.get("screen");
class DiseaseConditionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        condition_id: props.route.params.condition_id,
        contentTitle: props.route.params.condition_title,
        contentDetail: props.route.params.condition_content,
        contentCategory: props.route.params.condition_category,
      }
    };
  }

  render() {
    let contentDetail = this.state.content.contentDetail;
    contentDetail = decodeURIComponent(contentDetail.replace(/\+/g, "%20"));
    contentDetail = contentDetail.replace(/<img/g, '<img class="img-responsive"');

    const content =
      base64.decode(Template.PAGE.TOP) + '<br><br><h2 class="blog-post-title">' + this.state.content.contentTitle + '</h2>' +
      '<p class="blog-post-meta">' + this.state.content.contentCategory + '</p><hr /><br>' + contentDetail +
      base64.decode(Template.PAGE.BOTTOM);
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: content, baseUrl: '' }}
        style={{ marginTop: 90 }}
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
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 4,
    paddingRight: 4,
    // backgroundColor: "#eaeaea",
  },
});

export default DiseaseConditionDetail;
