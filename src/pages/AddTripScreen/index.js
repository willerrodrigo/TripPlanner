import React from 'react';
import {
  View, TextInput, TouchableOpacity, Text, AsyncStorage,
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import styles from './styles';

const AddTripSreen = (props) => {
  const handleSave = async (values) => {
    const trip = {
      id: new Date().getTime(),
      trip: values.name,
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

  const schema = yup.object().shape({
    name: yup.mixed()
      .required('Preencha o campo do nome'),
  });

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={values => handleSave(values)}
      validationSchema={schema}
    >
      {props => (
        <View style={styles.container}>
          <TextInput
            value={props.values.name}
            style={styles.input}
            placeholder="Nome da viagem"
            onChangeText={text => props.setFieldValue('name', text)}
          />
          { props.errors.name && <Text style={{ color: 'red' }}>{props.errors.name}</Text> }
          <TouchableOpacity style={styles.saveButton} onPress={props.handleSubmit}>
            <Text>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

AddTripSreen.navigationOptions = {
  header: null,
};

export default AddTripSreen;
