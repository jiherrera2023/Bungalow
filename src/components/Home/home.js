import React, { useState } from 'react';
import {
  StyleSheet, View, Image, useWindowDimensions,
} from 'react-native';
import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const Home = () => {
  const sideLength = useWindowDimensions().width * 0.9;
  const heightLength = useWindowDimensions().height * 0.3;
  const notificationHeight = Constants.statusBarHeight;
  const newMarginTop = notificationHeight + useWindowDimensions().height * 0.29;
  const styles = StyleSheet.create({
    homeImage: {
      height: heightLength,
      width: sideLength,
      alignSelf: 'center',
      marginTop: newMarginTop,
    },
    display: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
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
      <View style={styles.display}>
        <View style={styles.wrapper}>
          <Image
            style={styles.homeImage}
            source={{ uri: 'https://charlotteagenda-charlotteagenda.netdna-ssl.com/wp-content/uploads/2019/10/open-houses-october.jpg' }}
          />
          <View style={styles.iconWrapper}>
            <AntDesign name={heart ? 'hearto' : 'heart'} size={32} color={heart ? 'pink' : 'pink'} onPress={() => heartStatus(!heart)} style={styles.icon} />
            <AntDesign name="message1" size={32} color="black" style={styles.icon} />
            <Entypo name="location-pin" size={32} color="blue" style={styles.icon} />
            <SimpleLineIcons name="options" size={32} color="black" style={styles.icon} />
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;
