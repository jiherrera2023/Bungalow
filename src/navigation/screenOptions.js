import { TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';

export default {
  headerShown: false,
  gestureEnabled: 'false',
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.FadeOutToBottomAndroidSpec,
    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
