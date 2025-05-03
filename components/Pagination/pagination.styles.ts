import { StyleSheet } from 'react-native';

const paginationStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24
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
