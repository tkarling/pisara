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

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    menuOpen: false
  };

  _toggleMenu = () => {
    const { menuOpen } = this.state;
    console.log("menu to", !menuOpen);
    this.setState({ menuOpen: !menuOpen });
  };

  render() {
    let { image, menuOpen } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ padding: 8 }}>
          {image &&
            <Image
              source={{ uri: image }}
              resizeMode={"contain"}
              style={{ width: 200, height: 200 }}
            />}
        </View>
        {/*<View style={{ padding: 8 }}>
          <Button title="Post something" onPress={this._postSomething} />
        </View>*/}
        <View style={{ padding: 8 }}>
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
            color={colors.primary}
          />
        </View>
        <View style={{ padding: 8 }}>
          <Button
            title="Take picture with camera"
            onPress={this._takePic}
            color={colors.primary}
          />
        </View>
      </View>
    );
  }

  _postSomething = () => {
    addPhoto("moi");
  };

  _savePhoto = async result => {
    // console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      try {
        await addPhoto(result.uri);
      } catch (error) {
        this.setState({ image: null });
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(
      {
        // allowsEditing: true,
        // aspect: [4, 3]
      }
    );
    this._savePhoto(result);
  };

  _takePic = async () => {
    let result = await ImagePicker.launchCameraAsync(
      {
        // allowsEditing: true,
        // aspect: [4, 3]
      }
    );
    this._savePhoto(result);
    if (!result.cancelled) {
      CameraRoll.saveToCameraRoll(result.uri);
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
