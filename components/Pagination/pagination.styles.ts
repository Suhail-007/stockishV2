import { StyleSheet } from 'react-native';

const paginationStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  contentContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    alignItems: 'center',
    columnGap: 24,
    paddingRight: 15
  },
  rowsPerPage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5
  },
  rowsPerPageText: {
    fontSize: 12
  },
  label: {
    fontSize: 12
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuContent: { borderRadius: 8, paddingVertical: 0 }
});

export default paginationStyles;
