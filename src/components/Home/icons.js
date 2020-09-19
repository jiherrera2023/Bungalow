import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';

const Home = () => {
  const styles = StyleSheet.create({
    iconWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginHorizontal: 10,
      padding: 15,
      borderRadius: 15,
      backgroundColor: 'whitesmoke',
    },
  });
  const [heart, heartStatus] = useState(true);
  return (
    <View style={styles.iconWrapper}>
      <AntDesign name={heart ? 'hearto' : 'heart'} size={32} color={heart ? 'pink' : 'pink'} onPress={() => heartStatus(!heart)} style={styles.icon} />
      <AntDesign name="message1" size={32} color="black" style={styles.icon} />
      <Entypo name="location-pin" size={32} color="blue" style={styles.icon} />
      <SimpleLineIcons name="options" size={32} color="black" style={styles.icon} />
    </View>
  );
};

export default Home;
