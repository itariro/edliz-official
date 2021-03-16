import React from 'react';
import { StyleSheet, Dimensions, FlatList, View, Image } from 'react-native';

// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme, Images } from "../constants";

import * as SQLite from "expo-sqlite";
import { SearchBar } from 'react-native-elements';

const db = SQLite.openDatabase("db.db");
const { width } = Dimensions.get('screen');
let menuItem = [];
let menuItemMedicine = [];
let selectedCategory = '';

class MedicineCategories extends React.Component {

  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '', menuItemMedicine: [] };
    this.setState({ displayResults: false })
    this.arrayholder = [];
  }

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql("select content from tbl_drug_category", [], (_, { rows }) => {
        if (rows.length > 0) {
          // get all content
          const content = JSON.parse(rows.item(0).content);
          menuItem = content.tbl_drug_category;
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

  ItemView = ({ item }) => {
    let medicineTitle = item.title;
    medicineTitle = decodeURIComponent(medicineTitle.replace(/\+/g, "%20"));
    return (
      <View>
        <Text bold size={16} color="#525F7F" style={{ textAlign: 'left', marginTop: 15, marginBottom: 15, marginHorizontal: 4 }}
          onPress={() => {
            this._handleSelectedCategory(item);
          }}>{medicineTitle.trim()}</Text>
      </View>
    );
  }

  // for selected medicine
  _handleSelectedCategory = (item) => {
    selectedCategory = item.title; menuItemMedicine = [];
    db.transaction((tx) => {
      tx.executeSql("select content from tbl_drug", [], (_, { rows }) => {
        if (rows.length > 0) {
          // get all content
          let contentItem = JSON.parse(rows.item(0).content);
          contentItem = contentItem.tbl_drug;
          for (var i = 0; i < contentItem.length; i++) {
            if (contentItem[i].category_id == item.id) {
              menuItemMedicine.push(contentItem[i]);
            }
          }
          menuItemMedicine.sort((a, b) => a.id - b.id);
          this.setState(
            {
              isLoading: false,
              menuItemMedicine: menuItemMedicine,
            },
            function () {
              this.arrayholder = menuItemMedicine;
            }
          );
        }
      });
    });
    this.setState({ displayResults: true })
  }

  // for medicine
  search = text => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    console.log(text);
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      menuItemMedicine: newData,
      search: text,
    });
  }

  ItemViewMedicine = ({ item }) => {
    let medicineTitle = item.title;
    medicineTitle = decodeURIComponent(medicineTitle.replace(/\+/g, "%20"));
    return (
      <View>
        <Text bold size={18} style={styles.title} onPress={() => {
          this._handleNavigation(item);
        }}>{medicineTitle}</Text>
        <Text muted style={styles.subtitle} onPress={() => {
          this._handleNavigation(item);
        }}>{selectedCategory}</Text>
      </View>
    );
  }

  // for selected medicine
  _handleNavigation = (item) => {
    this.props.navigation.push("MedicineDetail", {
      medicine: item,
      category: selectedCategory
    });
  }

  // generic
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
    const { navigation } = this.props;
    return (
      <Block flex style={styles.home}>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, backgroundColor: '#ede7f6', height: '100%' }}>
            {/* <TextInput placeholder="Test" style={{ justifyContent: 'flex-start', }} /> */}
            <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: 100 }}>
              <Image
                source={Images.MainMenu[1].icon}
                style={{ alignSelf: 'center', marginTop: 30, height: 64, width: 64 }}
              />
              <Text bold size={17} color="#525F7F" style={{ textAlign: 'center', marginTop: 8, marginBottom: 2, marginHorizontal: 4 }}>Medicines</Text>
              <Text muted size={14} style={{ textAlign: 'center', marginTop: 0, marginBottom: 8, marginHorizontal: 4 }}>Access monographs for prescription and over-the-counter drugs, as well as for corresponding brand-name drugs, herbals, and supplements...</Text>
              <Block style={styles.divider} />
              <FlatList
                data={this.state.menuItem}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.ItemSeparatorView}
                renderItem={this.ItemView}
              />
            </Block>
          </View>
          <View style={{ flex: 2.5, height: '100%' }}>
            <Block style={{ marginTop: 100 }}>
              <Text bold size={32} color="#525F7F" style={{ textAlign: 'left', marginTop: 50, marginBottom: 10, marginHorizontal: 30 }}>{selectedCategory}</Text>
              <Block style={styles.divider} />
            </Block>
            <View style={{ justifyContent: 'flex-end', }}>
              {/* <SearchBar
                round
                searchIcon={{ size: 24 }}
                onChangeText={text => this.SearchFilterFunction(text)}
                onClear={text => this.SearchFilterFunction('')}
                placeholder="Type Here to Search"
                value={this.state.search}
                containerStyle={{ color: '#FFFFFF', backgroundColor: '#FFFFFF', foregroundColor: '#FFFFFF', width:'50%' }}
              /> */}
              {this.state.displayResults &&
                <View style={{ top: 0, width: '100%', backgroundColor: '#E1F5FE', justifyContent: 'center', alignItems: 'center' }}>
                  <Text muted size={15} style={{ textAlign: 'center', marginBottom: 8, marginTop: 8, marginHorizontal: 20, color: '#0D47A1' }} onPress={() => navigation.navigate('GlobalSearchMedicine')}>Found what you are looking for? Tap here to switch to Smart Search for a more precise and in-depth search.</Text>
                </View>
              }
              <FlatList
                data={this.state.menuItemMedicine}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.ItemSeparatorView}
                renderItem={this.ItemViewMedicine}
              />
            </View>
          </View>
        </View>
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
  divider: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
});

export default MedicineCategories;
