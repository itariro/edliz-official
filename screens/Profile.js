import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import Icon from "../components/Icon";

import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 2;
const thumbMeasureHeight = (width - 48 - 32) / 3;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true };
  }

  componentDidMount() {
    //console.log('checked local version => ' + this.state.db_version);
    // get current version
    // db.transaction((tx) => {
    //   tx.executeSql("SELECT * FROM content", [], (_, { rows }) => {
    //     console.log(rows.version);
    //     let currentLocalVersion = '';
    //     if (rows.length == 0 || rows._array[0].version == '') {
    //       console.log('no existing version found');
    //       currentLocalVersion = 'Not Available' + ' - Tap to update';
    //     } else {
    //       currentLocalVersion = rows._array[0].version + ' - Tap to update';
    //     }
    //     console.log('checked local version');
    //     let menuItem = [
    //       { 'id': 0, 'title': 'Version', 'description': currentLocalVersion, 'navigateTo': 'Pro' },
    //       { 'id': 1, 'title': 'Terms and Conditions', 'description': '', 'navigateTo': 'Suppliers' },
    //       { 'id': 2, 'title': 'Send us Feedback', 'description': '', 'navigateTo': 'Calculators' }
    //     ];
    //     this.state = { isLoading: true, search: '', menuItem: menuItem, };
    //   });
    // });
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block middle style={styles.avatarContainer}>
                <Image
                  source={Images.MoHCCCoatOfArms}
                  style={styles.avatar}
                />
              </Block>
              <Block middle style={styles.nameInfo}>
                <Text size={14} color="#FFFFFF" style={{ marginTop: 0 }}>
                  Ministry of Health and Child Care
                </Text>
                <Text bold size={28} color="#FFFFFF" style={{ textAlign: "center" }}>
                  Essential Medicines List and Standard Treatment Guidelines for Zimbabwe
                </Text>

              </Block>
              <Block flex style={styles.profileCard}>
                {/* <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.ProfilePicture }}
                    style={styles.avatar}
                  />
                </Block> */}
                <Block flex>
                  <Block middle>
                    <Text
                      size={15}
                      color="#525F7F"
                      style={{ textAlign: "center", marginTop: 20 }}
                    >
                      The authoritative point-of-care medical reference for healthcare professionals in Zimbabwe.
                    </Text>

                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block
                    row
                    space="between"
                  >
                  </Block>
                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block row space="between" style={{ flexWrap: "wrap" }}>

                      {Images.MainMenu.map((img, imgIndex) => (
                        <Block style={styles.thumb}>
                          <TouchableOpacity key={imgIndex} onPress={() => navigation.navigate(img.navigateTo)}>
                            <Image
                              key={imgIndex}
                              source={img.icon}
                              style={{ alignSelf: 'center', marginTop: 15, height: 42, width: 42 }}
                            />
                            <Text bold size={16} color="#525F7F" style={{ textAlign: 'center', marginTop: 8, marginBottom: 8 }}>{img.title}</Text>
                          </TouchableOpacity>
                        </Block>
                      ))}

                    </Block>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 0 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle style={styles.nameInfo}>
                    <Text size={16} color="#32325D" style={{ marginTop: 0, marginBottom: 0 }}>
                      Version 2020
                    </Text>
                    <Text
                      size={15}
                      color="#525F7F"
                      style={{ textAlign: "center", marginTop: 4 }}
                    >
                      (c) 2021. All rights reserved.
                    </Text>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
    backgroundColor: theme.COLORS.GREY,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 100,
    height: 150,
    marginTop: height / 11.5
  },
  nameInfo: {
    marginTop: 15
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasureHeight,
    backgroundColor: '#ede7f6'
  },
  menu_icon: {
    width: 50,
    height: 50,
    marginTop: height / 8
  },
});

export default Profile;
