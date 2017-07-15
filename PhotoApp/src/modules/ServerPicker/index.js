// @flow
import React from "react";
import {
  StyleSheet,
  Button,
  Image,
  View,
  Text,
  CameraRoll
} from "react-native";
import { ImagePicker } from "expo";
import { colors } from "../../config/styles";
import { addPhoto } from "../../utils/api";

export default class ServerPicker extends React.Component {
  state = {
    ip: "10.0.1.7"
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from ServerPicker</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
