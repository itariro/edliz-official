import React from 'react';
import { StyleSheet, Dimensions, FlatList, View } from 'react-native';

// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme } from "../constants";

import * as SQLite from "expo-sqlite";
import { SearchBar } from 'react-native-elements';

const db = SQLite.openDatabase("db.db");
const { width } = Dimensions.get('screen');
let menuItem = [];

class Suppliers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, search: '',
      content: {
        // drug_category_id: props.route.params.drug_category_id,
        // drug_category: props.route.params.drug_category,
        // drug_category_description: props.route.params.drug_category_description,
      },
      db_version: "",
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql("select content from tbl_publication", [], (_, { rows }) => {
        if (rows.length > 0) {
          // get all content
          let contentItem = JSON.parse(rows.item(0).content);
          contentItem = contentItem.tbl_publication;
          for (var i = 0; i < contentItem.length; i++) {
            if (contentItem[i].category_id == this.state.content.drug_category_id) {
              menuItem.push(contentItem[i]);
            }
          }
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

  componentWillUnmount() {
    this.state = {
      isLoading: true, search: '',
      content: {
        drug_category_id: 0,
        drug_category: '',
        drug_category_description: '',
      },
      db_version: "",
    };
    this.arrayholder = [];
    menuItem = [];
  }

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
      menuItem: newData,
      search: text,
    });
  }

  ItemView = ({ item }) => {
    let title = item.title.replace(/\+/g, " ");
    title = unescape(title).trim();
    return (
      // Flat List Item
      <View>
        <Text bold size={18} style={styles.title} onPress={() => {
          this.props.navigation.push("MedicineDetail", {
            medicine: item,
            category: this.state.content.drug_category
          });
        }}>
          {title}
        </Text>
        <Text muted style={styles.subtitle} onPress={() => { }}>This is a muted paragraph.</Text>
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
          placeholder="Type Here..."
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

export default Suppliers;
