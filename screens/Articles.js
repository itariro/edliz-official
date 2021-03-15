import React from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, View } from 'react-native';

// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";

// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";

import * as SQLite from "expo-sqlite";
import { SearchBar } from 'react-native-elements';

const db = SQLite.openDatabase("db.db");
let menuItem = [];
let subConditions = [];

const { width } = Dimensions.get('screen');

class Articles extends React.Component {

  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '', subCondition: '' };
    this.arrayholder = [];
  }

  componentDidMount() {

    db.transaction((tx) => {
      tx.executeSql("select content from tbl_drug", [], (_, { rows }) => {
        if (rows.length > 0) {
          let contentItem = JSON.parse(rows.item(0).content);
          contentItem = contentItem.tbl_drug;
          for (var i = 0; i < contentItem.length; i++) {
            menuItem.push(contentItem[i]);
          }
          this.setState(
            {
              isLoading: false,
              menuItem: menuItem,
            },
            function () {
              this.arrayholder = menuItem;
            }
          );
        }
      });
    });

    // db.transaction(tx => {
    //   tx.executeSql('SELECT id, title, content FROM tbl_sub_condition_rows', [],
    //     (txObj, { rows }) => {
    //       if (rows.length > 0) {
    //         let menuItem = [];
    //         for (var i = 0; i < rows.length; i++) {
    //           menuItem.push(rows.item(i));
    //         }
    //         this.setState(
    //           {
    //             isLoading: false,
    //             menuItem: menuItem,
    //           },
    //           function () {
    //             this.arrayholder = menuItem;
    //           }
    //         );
    //       }
    //     },
    //     (txObj, error) => console.log('Error ', error)
    //   )
    // })

  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  _strCount(main_str, sub_str) {
    main_str += '';
    sub_str += '';

    if (sub_str.length <= 0) {
      return main_str.length + 1;
    }

    let subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return (main_str.match(new RegExp(subStr, 'gi')) || []).length;
  }

  SearchFilterFunction(text) {
    console.log(text);
    const newData = this.arrayholder.filter(function (item) {
      const textData = text.toUpperCase();

      console.log(textData);
      // search parameters
      let item_medicine_title = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const item_patient_info = item.patient_info ? item.patient_info.toUpperCase() : ''.toUpperCase();
      const item_dosage_adults = item.dosage_adults ? item.dosage_adults.toUpperCase() : ''.toUpperCase();
      const item_dosage_paeds = item.dosage_paeds ? item.dosage_paeds.toUpperCase() : ''.toUpperCase();
      const item_pregnancy = item.pregnancy ? item.pregnancy.toUpperCase() : ''.toUpperCase();
      const item_adverse_effects = item.adverse_effects ? item.adverse_effects.toUpperCase() : ''.toUpperCase();
      const item_warnings_black_box = item.warnings_black_box ? item.warnings_black_box.toUpperCase() : ''.toUpperCase();
      const item_warnings_contraindications = item.warnings_contraindications ? item.warnings_contraindications.toUpperCase() : ''.toUpperCase();
      const item_warnings_cautions = item.warnings_cautions ? item.warnings_cautions.toUpperCase() : ''.toUpperCase();

      // allow multi word search - still buggy
      item_medicine_title = item_medicine_title.replace(/\+/g, " "); item_medicine_title = unescape(item_medicine_title).trim();
      // item_patient_info = decodeURIComponent(item_patient_info.replace(/\+/g, "%20"));
      // item_dosage_adults = decodeURIComponent(item_dosage_adults.replace(/\+/g, "%20"));
      // item_dosage_adults = decodeURIComponent(item_dosage_adults.replace(/\+/g, "%20"));
      // item_dosage_paeds = decodeURIComponent(item_dosage_paeds.replace(/\+/g, "%20"));
      // item_pregnancy = decodeURIComponent(item_pregnancy.replace(/\+/g, "%20"));
      // item_adverse_effects = decodeURIComponent(item_adverse_effects.replace(/\+/g, "%20"));
      // item_warnings_black_box = decodeURIComponent(item_warnings_black_box.replace(/\+/g, "%20"));
      // item_warnings_contraindications = decodeURIComponent(item_warnings_contraindications.replace(/\+/g, "%20"));
      // item_warnings_cautions = decodeURIComponent(item_warnings_cautions.replace(/\+/g, "%20"));

      //  lets count the occurances
      let count = -1;
      if ((item_medicine_title.indexOf(textData) > -1)
        || (item_patient_info.indexOf(textData) > -1)
        || (item_dosage_adults.indexOf(textData) > -1)
        || (item_dosage_paeds.indexOf(textData) > -1)
        || (item_pregnancy.indexOf(textData) > -1)
        || (item_adverse_effects.indexOf(textData) > -1)
        || (item_warnings_black_box.indexOf(textData) > -1)
        || (item_warnings_contraindications.indexOf(textData) > -1)
        || (item_warnings_cautions.indexOf(textData) > -1)) { count = 1; }
      return count > -1;
    });

    let summarizedResults = [];
    for (var i = 0; i < newData.length; i++) {
      let content_count = 0;
      let title = newData[i].title.replace(/\+/g, " "); title = unescape(title).trim();
      let title_count = this._strCount(title, text);

      content_count =
        this._strCount(newData[i].patient_info, text) +
        this._strCount(newData[i].dosage_adults, text) +
        this._strCount(newData[i].dosage_paeds, text) +
        this._strCount(newData[i].pregnancy, text) +
        this._strCount(newData[i].adverse_effects, text) +
        this._strCount(newData[i].warnings_black_box, text) +
        this._strCount(newData[i].warnings_contraindications, text) +
        this._strCount(newData[i].warnings_cautions, text);

      summarizedResults.push({
        "id": newData[i].id, "title": title, "content": newData,
        "title_count": title_count, "content_count": content_count, "type": "medicine"
      });
    }

    summarizedResults.sort((a, b) => b.title_count - a.title_count);
    this.setState({
      menuItem: summarizedResults,
      search: text,
    });

  }

  ItemView = ({ item }) => {
    const summary = item.title_count + item.content_count + ' matches found';
    return (
      // Flat List Item
      <View>
        <Text bold size={18} style={styles.title} onPress={() => {
          db.transaction(tx => {
            tx.executeSql('SELECT title, content FROM tbl_sub_condition_rows WHERE condition_id = ?', [item.id],
              (txObj, { rows }) => {
                if (rows.length > 0) {
                  console.log(rows.item(0).title);
                  // this.props.navigation.push("DiseaseConditionDetail", {
                  //   condition_id: item.id,
                  //   condition_title: item.title,
                  //   condition_content: item.content,
                  //   condition_category: 'Diseases and Conditions',
                  // });
                }
              },
              (txObj, error) => console.log('Error ', error)
            )
          });
        }}>
          {item.title}
        </Text>
        <Text muted style={styles.subtitle}>{summary} </Text>
      </View>
    );
  }

  ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  }

  render() {
    return (

      <Block flex style={styles.home}>
        <View
          style={{
            top: 0,
            width: '100%',
            backgroundColor: '#1E1C24',
          }}
        >
          <Text bold size={28} style={styles.header_title}>
            Diseases and Conditions
          </Text>
          <Text muted size={15} style={styles.header_subtitle}>This is a muted paragraph.</Text>
        </View>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Type Here..."
          value={this.state.search}
          containerStyle={{ color: '#1E1C24', backgroundColor: '#1E1C24', foregroundColor: '#5E72E4' }}
        />
        <View
          style={{
            top: 0,
            width: '100%',
            backgroundColor: '#1E1C24',
          }}
        >
          <Text bold size={28} style={styles.header_title}>
            Results
          </Text>
          <Text muted size={15} style={styles.header_subtitle}>This is a muted paragraph.</Text>
        </View>
        <Block row space="evenly">
          <Block flex left style={{ marginTop: 8 }}>
            <Select
              defaultIndex={1}
              options={["01", "02", "03", "04", "05"]}
            />
          </Block>
          <Block flex center>
            <Button small center color="default" style={styles.optionsButton}>
              DELETE
              </Button>
          </Block>
          <Block flex={1.25} right>
            <Button center color="default" style={styles.optionsButton}>
              SAVE FOR LATER
              </Button>
          </Block>
        </Block>
        <FlatList
          data={this.state.menuItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.ItemSeparatorView}
          renderItem={this.ItemView}
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor: 'white',
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  title: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 10,
    color: argonTheme.COLORS.HEADER
  },
  subtitle: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 4,
    color: argonTheme.COLORS.HEADER
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
