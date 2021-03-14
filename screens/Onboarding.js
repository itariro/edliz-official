import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import * as SQLite from "expo-sqlite";

const { height, width } = Dimensions.get("screen");
const db = SQLite.openDatabase("db.db");

const dbStamp = (db_version, db_content) => {
  if (db_version === null || db_version === "") {
    return false;
  }

  db.transaction((tx) => {
    tx.executeSql("INSERT INTO tbl_content (version, content) values (?, ?)", [
      db_version,
      db_content,
    ]);
    tx.executeSql("SELECT * FROM tbl_content", [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
  });
};

const save = (db_table, db_content) => {
  if (db_table === null || db_table === "") {
    return false;
  }

  db.transaction((tx) => {
    tx.executeSql("insert into " + db_table + " (content) values (?)", [
      db_content
    ]);
    tx.executeSql("select * from " + db_table, [], (_, { rows }) =>
      console.log("saved  - " + db_table)
    );
  });
};

const saveAsColumns = (db_table, db_content) => {
  if (db_table === null || db_table === "") {
    return false;
  }

  const content = JSON.parse(db_content);
  const subConditions = content.tbl_sub_condition;
  console.log("subconds before save => " + subConditions.length);

  for (let i = 0; i < subConditions.length; i++) {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO ' + db_table + ' (condition_id, title, content) values (?, ?, ?)', [parseInt(subConditions[i].condition_id), subConditions[i].title, subConditions[i].content],
        (txObj, resultSet) => { },
        (txObj, error) => console.log('Error', error))
    })
  }

  db.transaction((tx) => {
    tx.executeSql(
      "select * from " + db_table,
      [],
      (_, { rows }) => {
        if (rows.length > 0) {
          console.log("subconds after save => " + rows.length);
        } else {
          console.log("subconds after save => " + rows.length);
        }
      }
    );
  });

};

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db_version: "",
      latest_db_version: '',
      latest_db_version_url: '',
      update_progress: 'Preparing data...',
      checkedForUpdate: false
    };
    console.log('props...');
  }

  _checkForUpdates = (currentLocalVersion) => {
    console.log('checking...');
    this.state = { update_progress: 'Checking for updates' };
    // check for updates
    fetch('https://padendere.co.zw/edlizadmin/api/v1/index.php?version')
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.version[0].db_version);
        const latestVersion = responseJson.version[0].db_version;
        const latestVersionURL = responseJson.version[0].db_data_json;
        if (latestVersion != '' && (currentLocalVersion != latestVersion)) {
          console.log('get the latest then');
          this.state = { update_progress: 'Fetching updates...' };
          // get the actual latest content
          fetch("https://padendere.co.zw/edlizadmin/" + latestVersionURL)
            .then(response => response.json())
            .then(responseContentJson => {
              console.log('got it all, now lets save to local DB');
              this.state = { update_progress: 'Updating your files...' };
              var responseData = responseContentJson;

              // purge all data in the tables
              db.transaction((tx) => {
                tx.executeSql("DELETE FROM tbl_drug_category;");
                tx.executeSql("DELETE FROM tbl_condition;");
                tx.executeSql("DELETE FROM tbl_drug;");
                tx.executeSql("DELETE FROM tbl_drug_formulation;");
                tx.executeSql("DELETE FROM tbl_drug_interaction;");
                tx.executeSql("DELETE FROM tbl_institution;");
                tx.executeSql("DELETE FROM tbl_publication;");
                tx.executeSql("DELETE FROM tbl_sub_condition;");
                tx.executeSql("DELETE FROM tbl_sub_condition_rows;");
                tx.executeSql("DELETE FROM tbl_supplier;");
                tx.executeSql("DELETE FROM tbl_content;");
              });
              this.state = { update_progress: '10%' };

              // lets update the tables
              save(
                "tbl_condition",
                JSON.stringify(responseData.data[2])
              );
              this.state = { update_progress: '20%' };

              save(
                "tbl_drug",
                JSON.stringify(responseData.data[3])
              );
              this.state = { update_progress: '30%' };

              save(
                "tbl_drug_category",
                JSON.stringify(responseData.data[4])
              );
              this.state = { update_progress: '40%' };

              save(
                "tbl_drug_formulation",
                JSON.stringify(responseData.data[5])
              );
              this.state = { update_progress: '50%' };

              save(
                "tbl_drug_interaction",
                JSON.stringify(responseData.data[6])
              );
              this.state = { update_progress: '60%' };

              save(
                "tbl_institution",
                JSON.stringify(responseData.data[7])
              );
              this.state = { update_progress: '70%' };

              save(
                "tbl_publication",
                JSON.stringify(responseData.data[8])
              );
              this.state = { update_progress: '80%' };

              saveAsColumns(
                "tbl_sub_condition_rows",
                JSON.stringify(responseData.data[11])
              );
              this.state = { update_progress: '90%' };

              save(
                "tbl_supplier",
                JSON.stringify(responseData.data[12])
              );

              dbStamp(latestVersion, '');
              this.state = { db_version: latestVersion }

              this.state = { update_progress: '100%' };
              this.state = { update_progress: 'All done...' };

              const { navigation } = this.props;
              navigation.navigate("App")

            })
            .catch(error => {
              console.error(error);
            });
        } else {
          // give user two options, to try again or cancel
          if (currentLocalVersion = '') {
            // you have no option but to try again
            this.setState({ showTheThing: true })
          } else {
            // just abort, let's use the local version
            const { navigation } = this.props;
            navigation.navigate("App");
          }
        }
        this.state = {
          latest_db_version: responseJson.version[0].db_version,
          latest_db_version_url: responseJson.version[0].db_data_json,
          update_progress: 0,
          checkedForUpdate: true
        };
      })
      .catch(error => {
        console.error(error);
        this.state = {
          latest_db_version: '',
          latest_db_version_url: '',
          update_progress: 0,
          checkedForUpdate: true
        };
        console.log('abort and load local or try again?');
      });
    return false;
  }

  _checkLocalVersion = () => {
    this.setState({ showTheThing: false })

    // create tables in the database
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_content (id INTEGER PRIMARY KEY AUTOINCREMENT, version VARCHAR(64), content TEXT);');
      tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_drug_category (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);");
      tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_condition (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);");
      tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_drug (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);");
      tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_drug_formulation (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);");
      tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_drug_interaction (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);");
      tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_institution (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);");
      tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_publication (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);");
      tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_sub_condition (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);");
      tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_sub_condition_rows (id INTEGER PRIMARY KEY AUTOINCREMENT, condition_id INT, title VARCHAR(200), content TEXT);");
      tx.executeSql("CREATE TABLE IF NOT EXISTS tbl_supplier (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);");

      // get current version
      tx.executeSql("SELECT * FROM tbl_content", [], (_, { rows }) => {
        console.log(rows.version);
        if (rows.length == 0 || rows._array[0].version == '') {
          console.log('no existing version found');
          this.state = {
            db_version: "",
            update_progress: 'Preparing data...'
          };
          // we are done now, let's take the user to the next stage
        } else {
          this.state = {
            db_version: rows._array[0].version,
            update_progress: 'Preparing data...'
          };
        }
        console.log('checked local version => ' + this.state.db_version);
        this._checkForUpdates(this.state.db_version);
      });
    });
  }

  componentDidMount() {
    console.log('did mount');
    this._checkLocalVersion();
  }

  render() {
    console.log('render');
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block style={styles.title}>
              <Block>
                <Text bold size={32} color="#FFFFFF">
                  {this.state.update_progress}
                </Text>
              </Block>
              <Block style={styles.subTitle}>
                <Text color="white" size={15}>
                  We constantly check for updates on the EDLIZ server to keep the content you access up-to-date. The process takes place in the background and may take a few minutes to complete Just tap Get Started to proceed.
                  </Text>
              </Block>
            </Block>
            <Block center>
              {this.state.showTheThing &&
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={() => this._checkLocalVersion()}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                >
                  Try Again
                </Button>
              }
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop: '-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;
