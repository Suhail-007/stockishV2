import { StyleSheet } from 'react-native';

export const cardStyles = StyleSheet.create({
  monthlyCard: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 16,
    flex: 1,
    position: 'relative'
  },

  cardIconCont: {
    position: 'absolute',
    top: 20,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.442)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    textTransform: 'capitalize',
    marginBottom: 8,
    opacity: 0.9
  },
  typographyCont: {
    width: '85%',
    justifyContent: 'space-between',
    padding: 8,
    position: 'relative'
  }
});
