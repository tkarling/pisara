import React from "react";
import { Button, Image, View, CameraRoll } from "react-native";
import { ImagePicker } from "expo";
import { addPhoto } from "../../utils/api";

export default class ImagePickerExample extends React.Component {
  state = {
    image: null
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
          />
        </View>
        <View style={{ padding: 8 }}>
          <Button title="Take picture with camera" onPress={this._takePic} />
        </View>
      </View>
    );
  }

  _postSomething() {
    addPhoto("moi");
  }

  _savePhoto(result) {
    // console.log(result);

    if (!result.cancelled) {
      addPhoto(result.uri);
      this.setState({ image: result.uri });
    }
  }

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
