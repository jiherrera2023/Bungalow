import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import { Image } from 'react-native-elements';
import Constants from 'expo-constants';
import Swiper from 'react-native-deck-swiper';

import Icons from './icons';

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

const Home = (props) => {
  const [cards, setCards] = React.useState([dummyTempSublet('a'), dummyTempSublet('a'), dummyTempSublet('a')]);
  const [swiper, setSwiper] = React.useState(undefined);

  const getFeedItemsAsync = () => {
    return Promise.resolve([dummyTempSublet('a'), dummyTempSublet('a'), dummyTempSublet('a')]);
  };

  const fetchNextCards = () => {
    getFeedItemsAsync().then((items) => {
      if (items !== null) {
        setCards(items);
        swiper.jumpToCardIndex(0); // this makes everything work
      }
    });
  };

  const onSwipedAllCards = () => {
    fetchNextCards();
  };

  React.useEffect(() => {
    // fetchNextCards();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: '#C1DCE7',
      marginTop: Constants.statusBarHeight,
    },
    card: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
      marginTop: 0,
      paddingTop: 0,
    },
    image: {
      borderRadius: 25,
      height: '100%',
      width: '100%',
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
                <Image
                  source={{ uri: sublet.mainImg.uri }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            );
          }}
          cardVerticalMargin={15}
          cardHorizontalMargin={15}
          marginBottom={29}
          onTapCard={(index) => props.navigation.navigate('Home', { screen: 'HomeDetail', params: cards[index] })}
          onSwiped={(cardIndex) => {}}
          onSwipedAll={onSwipedAllCards}
          backgroundColor="#C1DCE7"
          stackSize={2}
          swipeBackCard
          useViewOverflow={Platform.OS === 'ios'}
        />
        <View style={{ marginBottom: '20%' }}>
          <Icons />
        </View>
      </View>
    </>
  );
};

export default Home;
