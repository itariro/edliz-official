import React from 'react';
import { StyleSheet, Dimensions, FlatList, View, Linking } from 'react-native';

// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme } from "../constants";

import { SearchBar } from 'react-native-elements';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");
const { width } = Dimensions.get('screen');

let menuItem = [
  { 'id': 0, 'title': 'Check for Updates', 'description': 'Update your data to the latest version from the updated EDLIZ digial files', 'navigateTo': 'Onboarding' },
  { 'id': 1, 'title': 'Terms and Conditions', 'description': 'View our Terms and Conditions of Service', 'navigateTo': 'https://www.padendere.co.zw/edliz/support.php' },
  { 'id': 2, 'title': 'Send us Feedback', 'description': 'Have any queries, comments, suggestions or questions?', 'navigateTo': 'Calculators' }
];

class Settings extends React.Component {

  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '', menuItem: menuItem };
    this.arrayholder = menuItem;
  }

  search = text => {
    //console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    //console.log(text);
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

  _handleNavigation = (item, args) => {
    if (item.id == 1) {
      Linking.openURL(item.navigateTo).catch((err) => console.error('An error occurred', err));
    } else {
      this.props.navigation.push(item.navigateTo, {
        args: args,
      });
    }
  }

  ItemView = ({ item }) => {
    return (
      <View>
        <Text bold size={18} style={styles.title} onPress={() => {
          this._handleNavigation(item, '');
        }}>{item.title}</Text>
        <Text muted style={styles.subtitle}>{item.description}</Text>
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

export default Settings;
