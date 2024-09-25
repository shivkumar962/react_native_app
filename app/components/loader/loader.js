import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loader = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <ActivityIndicator
            size={80}
            color={"green"}
          />
  </View>
);

export default Loader;
