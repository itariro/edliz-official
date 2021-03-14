import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block, theme } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";

import DiseaseConditions from "../screens/DiseaseConditions";
import DiseaseConditionDetail from "../screens/DiseaseConditionDetail";
import Medicines from "../screens/Medicines";
import MedicineCategories from "../screens/MedicineCategories";
import MedicineDetail from "../screens/MedicineDetail";

import Resources from "../screens/Resources";
import GuidesCalculators from "../screens/GuidesCalculators";
import BMICalculator from "../screens/BMICalculator";
import Suppliers from "../screens/Suppliers";
import Publications from "../screens/Publications";

import Settings from "../screens/Settings";

// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";

//const { width } = Dimensions.get("screen");
const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} white style={{
              backgroundColor: '#5E72E4', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
              zIndex: 5
            }} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Medicines"
        component={Medicines}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Medicines" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="DiseaseConditions"
        component={DiseaseConditions}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="DiseaseConditions" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="DiseaseConditionDetail"
        component={DiseaseConditionDetail}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="DiseaseConditionDetail" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="MedicineCategories"
        component={MedicineCategories}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="MedicineCategories" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="MedicineDetail"
        component={MedicineDetail}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="MedicineDetail" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Resources"
        component={Resources}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Resources" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="GuidesCalculators"
        component={GuidesCalculators}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Guides and Calculators" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Publications"
        component={Publications}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Publications" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Suppliers"
        component={Suppliers}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Suppliers" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="BMICalculator"
        component={BMICalculator}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="BMICalculator" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="DiseaseConditionDetail"
        component={DiseaseConditionDetail}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="DiseaseConditionDetail" navigation={navigation} scene={scene} back white style={{
              backgroundColor: '#1E1C24', paddingVertical: 0,
              paddingBottom: theme.SIZES.BASE * 1.5,
              paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE
            }} />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Profile"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Account" component={Register} />
      <Drawer.Screen name="Elements" component={ElementsStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
    </Drawer.Navigator>
  );
}

