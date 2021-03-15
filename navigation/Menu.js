import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem } from '../components';

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const insets = useSafeArea();
  const screens = [
    "Home",
    "Profile",
    "Account",
    "Elements",
    "Articles",
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Text>EDLIZ clinical reference is the most authoritative and accessible point-of-care medical reference for healthcare professionals, available via all major mobile devices. All content is free. The clinical information represents the expertise and practical knowledge of top physicians and pharmacists from leading academic medical centers in Zimbabwe. </Text>
          <Text style={{ textAlign: 'left', marginBottom: 8, marginTop: 8, marginHorizontal: 2, color: '#0D47A1' }}>Further copies may be obtained through the relevant Provincial Medical Directorate, City Health Directorate, the NMTPAC, Ministry of Health & Child Care (MoHCC), PO Box CY 1122, Causeway, Harare, Zimbabwe, or the MoHCC website www.mohcc.gov.zw. Copies of the text may be obtained on soft copy if required for teaching purposes from email address: dps@mohcc.gov.zw or nmtpac@gmail.com EDLIZ was prepared using Microsoft® Word.</Text>
          <Text style={{ textAlign: 'left', marginBottom: 8, marginTop: 8, marginHorizontal: 2, color: '#0D47A1' }}>The information presented in these guidelines conforms to current medical, nursing and pharmaceutical practice. It is provided in good faith. Whilst every effort was made to ensure that medicine doses are correct, no responsibility can be taken for errors and omissions.</Text>

          <Text style={{ textAlign: 'left', marginBottom: 8, marginTop: 8, marginHorizontal: 2, color: '#0D47A1' }}>No part of this publication may be reproduced by any process without the written permission of the copyright holder, exception being made for the purpose of private study, research, criticism or review, or for teaching, but not for sale or other commercial use.</Text>
          <Text style={{ textAlign: 'left', marginBottom: 8, marginTop: 8, marginHorizontal: 2, color: '#0D47A1' }}>© Copyright 2021, Ministry of Health & Child Care</Text>

          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
            <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }} />
          </Block>
          <DrawerCustomItem title="Powered by Clobrook" navigation={navigation} />
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center'
  }
});

export default CustomDrawerContent;
