import React from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, View } from 'react-native';

// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants/";

import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import { SearchBar } from 'react-native-elements';

const db = SQLite.openDatabase("db.db");
let menuItem = [];
let subConditions = [];

const { width } = Dimensions.get('screen');


const getItem = (item) => {
  // Function for click on an item
  alert('Id : ' + item.id + ' Title : ' + item.title);
  db.transaction(tx => {
    tx.executeSql('SELECT title, content FROM tbl_sub_condition_rows WHERE condition_id = ?', [item.id],
      (txObj, { rows }) => {
        if (rows.length > 0) {
          console.log(rows.item(0).title);
          let subCond = {
            condition_id: item.id,
            condition_title: rows.item(0).title,
            condition_content: rows.item(0).content,
          };

          this.state = { subCondition: subCond };

          this.props.navigation.push("Pro", {
            condition_id: item.id,
            condition_title: rows.item(0).title,
            condition_content: rows.item(0).content,
          });
        }
      },
      // failure callback which sends two things Transaction object and Error
      (txObj, error) => console.log('Error ', error)
    )
  })
};

class Home extends React.Component {

  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '', subCondition: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql("select content from tbl_condition", [], (_, { rows }) => {
        if (rows.length > 0) {
          // get all content
          const content = JSON.parse(rows.item(0).content);
          menuItem = content.tbl_condition;
          menuItem.sort((a, b) => a.id - b.id);
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
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    console.log(text);
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      menuItem: newData,
      search: text,
    });
  }

  ItemView = ({ item }) => {
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
                    condition_title: rows.item(0).title,
                    condition_content: rows.item(0).content,
                  });
                }
              },
              // failure callback which sends two things Transaction object and Error
              (txObj, error) => console.log('Error ', error)
            )
          });
        }}>
          {item.title}
        </Text>
        <Text muted style={styles.subtitle} onPress={() => {
          db.transaction(tx => {
            tx.executeSql('SELECT title, content FROM tbl_sub_condition_rows WHERE condition_id = ?', [item.id],
              (txObj, { rows }) => {
                if (rows.length > 0) {
                  console.log(rows.item(0).title);
                  this.props.navigation.push("DiseaseConditionDetail", {
                    condition_id: item.id,
                    condition_title: rows.item(0).title,
                    condition_content: rows.item(0).content,
                  });
                }
              },
              // failure callback which sends two things Transaction object and Error
              (txObj, error) => console.log('Error ', error)
            )
          });
        }}>This is a muted paragraph.</Text>
      </View>
    );
  }

  ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
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
          placeholder="Type Here to Search"
          value={this.state.search}
          containerStyle={{ color: '#1E1C24', backgroundColor: '#1E1C24', foregroundColor: '#5E72E4' }}
        />
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

export default Home;
