import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyImagePicker from './src/modules/MyImagePicker'

export default class App extends React.Component {
  render() {
    return <MyImagePicker/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
