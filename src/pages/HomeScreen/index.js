import React, { useState, useEffect } from 'react';

import {
  Text, ImageBackground, Image, View, TouchableOpacity, AsyncStorage,
} from 'react-native';

import background from '~/assets/images/background.png';
import logo from '~/assets/images/logo-tripplanner.png';
import pin from '~/assets/images/pin.png';
import arrow from '~/assets/images/arrow-right.png';

import styles from './styles';

const Main = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const trips = await AsyncStorage.getItem('trips');

      if (trips) { setShow(true); }
    }
    fetchData();
  }, []);

  return (
    <ImageBackground
      source={background}
      imageStyle={styles.background}
      style={styles.container}
    >
      <View style={styles.logo}>
        <Image source={logo} />
      </View>

      {show
        ? (
          <TouchableOpacity onPress={() => props.navigation.navigate('TripsScreen')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>COMEÇAR!</Text>
            </View>
          </TouchableOpacity>
        )
        : (
          <TouchableOpacity onPress={() => props.navigation.navigate('TripsScreen')}>
            <View style={styles.button}>
              <Image source={pin} />
              <Text style={styles.buttonText}>Vamos planejar sua primeira viagem?</Text>
              <Image source={arrow} />
            </View>
          </TouchableOpacity>
        )
      }
    </ImageBackground>
  );
};

Main.navigationOptions = {
  header: null,
};

export default Main;
