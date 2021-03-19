import React from 'react';
import { StyleSheet, Dimensions, FlatList, View, Image } from 'react-native';

// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme, Images, Template } from "../constants";
import WebView from "react-native-webview";
import base64 from 'react-native-base64'
import { Input } from "../components/";
import * as SQLite from "expo-sqlite";
import { SearchBar } from 'react-native-elements';

const db = SQLite.openDatabase("db.db");
let menuItem = [];
let subConditions = [];
let selectedCategory = '';

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

class DiseaseConditionsBigScreen extends React.Component {

  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '', subCondition: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql("select * from tbl_condition", [], (_, { rows }) => {
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
    this.setState({ displayResults: false })
    if (text != '') { this.setState({ displayResults: true }) }
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
    return (
      <View>
        <Text bold size={18} style={styles.title} onPress={() => this._navigateTo(item)} >
          {item.title}
        </Text>
        <Text muted style={styles.subtitle} onPress={() => this._navigateTo(item)}>Chapter {item.id}</Text>
      </View>
    );
  }

  _navigateTo(item) {
    db.transaction(tx => {
      tx.executeSql('SELECT title, content FROM tbl_sub_condition_rows WHERE condition_id = ?', [item.id],
        (txObj, { rows }) => {
          if (rows.length > 0) {
            console.log(rows.item(0).title);

            let contentDetail = rows.item(0).content;
            contentDetail = decodeURIComponent(contentDetail.replace(/\+/g, "%20"));
            contentDetail = contentDetail.replace(/<img/g, '<img class="img-responsive"');

            selectedCategory =
              base64.decode(Template.PAGE.TOP) + '<br><br><h2 class="blog-post-title">' + rows.item(0).title + '</h2>' +
              '<p class="blog-post-meta">' + item.title + '</p><hr /><br>' + contentDetail +
              base64.decode(Template.PAGE.BOTTOM);
            this.setState({ content: selectedCategory });

            // this.props.navigation.push("DiseaseConditionDetail", {
            //   condition_id: item.id,
            //   condition_title: rows.item(0).title,
            //   condition_content: rows.item(0).content,
            //   condition_category: item.title,
            // });
          }
        },
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
      )
    });
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
    const { navigation } = this.props;
    // return (
    //   <Block flex style={styles.home}>
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
    //     <SearchBar
    //       round
    //       searchIcon={{ size: 24 }}
    //       onChangeText={text => this.SearchFilterFunction(text)}
    //       onClear={text => this.SearchFilterFunction('')}
    //       placeholder="Type Here to Search"
    //       value={this.state.search}
    //       containerStyle={{ color: '#1E1C24', backgroundColor: '#1E1C24', foregroundColor: '#5E72E4' }}
    //     />
    //     <View>
    //       {this.state.displayResults &&
    //         <View
    //           style={{
    //             top: 0,
    //             width: '100%',
    //             backgroundColor: '#E1F5FE',
    //             justifyContent: 'center',
    //             alignItems: 'center'
    //           }}
    //         >
    //           <Text muted size={15} style={{ textAlign: 'center', marginBottom: 8, marginTop: 8, marginHorizontal: 20, color: '#0D47A1' }} onPress={() => navigation.navigate('GlobalSearch')}>Found what you are looking for? Tap here to switch to Smart Search for a more precise and in-depth search.</Text>
    //         </View>
    //       }
    //       <FlatList
    //         data={this.state.menuItem}
    //         keyExtractor={(item, index) => index.toString()}
    //         ItemSeparatorComponent={this.ItemSeparatorView}
    //         renderItem={this.ItemView}
    //       />
    //     </View>
    //   </Block>
    // );
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
              <Text bold size={17} color="#525F7F" style={{ textAlign: 'center', marginTop: 8, marginBottom: 2, marginHorizontal: 4 }}>Diseases and Conditions</Text>
              <Text muted size={14} style={{ textAlign: 'center', marginTop: 0, marginBottom: 8, marginHorizontal: 4 }}>Access monographs for prescription and over-the-counter drugs, as well as for corresponding brand-name drugs, herbals, and supplements...</Text>
              <Block style={styles.divider} />
              <FlatList
                data={this.state.menuItem}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.ItemSeparatorView}
                renderItem={this.ItemView}
                style={{ marginTop: 50, height: '100%' }}
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
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                <Input
                  right
                  onChangeText={text => this.SearchFilterFunction(text)}
                  onClear={text => this.SearchFilterFunction('')}
                  placeholder="Type Here to Search"
                  value={this.state.search}
                  style={{
                    borderColor: argonTheme.COLORS.INFO,
                    borderRadius: 4,
                    backgroundColor: "#fff"
                  }}
                  iconContent={<Block />}
                />
              </Block>
              {this.state.displayResults &&
                <View style={{ top: 0, width: '100%', backgroundColor: '#E1F5FE', justifyContent: 'center', alignItems: 'center' }}>
                  <Text muted size={15} style={{ textAlign: 'center', marginBottom: 8, marginTop: 8, marginHorizontal: 20, color: '#0D47A1' }} onPress={() => navigation.navigate('GlobalSearchMedicine')}>Found what you are looking for? Tap here to switch to Smart Search for a more precise and in-depth search.</Text>
                </View>
              }
              <WebView
                originWhitelist={['*']}
                source={{ html: selectedCategory, baseUrl: '' }}
                style={{ marginTop: 90 }}
                allowFileAccess
                allowingReadAccessToURL={'file://'}
                allowUniversalAccessFromFileURLs
                allowFileAccessFromFileURLs
                mixedContentMode={'always'}
                scalesPageToFit={true}
                useWebKit
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
});

export default DiseaseConditionsBigScreen;
