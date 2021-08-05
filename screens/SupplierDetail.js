import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components";

const { width } = Dimensions.get("screen");

class SupplierDetail extends React.Component {
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
            bold size={27}
            h4
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
            style={{ textAlign: "left", marginTop: 30, marginBottom: 20 }}
          >
            {this.state.content.detail.name}
          </Text>
          <Block style={styles.divider} />
          <Text bold size={16} style={styles.title}>Registration Number</Text>
          <Text
            p
            size={15}
            style={{ marginBottom: 16 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            {this.state.content.detail.reg_number}
          </Text>

          <Text bold size={16} style={styles.title}>VAT Number</Text>
          <Text
            p
            size={15}
            style={{ marginBottom: 16 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            {this.state.content.detail.vat_number}
          </Text>

          <Text bold size={16} style={styles.title}>Address</Text>
          <Text
            p
            size={15}
            style={{ marginBottom: 16 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            {this.state.content.detail.address}
          </Text>

          <Text bold size={16} style={styles.title}>Contact Number</Text>
          <Text
            p
            size={15}
            style={{ marginBottom: 16 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            {this.state.content.detail.contact_number}
          </Text>
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
  divider: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    marginBottom:30
  },
});

export default SupplierDetail;