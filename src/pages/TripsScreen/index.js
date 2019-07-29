import React, { Component } from 'react';
import {
  View, TouchableOpacity, FlatList, Image, AsyncStorage,
} from 'react-native';
import MapView from 'react-native-maps';

import Trip from './Trip';
import styles from './styles';

import addButton from '~/assets/images/add.png';

class TripsScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    trips: [],
  }

  componentDidMount() {
    this.loadData();
  }

  renderItem = ({ item }) => <Trip onPress={() => this.props.navigation.navigate('TripScreen', { id: item.id, refreshTrips: this.loadData })} title={item.trip} price={item.price} />;

  handleItemChange = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const [item] = viewableItems;
      const { item: { latitude } } = item;
      const { item: { longitude } } = item;
      this.map.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }, 2000);
    }
  };

  loadData = async () => {
    const tripsAS = await AsyncStorage.getItem('trips');
    let tripsObj = [];
    if (tripsAS) {
      tripsObj = JSON.parse(tripsAS);
    }
    this.setState({ trips: tripsObj });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapperMap}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            ref={(ref) => { this.map = ref; }}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddTripScreen', { refresh: this.loadData })}
            style={styles.addButton}
          >
            <Image source={addButton} />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={this.state.trips}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderItem}
            horizontal
            pagingEnabled
            onViewableItemsChanged={this.handleItemChange}
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 90,
            }}
            loadingEnabled
          />
        </View>
      </View>
    );
  }
}

export default TripsScreen;
