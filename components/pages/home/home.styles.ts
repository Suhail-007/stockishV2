import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Fonts } from '../../../constants/fonts';

export const homeStyles = StyleSheet.create({
  pageTitleContStyle: {
    marginBottom: 0
  },

  monthlyOrdersCont: {
    marginTop: 20
  },

  ordersStatisticsCont: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  orderStatisticsCont: {
    width: '48%',
    height: scale(70),
    overflow: 'hidden'
  },

  orderStatisticsContHeading: {
    fontSize: scale(13.5),
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontFamily: Fonts.quicksandBold,
    wordWrap: 'break-word'
  },

  orderStatisticsContSubHeading: {
    fontSize: scale(21),
    letterSpacing: 1.2,
    fontFamily: Fonts.quicksandSemiBold
  },

  orderBgImage: {
    opacity: 0.55,
    width: 80,
    height: 50,
    position: 'absolute',
    right: 0,
    top: 10,
    bottom: 10
  },

  totalBalanceCont: {
    height: scale(70),
    overflow: 'hidden',
    flexDirection: 'row'
  },

  totalBalanceBgImage: {
    opacity: 0.55,
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    top: 10,
    bottom: 10
  },

  productStatisticsCont: {
    width: '48%',
    overflow: 'hidden'
  }
});

export const homeSkeletonStyles = StyleSheet.create({
  heading: {
    gap: 4
  },

  ordersStatisticsCont: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  orderStatisticsCont: {
    borderRadius: 6,
    width: '48%',
    height: scale(70),
    overflow: 'hidden'
  },

  usersCont: {
    gap: 10
  },

  sectionCont: {
    marginTop: 30
  },

  usersStatisticsCont: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  userStatisticsCont: {
    borderRadius: 6,
    width: '48%',
    height: scale(70),
    overflow: 'hidden'
  }
});
