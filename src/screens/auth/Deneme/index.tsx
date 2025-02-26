import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SearchBarComponent from '@components/SearchBarModal/search.bar.modal';
import ShoppingCartComponent from '@icomponents/ShoppingCart';
import SearchBarModalComponent from '@components/SearchBarModal/search.bar.modal';

const DenemeScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBarModalComponent title="Araştır" handleSearch={() => {}} />
    </View>
  );
};

export default DenemeScreen;

const styles = StyleSheet.create({
  container: {
    top: 200,
    flex: 1,
    backgroundColor: 'red',
  },
});
