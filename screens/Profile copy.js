import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity, View, Linking
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Images } from "../constants";
import { HeaderHeight } from "../constants/utils";


const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 2;
const thumbMeasureHeight = (width - 48 - 32) / 2.5;

const thumbMeasureBigScreens = (width - 48 - 32) / 5;
const thumbMeasureBigScreensHeight = (width - 48 - 32) / 6;


class Profile extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    if ((width >= 1000) && (height >= 1000)) {
      this.state = { bigScreen: true };
    } else {
      this.state = { bigScreen: false };
    }
  }

  componentDidMount() {
    //console.log('w => ' + width);
    //console.log('h => ' + height);
  }

  _handleNavigation = (item, args) => {
    if (item.type == 'url') {
      Linking.openURL(item.navigateTo).catch((err) => console.error('An error occurred', err));
    } else {
      this.props.navigation.push(item.navigateTo, {
        args: args,
      });
    }
  }

  render() {
    //console.log('big screen? => ' + this.state.bigScreen);
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
                <Text bold size={27} color="#FFFFFF" style={{ textAlign: "center", marginHorizontal: 8 }}>
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

                    {/* for phones */}
                    {this.state.bigScreen &&
                      <View>
                        <Block row space="between" style={{ flexWrap: "wrap" }}>
                          {Images.MainMenuBigScreens.map((img, imgIndex) => (
                            <Block key={`viewed-${img}`} style={styles.thumbBigScreens}>
                              <TouchableOpacity key={img.id} onPress={() => this._handleNavigation(img, '')}>
                                <Image
                                  key={img.id}
                                  source={img.icon}
                                  style={{ alignSelf: 'center', marginTop: 30, height: 64, width: 64 }}
                                />
                                <Text bold size={18} color="#525F7F" style={{ textAlign: 'center', marginTop: 8, marginBottom: 8, marginHorizontal: 8 }}>{img.title}</Text>
                              </TouchableOpacity>
                            </Block>
                          ))}
                        </Block>
                      </View>
                    }

                    {/* for tablets */}
                    {!this.state.bigScreen &&
                      <View>
                        <Block row space="between" style={{ flexWrap: "wrap" }}>
                          {Images.MainMenu.map((img, imgIndex) => (
                            <Block key={`viewed-${img}`} style={styles.thumb}>
                              <TouchableOpacity key={img.id} onPress={() => this._handleNavigation(img, '')}>
                                <Image
                                  key={img.id}
                                  source={img.icon}
                                  style={{ alignSelf: 'center', marginTop: 20, height: 42, width: 42 }}
                                />
                                <Text bold size={18} color="#525F7F" style={{ textAlign: 'center', marginTop: 8, marginBottom: 8, marginHorizontal: 4 }}>{img.title}</Text>
                              </TouchableOpacity>
                            </Block>
                          ))}
                        </Block>
                      </View>
                    }

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
    top: 0
  },
  profileBackground: {
    width: width,
    height: height / 1.5
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
    width: 97,
    height: 140,
    marginTop: height / 7
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
  thumbBigScreens: {
    borderRadius: 4,
    marginVertical: 8,
    alignSelf: "center",
    width: thumbMeasureBigScreens,
    height: thumbMeasureBigScreensHeight,
    backgroundColor: '#ede7f6'
  },
  menu_icon: {
    width: 50,
    height: 50,
    marginTop: height / 8
  },
});

export default Profile;
