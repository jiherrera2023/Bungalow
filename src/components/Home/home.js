import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
} from 'react-native';
import { Image } from 'react-native-elements';
import Constants from 'expo-constants';
import Swiper from 'react-native-deck-swiper';

import { useSelector, useDispatch } from 'react-redux';
import { callForNextBatch, setHeart } from './homeSlice';

import { postSeenSublet } from '../../api/api';

import Icons from './icons';

const Home = (props) => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.home.sublets);
  const jwt = useSelector((state) => state.global.jwt);
  const email = useSelector((state) => state.global.loginResult.user.email);
  const [swiper, setSwiper] = React.useState(undefined);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const fetchNextCards = async () => {
    await dispatch(callForNextBatch());
    swiper.jumpToCardIndex(0); // this makes everything work
  };

  const onSwipedThirdToLastCard = () => {
    fetchNextCards();
  };

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
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      borderRadius: 25,
      height: '100%',
      width: '100%',
    },
    text: {
      color: 'whitesmoke',
      fontSize: 20,
      fontWeight: 'bold',
      padding: 20,
    },
    textWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });

  return (
    <>
      <View style={styles.container}>
        {
          cards.length === 0
            ? <></>
            : (
              <>
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
                          source={{ uri: sublet.images[0] }}
                          style={styles.image}
                          resizeMode="cover"
                          transition={false}
                        >
                          <View />
                          <View style={styles.textWrapper}>
                            <Text style={styles.text}>{sublet.title}</Text>
                            <Text style={styles.text}>${sublet.price} mo.</Text>
                          </View>
                        </Image>
                      </View>
                    );
                  }}
                  cardVerticalMargin={15}
                  cardHorizontalMargin={15}
                  marginBottom={29}
                  onTapCard={(index) => props.navigation.navigate('Home', { screen: 'HomeDetail', params: cards[index] })}
                  onSwiped={(cardIndex) => {
                    if ((cardIndex + 1) % (cards.length - 2) === 0) {
                      onSwipedThirdToLastCard();
                      setCurrentIndex(0);
                    } else {
                      setCurrentIndex(cardIndex + 1);
                    }
                    postSeenSublet(cards[currentIndex].id, email, jwt);
                    dispatch(setHeart({ isEmpty: true, sublet: cards[currentIndex + 1] }));
                  }}
                  backgroundColor="#C1DCE7"
                  stackSize={2}
                  swipeBackCard
                  useViewOverflow={Platform.OS === 'ios'}
                />
                <View style={{ marginBottom: '20%' }}>
                  <Icons sublet={cards[currentIndex]} />
                </View>
              </>
            )
        }
      </View>
    </>
  );
};

export default Home;
