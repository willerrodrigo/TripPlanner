import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 192,
    backgroundColor: 'grey',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  tripName: {
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  tripPrice: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    textAlign: 'right',
    backgroundColor: '#24C6DC',
    padding: 4,
    color: 'white',
  },
  flatList: { flex: 1 },
  flatListContentContainer: {
    paddingTop: 16,
    paddingLeft: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 10,
    padding: 10,
  },


  item: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 16,
  },
  wrapperInfo: { flex: 1 },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  wrapperItemPrice: {
    justifyContent: 'center',
    paddingRight: 16,
  },
  itemPrice: {
    color: '#24C6DC',
    fontWeight: 'bold',
  },
});

export default styles;
