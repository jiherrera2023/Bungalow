import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AntDesign } from '@expo/vector-icons';

import { useSelector } from 'react-redux';

const Added = ({ navigation }) => {
  const added = useSelector((state) => state.added.added);

  const styles = StyleSheet.create({
    list: {
      flex: 1,
      backgroundColor: '#C1DCE7',
    },
    rowBack: {
      backgroundColor: 'crimson',
      alignItems: 'flex-end',
      justifyContent: 'center',
      height: '100%',
    },
  });

  let emptyAddedComponent = <View style={styles.emptyText} />;
  if (added.length === 0) {
    emptyAddedComponent = <Text style={styles.emptyText}>Looks like you dont have any posted sublets.</Text>;
  }

  return (
    <>
      {emptyAddedComponent}
      <SwipeListView />
      <AntDesign />
    </>
  );
};

export default Added;
