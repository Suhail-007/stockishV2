import { StyleSheet } from 'react-native';

export const signInStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  mainHeading: {
    // fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  subHeading: {
    marginBottom: 10
  },
  successCont: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20
  },
  successText: {
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
  buttonLabel: {
    fontSize: 16
  }
});
