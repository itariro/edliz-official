import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View
} from "react-native";
//galio
import { Block, Text, Button as GaButton, theme } from "galio-framework";
import { argonTheme, Template } from "../constants";
import WebView from "react-native-webview";
import base64 from 'react-native-base64'

const { width } = Dimensions.get("screen");

class MedicineDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        medicine: props.route.params.medicine,
        category: props.route.params.category,
      }
    };
  }

  render() {

    let contentDetail =
      '<br><br><h2 class="blog-post-title">' + this.state.content.medicine.title + '</h2>' +
      '<p class="blog-post-meta">' + this.state.content.category + '</p><hr /><br>' +

      '<h3>Codes</h3><table style="width:100%" >' +
      "<tr>" +
      '<td style="text-align: left;"><strong>Availability</strong></td>' +
      "<td>" + this.state.content.medicine.availability + "</td>" +
      "</tr>" +
      "<tr>" +
      '<td style="text-align: left;"><strong>VEN Classification</strong></td>' +
      "<td>" + this.state.content.medicine.ven_classification + "</td>" +
      "</tr>" +
      "</table>" + "<hr /><br>" +
      "<h3>Patient Information</h3>" + decodeURIComponent(this.state.content.medicine.patient_info.replace(/\+/g, "%20")) + "<hr /><br>" +
      "<h3>Dosage Adults</h3>" + decodeURIComponent(this.state.content.medicine.dosage_adults.replace(/\+/g, "%20")) +
      "<h3>Dosage Paeds</h3>" + decodeURIComponent(this.state.content.medicine.dosage_paeds.replace(/\+/g, "%20")) + "<br><hr /><br>" +

      '<div class="col-md-4">' +
      '<div class="p-4 mb-3 bg-warning rounded">' +
      '<h3>Cautions</h3><hr />' +

      "<h4>Pregnancy</h4>" + decodeURIComponent(this.state.content.medicine.pregnancy.replace(/\+/g, "%20")) +
      "<h4>Adverse Effects</h4>" + decodeURIComponent(this.state.content.medicine.adverse_effects.replace(/\+/g, "%20")) +
      "<h4>Warnings Blackbox</h4>" + decodeURIComponent(this.state.content.medicine.warnings_black_box.replace(/\+/g, "%20")) +
      "<h4>Warnings Contraindications</h4>" + decodeURIComponent(this.state.content.medicine.warnings_contraindications.replace(/\+/g, "%20")) +
      "<h4> Cautions</h4>" + decodeURIComponent(this.state.content.medicine.warnings_cautions.replace(/\+/g, "%20")) +

      '</div>' +
      '</div>';

    contentDetail = contentDetail.replace(/<table>/g, '<table class="table">');

    //contentDetail = contentDetail.replace('<p>', '<p style="text-align: left; padding : 0; margin : 0; line-height : 20px;">');
    //contentDetail = contentDetail.replace(/<table>/g, '<table style="width:100%">');
    //contentDetail = contentDetail.replace(/<p>/g, '<p style="font-size:16%; padding : 0; margin : 0; line-height : 20px;">');
    //contentDetail = contentDetail.replace(/<li>/g, '<li style="font-size:16%;">');
    //contentDetail = contentDetail.replace(/<li>/g, '<li style="font-size:16%;">');
    //contentDetail = contentDetail.replace(/<h3>/g, '<h2 style="font-size:30%;">');
    //contentDetail = contentDetail.replace(/</h3>/, '</h2>');
    //contentDetail = this.renderArticles();

    // return (
    //   <Block flex center>
    //     <View
    //       style={{
    //         top: 0,
    //         width: '100%',
    //         backgroundColor: '#1E1C24',
    //       }}
    //     >
    //       <Text bold size={28} style={styles.header_title}>
    //         Diseases and Conditions
    //       </Text>
    //       <Text muted size={15} style={styles.header_subtitle}>This is a muted paragraph.</Text>
    //     </View>
    //     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30, width }}>
    //       <View style={styles.container}>
    //         <Block flex>
    //           <View style={styles.container}>
    //             <HTML
    //               source={{ html: contentDetail }}
    //               imagesMaxWidth={Dimensions.get("window").width}
    //               {...htmlConfig}
    //             />
    //           </View>
    //         </Block>
    //       </View>
    //     </ScrollView>
    //   </Block>
    // );
    const content =
      base64.decode(Template.PAGE.TOP) + contentDetail +
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
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
        onLoadEnd={this._onLoadEnd}
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

export default MedicineDetail;
