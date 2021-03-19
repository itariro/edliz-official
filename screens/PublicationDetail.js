import React from "react";
import { ScrollView, StyleSheet, Dimensions, Linking } from "react-native";
// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme } from "../constants";
import { Button } from "../components";

const { width } = Dimensions.get("screen");

class PublicationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        detail: props.route.params.payload,
      }
    };
  }

  renderText = () => {
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: 100 }}>
          <Text
            h4
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
            style={{ textAlign: "left", marginTop: 30, marginBottom: 20 }}
          >
            {this.state.content.detail.title}
          </Text>
          <Block style={styles.divider} />
          <Text
            muted
            style={{ marginBottom: 15 }}
            color={argonTheme.COLORS.GRAY}
            style={{ textAlign: "left", marginTop: 20, marginBottom: 20 }}
          >
            {this.state.content.detail.description}
          </Text>
        </Block>
        <Block center>
          <Button color="default" style={styles.button} onPress={() => {
            Linking.openURL('https://www.padendere.co.zw/edlizadmin/' + this.state.content.detail.url).catch((err) => console.error('An error occurred', err));
          }} >
            Download Resource
            </Button>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30, width }}>
          {this.renderText()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  divider: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
});

export default PublicationDetail;