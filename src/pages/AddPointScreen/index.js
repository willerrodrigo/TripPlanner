import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, AsyncStorage,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import arrowLeft from '~/assets/images/arrow-left-white.png';
import styles from './styles';

const AddPointScreen = (props) => {
  const [position, setPosition] = useState({
    longitude: -122.4324,
    latitude: 37.78825,
  });

  const handleSave = async ({ name, description, price }) => {
    const id = new Date().getTime();
    const priceConverted = parseFloat(price);
    const pointAS = await AsyncStorage.getItem(`trip-${props.navigation.state.params.id}`);
    let points = [];
    if (pointAS) {
      points = JSON.parse(pointAS);
    }
    points.push({
      position, name, description, price: priceConverted, id,
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

  const schema = yup.object().shape({
    name: yup.mixed()
      .required('Preencha o campo do nome'),
    description: yup.mixed(),
    price: yup.number()
      .required('Preencha o campo de preço')
      .typeError('Preencha apenas com números'),
  });

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
        <Formik
          initialValues={{ name: '', description: '', price: '' }}
          onSubmit={values => handleSave(values)}
          validationSchema={schema}
        >
          {props => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Nome do ponto"
                onChangeText={props.handleChange('name')}
                value={props.values.name}
              />
              {props.touched.name && props.errors.name && <Text style={{ color: 'red' }}>{props.errors.name}</Text> }
              <TextInput
                style={styles.input}
                placeholder="Descrição"
                onChangeText={props.handleChange('description')}
                value={props.values.description}
              />
              {props.touched.description && props.errors.description && <Text style={{ color: 'red' }}>{props.errors.description}</Text> }
              <TextInput
                style={styles.input}
                placeholder="Preço"
                // onChangeText={value => setPrice(parseFloat(value))}
                onChangeText={props.handleChange('price')}
                // value={`${props.values.price}`}
                // keyboardType="numeric"
              />
              {props.touched.price && props.errors.price && <Text style={{ color: 'red' }}>{props.errors.price}</Text> }
              <TouchableOpacity
                style={styles.saveButton}
                onPress={props.handleSubmit}
              >
                <Text>Salvar</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

AddPointScreen.navigationOptions = {
  header: null,
};

export default AddPointScreen;
