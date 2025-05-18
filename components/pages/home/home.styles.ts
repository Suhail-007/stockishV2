import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

export const homeStyles = StyleSheet.create({
  pageTitleContStyle: {
    marginBottom: 0
  },

  headingCont: {
    paddingHorizontal: 24,
    paddingVertical: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },

  mainCont: {
    paddingTop: 0,
    paddingHorizontal: 10,
    gap: 10
  },

  monthlyStatsCont: {
    position: 'relative',
    top: -10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  recentOrdersHeadingRootCont: {
    marginBottom: 0,
    padding: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  recentOrdersHeadingCont: {
    flexDirection: 'row',
    gap: 10,

    alignItems: 'center'
  },

  recentOrdersTable: {
    borderRadius: 0,
    backgroundColor: '#fcfcfc',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },

  recentOrdersStatusCol: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20
  },

  noRecentOrdersFoundCont: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,

    marginTop: 10
  },

  ordersStatisticsCont: {
    gap: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },

  heroGradient: {
    padding: 24,
    paddingTop: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4
  },
  statsSection: {
    marginVertical: 20
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
    height: scale(100),
    overflow: 'hidden',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    justifyContent: 'space-between'
  },

  orderStatisticsContHeading: {
    textTransform: 'capitalize',
    marginBottom: 8,
    opacity: 0.9
  },

  orderStatisticsContSubHeading: {
    fontWeight: '700'
  },

  orderBgImage: {
    opacity: 0.45,
    width: 90,
    height: 60,
    position: 'absolute',
    right: -5,
    top: 15
  },

  totalBalanceCont: {
    height: scale(110),
    padding: 24,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5
  },

  totalBalanceBgImage: {
    opacity: 0.4,
    width: 60,
    height: 60,
    position: 'absolute',
    right: 10,
    top: 25
  },

  productStatisticsCont: {
    width: '48%',
    overflow: 'hidden'
  },

  typographyCont: {
    width: '85%',
    justifyContent: 'space-between',
    padding: 8
  }
});

export const homeSkeletonStyles = StyleSheet.create({
  heading: {
    gap: 4
  },

  monthlyStateAmount: {
    width: 20,
    height: 20
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
