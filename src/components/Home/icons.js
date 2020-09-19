import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';

const Home = () => {
  const styles = StyleSheet.create({
    iconWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginTop: 60,
      marginRight: 10,
      marginLeft: 10,
    },
  });
  const [heart, heartStatus] = useState(true);
  return (
    <>
      <View style={styles.iconWrapper}>
        <AntDesign name={heart ? 'hearto' : 'heart'} size={32} color={heart ? 'pink' : 'pink'} onPress={() => heartStatus(!heart)} style={styles.icon} />
        <AntDesign name="message1" size={32} color="black" style={styles.icon} />
        <Entypo name="location-pin" size={32} color="blue" style={styles.icon} />
        <SimpleLineIcons name="options" size={32} color="black" style={styles.icon} />
      </View>
    </>
  );
};

export default Home;
