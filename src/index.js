import React from 'react';
import { SafeAreaView } from 'react-native';
import '~/config/ReactotronConfig';

import Routes from '~/routes';

const App = () => (
  <SafeAreaView forceInset={{ top: 'always' }} style={{ backgroundColor: '#FFF', flex: 1 }}>
    <Routes />
  </SafeAreaView>
);

export default App;
