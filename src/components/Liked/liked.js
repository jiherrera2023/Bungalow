import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Constants from 'expo-constants';
import { SwipeListView } from 'react-native-swipe-list-view';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromLiked } from './likedSlice';
import { setHeart } from '../Home/homeSlice';
import { removeLikedSublet } from '../../api/api';

const keyExtractor = (item, index) => index.toString();

const renderItem = (item, navigation) => {
  return (
    <ListItem
      containerStyle={{ backgroundColor: 'whitesmoke' }}
      bottomDivider
      onPress={() => {
        navigation.navigate('Liked', { screen: 'LikedDetail', params: item });
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

const Liked = ({ navigation }) => {
  const dispatch = useDispatch();
  const liked = useSelector((state) => state.liked.liked);
  const jwt = useSelector((state) => state.global.jwt);

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
  });

  let emptyLikedComponent = <View style={styles.emptyText} />;
  if (liked.length === 0) {
    emptyLikedComponent = <Text style={styles.emptyText}>Looks like you dont have any liked sublets. Add some from your home page!</Text>;
  }

  const closeRow = (rowMap, index) => {
    if (rowMap[index]) {
      rowMap[index].closeRow();
    }
  };

  const currentHomeSublet = useSelector((state) => state.home.currentSublet);

  const deleteSublet = (rowMap, index) => {
    closeRow(rowMap, index);
    removeLikedSublet(liked[index].id, jwt);
    dispatch(removeFromLiked(liked[index]));

    if (JSON.stringify(liked[index]) === JSON.stringify(currentHomeSublet)) {
      dispatch(setHeart(true));
    }
  };

  return (
    <>
      {emptyLikedComponent}
      <SwipeListView
        keyExtractor={keyExtractor}
        data={liked}
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
    </>
  );
};

export default Liked;
