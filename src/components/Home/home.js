import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import Swiper from 'react-native-deck-swiper';
import { useSelector, useDispatch } from 'react-redux';
import { callForNextBatch } from './homeSlice';

import Card from './card';

const dummyTempSublet = (owner) => ({
  address: '12345 First St. New York, NY 11111',
  price: '1000',
  description: "  Come check out this shitty excuse for an aparment we have. You are certainly going to get ripped off, but at least you can have fun while doing it. We don't give a shit about you are your dog.", // eslint-disable-line
  email: 'filler@gmail.com',
  owner,
  phone: '123-456-7890',
  mainImg: { uri: 'https://im-media.voltron.voanews.com/Drupal/01live-166/styles/sourced/s3/2019-11/IMG_5577.JPG?itok=Vl0aR9EE' },
  otherImgs: [
    { uri: 'https://www.coldwellbanker.com/images_brand/CB/72508062.jpg' },
    { uri: 'https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg' },
    { uri: 'https://charlotteagenda-charlotteagenda.netdna-ssl.com/wp-content/uploads/2019/10/open-houses-october.jpg' },
  ],
});

const Home = () => {
  const [cards, setCards] = React.useState([undefined]);
  const [swiper, setSwiper] = React.useState([undefined]);

  const fetchNextCards = () => {
    getFeedItemsAsync().then((items) => {
      if (items !== null) {
        this.setState({
          cards: items,
        });
        this.swiper.jumpToCardIndex(0); // this makes everything work
      }
    });
  };

  const onSwipedAllCards = () => {
    fetchNextCards();
  };

  React.useEffect(() => {
    fetchNextCards();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    card: {
      flex: 1,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#E8E8E8',
      justifyContent: 'center',
      backgroundColor: 'whitesmoke',
    },
    text: {
      textAlign: 'center',
      fontSize: 50,
      backgroundColor: 'transparent',
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Swiper
          ref={(s) => {
            setSwiper(s);
          }}
          cards={cards}
          renderCard={(sublet) => {
            if (!sublet) { return <></>; }
            return (
              <View style={styles.card}>
                <Card mainImg={sublet.mainImg} owner={sublet.owner} />
              </View>
            );
          }}
          onSwiped={(cardIndex) => {
            setCards([...cards, dummyTempSublet('h')]);
          }}
          backgroundColor="#C1DCE7"
          stackSize={2}
          useViewOverflow={Platform.OS === 'ios'}
        />
      </View>
    </>
  );
};

export default Home;
