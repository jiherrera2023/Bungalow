import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Constants from 'expo-constants';

import { useSelector } from 'react-redux';

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
  const liked = useSelector((state) => state.liked.liked);

  const styles = StyleSheet.create({
    list: {
      flex: 1,
      backgroundColor: '#C1DCE7',
      marginTop: Constants.statusBarHeight,
    },
  });

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={liked}
      renderItem={({ item }) => renderItem(item, navigation)}
      style={styles.list}
    />
  );
};

export default Liked;
