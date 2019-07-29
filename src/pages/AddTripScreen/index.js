import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, AsyncStorage,
} from 'react-native';

import styles from './styles';

const AddTripSreen = (props) => {
  const [pointName, setPointName] = useState('');

  const handleSave = async () => {
    const trip = {
      id: new Date().getTime(),
      trip: pointName,
      price: 0,
      longitude: -46.625290,
      latitude: -23.533773,
    };

    const tripsAS = await AsyncStorage.getItem('trips');
    let trips = [];
    if (tripsAS) { // truthy, nao é null, undefined, 0 ...
      trips = JSON.parse(tripsAS);
    }
    trips.push(trip);
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
    // props.navigation.navigate('AddPointScreen', { id: trip.id });
    props.navigation.state.params.refresh();
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome da viagem" onChangeText={setPointName} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

AddTripSreen.navigationOptions = {
  header: null,
};

export default AddTripSreen;
