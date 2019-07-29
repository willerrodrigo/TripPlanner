import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  wrapperTrip: {
    backgroundColor: 'white',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
  },
  image: {
    backgroundColor: 'green',
    width: Dimensions.get('window').width - 32,
    height: 144,
    marginBottom: 6,
  },
  price: {
    position: 'absolute',
    top: 144 - 16,
    right: 32,
    textAlign: 'right',
    backgroundColor: '#24C6DC',
    padding: 4,
    color: 'white',
  },
});

export default styles;
