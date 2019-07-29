import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, AsyncStorage,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import arrowLeft from '~/assets/images/arrow-left-white.png';
import styles from './styles';

const AddPointScreen = (props) => {
  const [position, setPosition] = useState({
    longitude: -122.4324,
    latitude: 37.78825,
  });
  const [pointName, setPointName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleSave = async () => {
    const id = new Date().getTime();
    const pointAS = await AsyncStorage.getItem(`trip-${props.navigation.state.params.id}`);
    let points = [];
    if (pointAS) {
      points = JSON.parse(pointAS);
    }
    points.push({
      position, pointName, description, price, id,
    });
    await AsyncStorage.setItem(`trip-${props.navigation.state.params.id}`, JSON.stringify(points));

    let total = 0;
    points.forEach((p) => {
      total += p.price;
    });

    const tripsAS = await AsyncStorage.getItem('trips');
    let trips = [];
    if (tripsAS) {
      trips = JSON.parse(tripsAS);
    }
    trips.forEach((trip, index) => {
      if (trip.id === props.navigation.state.params.id) {
        trips[index].price = total;
        trips[index].latitude = points[0].position.latitude;
        trips[index].longitude = points[0].position.longitude;
      }
    });

    await AsyncStorage.setItem('trips', JSON.stringify(trips));
    props.navigation.state.params.refreshTrip();
    props.navigation.state.params.refreshTrips();
    props.navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              draggable
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              onDragEnd={
              (e) => {
                setPosition(e.nativeEvent.coordinate);
              }
            }
            />
          </MapView>
          <View style={styles.backButton}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image source={arrowLeft} />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput style={styles.input} placeholder="Nome do ponto" onChangeText={setPointName} />
        <TextInput style={styles.input} placeholder="Descrição" onChangeText={setDescription} />
        <TextInput style={styles.input} placeholder="Preço" onChangeText={value => setPrice(parseFloat(value))} />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

AddPointScreen.navigationOptions = {
  header: null,
};

export default AddPointScreen;
