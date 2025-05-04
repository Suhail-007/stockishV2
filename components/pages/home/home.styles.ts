import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

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

  heroGradient: {
    padding: 20,
    paddingTop: 0,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  statsSection: {
    marginVertical: 16
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16
  },

  orderStatisticsCont: {
    width: '48%',
    height: scale(80), // Increased height
    overflow: 'hidden',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    transform: [{ scale: 1 }] // For animation
  },

  orderStatisticsContHeading: {
    fontSize: scale(14),
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    marginBottom: 8,
    opacity: 0.8
  },

  orderStatisticsContSubHeading: {
    fontSize: scale(24),
    letterSpacing: 0.5,
    fontWeight: '600'
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
    height: scale(90),
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row'
  },

  totalBalanceBgImage: {
    opacity: 0.55,
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    top: 26,
    bottom: 10
  },

  productStatisticsCont: {
    width: '48%',
    overflow: 'hidden'
  },

  typographyCont: { width: '83%', justifyContent: 'space-between', padding: 7 }
});

export const homeSkeletonStyles = StyleSheet.create({
  heading: {
    gap: 4
  },

  skeletonBoxHeading: {
    height: moderateScale(30)
  },

  skeletonBox: {
    height: scale(70),
    width: '100%'
  },

  ordersStatisticsCont: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  orderStatisticsCont: {
    borderRadius: 6,
    width: '48%',
    height: scale(70)
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
