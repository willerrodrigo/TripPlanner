import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*     alignItems: 'stretch',
      justifyContent: 'space-between', */
  },

  background: {
    resizeMode: 'stretch',
  },

  logo: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 94,
  },

  button: {
    backgroundColor: 'white',
    paddingBottom: 8,
    paddingTop: 8,
    alignItems: 'center',
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    width: 210,
    paddingBottom: 8,
    paddingTop: 8,
  },
});

export default styles;
