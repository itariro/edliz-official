import React, { useState } from "react";
import { Image } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from '@use-expo/font';
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, articles, argonTheme } from "./constants";

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function checkForContentUpdates() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = e => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200) {
      var response = JSON.parse(request.responseText);
      db.transaction((tx) => {
        tx.executeSql("select * from content", [], (_, { rows }) => {
          console.log(rows.length);
          if (
            rows.length == 0 ||
            rows._array[0].version != response.version[0].db_version
          ) {
            // download and save latest database
            var contentRequest = new XMLHttpRequest();
            contentRequest.onreadystatechange = e => {
              if (contentRequest.readyState !== 4) {
                return;
              }

              if (contentRequest.status === 200) {
                console.log('success', 'got content');

              } else {
                console.warn('error');
              }
            };

            contentRequest.open('GET', "https://padendere.co.zw/edlizadmin/" + response.version[0].db_data_json);
            contentRequest.send();
          }
        });
      });

    } else {
      console.warn('error');
    }
  };
  return true;
}

export default props => {
  const [isLoadingComplete, setLoading] = useState(false);
  let [fontsLoaded] = useFonts({
    'ArgonExtra': require('./assets/font/argon.ttf'),
  });

  function _loadResourcesAsync() {
    return Promise.all([...cacheImages(assetImages), checkForContentUpdates()]);
  }

  function _handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  function _handleFinishLoading() {
    setLoading(true);
  };

  if (!fontsLoaded && !isLoadingComplete) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else if (fontsLoaded) {
    return (
      <NavigationContainer>
        <GalioProvider theme={argonTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    );
  } else {
    return null
  }
}

// export default class App extends React.Component {
//   state = {
//     isLoadingComplete: false
//   };

//   render() {
//     if (!this.state.isLoadingComplete) {
//       return (
//         <AppLoading
//           startAsync={this._loadResourcesAsync}
//           onError={this._handleLoadingError}
//           onFinish={this._handleFinishLoading}
//         />
//       );
//     } else {
//       return (
//         <NavigationContainer>
//           <GalioProvider theme={argonTheme}>
//             <Block flex>
//               <Screens />
//             </Block>
//           </GalioProvider>
//         </NavigationContainer>
//       );
//     }
//   }

//   _loadResourcesAsync = async () => {
//     return Promise.all([...cacheImages(assetImages)]);
//   };

//   _handleLoadingError = error => {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error);
//   };

//   _handleFinishLoading = () => {
//     this.setState({ isLoadingComplete: true });
//   };
// }
