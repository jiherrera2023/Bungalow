import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Constants from 'expo-constants';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AntDesign } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromAdded } from './addedSlice';
import { removePostedSublet } from '../../api/api';

const keyExtractor = (item, index) => index.toString();

const renderItem = (item, navigation) => {
  return (
    <ListItem
      containerStyle={{ backgroundColor: 'whitesmoke' }}
      bottomDivider
      onPress={() => {
        navigation.navigate('Added', { screen: 'AddedDetail', params: item });
      }}
    >
      <Avatar title={item.address} source={item.images[0] && { uri: item.images[0] }} />
      <ListItem.Content>
        <ListItem.Title>{item.address}</ListItem.Title>
        <ListItem.Subtitle>${item.price} mo.</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

const Added = ({ navigation }) => {
  const dispatch = useDispatch();
  const added = useSelector((state) => state.added.added);
  const jwt = useSelector((state) => state.global.jwt);
  const email = useSelector((state) => state.global.loginResult.user.email);

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
    text: {
      color: 'whitesmoke',
      fontSize: 16,
      padding: 15,
      fontWeight: 'bold',
    },
    emptyText: {
      color: '#333',
      fontSize: 16,
      padding: 0,
      fontWeight: 'bold',
      backgroundColor: '#C1DCE7',
      marginTop: Constants.statusBarHeight,
      textAlign: 'center',
    },
    icon: {
      position: 'absolute',
      bottom: 25,
      right: 25,
      backgroundColor: '#C1DCE7',
    },
  });

  let emptyAddedComponent = <View style={styles.emptyText} />;
  if (added.length === 0) {
    emptyAddedComponent = <Text style={styles.emptyText}>Looks like you dont have any posted sublets.</Text>;
  }

  const closeRow = (rowMap, index) => {
    if (rowMap[index]) {
      rowMap[index].closeRow();
    }
  };

  const deleteSublet = (rowMap, index) => {
    closeRow(rowMap, index);
    removePostedSublet(added[index].id, email, jwt);
    dispatch(removeFromAdded(added[index]));
  };

  return (
    <>
      {emptyAddedComponent}
      <SwipeListView
        keyExtractor={keyExtractor}
        data={added}
        renderItem={({ item }) => renderItem(item, navigation)}
        style={styles.list}
        renderHiddenItem={
          (data, rowMap) => (
            <View style={styles.rowBack}>
              <Text style={styles.text} onPress={() => deleteSublet(rowMap, data.index)}> Delete </Text>
            </View>
          )
        }
        rightOpenValue={-100}
        disableRightSwipe
      />
      <AntDesign
        style={styles.icon}
        name="pluscircle"
        size={60}
        color="#58AADA"
        onPress={() => {
          navigation.navigate('Added', { screen: 'AddedPost' });
        }}
      />
    </>
  );
};

export default Added;
