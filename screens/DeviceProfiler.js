import React from 'react';
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get('screen');

class DeviceProfiler extends React.Component {

  constructor(props) {
    super(props);
    if ((width >= 1000) && (height >= 1000)) {
      this.state = { bigScreen: true };
    } else {
      this.state = { bigScreen: false };
    }
  }

  _handleNavigation = (args) => {
    this.props.navigation.push("PublicationDetail", {
      payload: args,
    });
  }

  render() {
    return (
      <Block flex style={styles.home}>

      </Block>
    );
  }

}

export default DeviceProfiler;
