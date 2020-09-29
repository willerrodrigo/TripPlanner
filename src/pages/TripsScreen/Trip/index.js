import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

export default function Trip(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.wrapperTrip}>
      <View style={styles.image}><Text>Image</Text></View>
      <Text>{props.title}</Text>
      <Text style={styles.price}>{props.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}
