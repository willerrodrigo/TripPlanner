import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image, AsyncStorage,
} from 'react-native';

import arrowLeft from '~/assets/images/arrow-left-white.png';
import styles from './styles';
import addButton from '~/assets/images/add.png';

const TripScreen = (props) => {
  const [trip, setTrip] = useState([]);
  const [points, setPoints] = useState([]);

  const loadData = async () => {
    const tripsAS = await AsyncStorage.getItem('trips');
    let trips = [];
    if (tripsAS) {
      trips = JSON.parse(tripsAS);
    }
    const tripObj = {
      trip: '',
      price: 0,
    };
    trips.forEach((t) => {
      if (t.id === props.navigation.state.params.id) {
        tripObj.trip = t.trip;
        tripObj.price = t.price ? t.price : 0;
      }
    });

    const pointAS = await AsyncStorage.getItem(`trip-${props.navigation.state.params.id}`);
    let pointsObj = [];
    if (pointAS) {
      pointsObj = JSON.parse(pointAS);
    }

    setTrip(tripObj);
    setPoints(pointsObj);
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.wrapperInfo}>
        <Text style={styles.itemName}>{item.pointName}</Text>
        <Text>{item.description}</Text>
      </View>
      <View style={styles.wrapperItemPrice}>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={arrowLeft} />
          </TouchableOpacity>
        </View>
        <Text style={styles.tripName}>{trip.trip}</Text>
        <Text style={styles.tripPrice}>R$ {parseFloat(trip.price).toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AddPointScreen', { id: props.navigation.state.params.id, refreshTrip: loadData, refreshTrips: props.navigation.state.params.refreshTrips })}
          style={styles.addButton}
        >
          <Image source={addButton} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flastList}
        contentContainerStyle={styles.flatListContentContainer}
        data={points}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

TripScreen.navigationOptions = {
  header: null,
};

export default TripScreen;
