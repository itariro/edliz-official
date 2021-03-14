import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme } from "../constants";
import { Button, Select, Icon, Input } from "../components";

const { width } = Dimensions.get("screen");

class BMICalculator extends React.Component {
  state = {
    height: 0,
    mass: 0,
    resultNumber: 0,
    resultText: "",
  };

  handleCalculate = () => {
    let imc = (this.state.mass * 703) / this.state.height ** 2;
    this.setState({
      resultNumber: imc.toFixed(2),
    });

    if (imc < 18.5) {
      this.setState({ resultText: "Underweight" });
    } else if (imc > 18.5 && imc < 25) {
      this.setState({ resultText: "Normal Weight" });
    } else if (imc >= 25 && imc < 30) {
      this.setState({ resultText: "Overweight" });
    } else {
      this.setState({ resultText: "Obesity" });
    }
  };

  renderText = () => {
    return (
      <Block flex style={styles.group}>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text
            h1
            style={{ marginBottom: theme.SIZES.BASE / 2, textAlign: "center", marginTop: 120 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            {this.state.resultNumber}
          </Text>

          <Text
            p
            style={{ marginBottom: theme.SIZES.BASE / 2, textAlign: "center" }}
            color={argonTheme.COLORS.DEFAULT}
          >
            {this.state.resultText}
          </Text>
          <Text muted>BMI (body mass index) is a measure of whether you are a healthy weight for your height. Use this BMI calculator to check the adults in your family.</Text>
        </Block>
      </Block>
    );
  };

  renderInputs = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Height (metres)
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            right
            placeholder="Height in metres"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(height) => {
              this.setState({ height });
            }} iconContent={<Block />} />
        </Block>
        <Text bold size={16} style={styles.title}>
          Weight/mass (kg)
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            right
            placeholder="Weight/Mass in kgs"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(mass) => {
              this.setState({ mass });
            }}
            style={{
              borderColor: argonTheme.COLORS.INFO,
              borderRadius: 4,
              backgroundColor: "#fff"
            }}
            iconContent={<Block />}
          />
        </Block>
        <Block center>
          <Button bold size={16} color="default" style={styles.button} onPress={this.handleCalculate}>Calculate</Button>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30, width }}>
          {this.renderText()}
          {this.renderInputs()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: 4,
    paddingHorizontal: theme.SIZES.BASE * 1,
    marginTop: 44,
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
    width: width - theme.SIZES.BASE * 2,
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  input: {
    borderBottomWidth: 1
  },
  inputDefault: {
    borderBottomColor: argonTheme.COLORS.PLACEHOLDER
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputInfo: {
    borderBottomColor: argonTheme.COLORS.INFO
  },
  inputSuccess: {
    borderBottomColor: argonTheme.COLORS.SUCCESS
  },
  inputWarning: {
    borderBottomColor: argonTheme.COLORS.WARNING
  },
  inputDanger: {
    borderBottomColor: argonTheme.COLORS.ERROR
  },
});

export default BMICalculator;