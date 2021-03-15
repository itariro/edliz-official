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

class GlobalSearch extends React.Component {

  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '', subCondition: '', result_count: 0 };
    this.arrayholder = [];
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql('SELECT id, title, content FROM tbl_sub_condition_rows', [],
        (txObj, { rows }) => {
          if (rows.length > 0) {
            let menuItem = [];
            for (var i = 0; i < rows.length; i++) {
              menuItem.push(rows.item(i));
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
        },
        (txObj, error) => console.log('Error ', error)
      )
    })
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
    this.setState({ displayResults: false })
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
    this.setState({ displayResults: false })
    if (text != '') { this.setState({ displayResults: true }) }
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.content ? item.content.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    let summarizedResults = [];
    for (var i = 0; i < newData.length; i++) {
      summarizedResults.push({
        "id": newData[i].id, "title": newData[i].title, "content": newData[i].content,
        "title_count": this._strCount(newData[i].title, text), "content_count": this._strCount(newData[i].content, text)
      });
    }
    summarizedResults.sort((a, b) => b.title_count - a.title_count);
    this.setState({
      menuItem: summarizedResults,
      search: text, result_count: summarizedResults.length
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
                  this.props.navigation.push("DiseaseConditionDetail", {
                    condition_id: item.id,
                    condition_title: item.title,
                    condition_content: item.content,
                    condition_category: 'Diseases and Conditions',
                  });
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
        />{this.state.displayResults &&
          <View>
            <View
              style={{
                top: 0,
                width: '100%',
                backgroundColor: '#E1F5FE',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text muted size={15} style={{ textAlign: 'center', marginBottom: 8, marginTop: 8, marginHorizontal: 20, color: '#0D47A1' }}>Results found under Diseases and Conditions.</Text>
            </View>

            <FlatList
              data={this.state.menuItem}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.ItemSeparatorView}
              renderItem={this.ItemView}
            />
          </View>
        }

        {!this.state.displayResults &&
          <View
            style={{
              top: 0,
              width: '100%',
              height: '75%',
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text bold size={16} style={{ textAlign: 'center', marginBottom: 8, marginHorizontal: 20, color: argonTheme.COLORS.HEADER }}>Quickly dig through thousands of our drug, disease and condition information using the EDLIZ Smart Search. To search, simply type in the serach box above.</Text>
          </View>
        }

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

export default GlobalSearch;
