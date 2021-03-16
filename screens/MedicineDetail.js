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
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");
const { width } = Dimensions.get("screen");
let forms = '';

class MedicineDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        medicine: props.route.params.medicine,
        category: props.route.params.category,
      },
      formulation: ''
    };
  }

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql("select content from tbl_drug_formulation", [], (_, { rows }) => {
        if (rows.length > 0) {
          // get all content
          //console.log('tbl_drug_formulation');
          let contentItem = JSON.parse(rows.item(0).content);
          contentItem = contentItem.tbl_drug_formulation;
          let formulationTable = '';
          for (var i = 0; i < contentItem.length; i++) {
            if (parseInt(contentItem[i].drug_id) == parseInt(this.state.content.medicine.id)) {
              //console.log('got this => ' + contentItem[i].form);
              ////console.log(contentItem[i].form);
              formulationTable = formulationTable +
                "<tr>" +
                '<td style="text-align: left;"><strong>' + contentItem[i].form + '</strong><br>(' + contentItem[i].natpharm_code + ')</td>' +
                "<td><strong>Strength</strong><br>" + contentItem[i].strength + '<br>' +
                "<td><strong>Unit</strong><br>" + contentItem[i].unit +
                "</td>" +
                "</tr>";
            }
          }

          formulationTable = base64.encode('<h3>Formulations</h3><table style="width:100%" >' + formulationTable + '</table>');
          forms = formulationTable;
          ////console.log(formulationTable);
          this.state = { formulation: formulationTable };
        }
      });
    });
  }

  render() {
    const { formulation } = this.state;
    //formulations
    //console.log(formulation);

    let title = this.state.content.medicine.title.replace(/\+/g, " ");
    let contentDetail =
      '<br><br><h2 class="blog-post-title">' + unescape(title).trim() + '</h2>' +
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
      "<br><h3>Dosage Paeds</h3>" + decodeURIComponent(this.state.content.medicine.dosage_paeds.replace(/\+/g, "%20")) + "<br><hr /><br>" +

      //base64.decode(formulation) +

      '<h3>Cautions</h3><p>Please take special care to take noe of the items in this section when when administering this medicine</p>' +
      '<div class="card bg-warning">' +
      '<div class="card-body">' +
      "<br><h4>Pregnancy</h4>" + decodeURIComponent(this.state.content.medicine.pregnancy.replace(/\+/g, "%20")) +
      "<h4>Adverse Effects</h4>" + decodeURIComponent(this.state.content.medicine.adverse_effects.replace(/\+/g, "%20")) +
      "<h4>Blackbox</h4>" + decodeURIComponent(this.state.content.medicine.warnings_black_box.replace(/\+/g, "%20")) +
      "<h4>Contraindications</h4>" + decodeURIComponent(this.state.content.medicine.warnings_contraindications.replace(/\+/g, "%20")) +
      "<h4>Cautions</h4>" + decodeURIComponent(this.state.content.medicine.warnings_cautions.replace(/\+/g, "%20"))
    '</div></div>';

    contentDetail = contentDetail.replace(/<table>/g, '<table class="table">');

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
