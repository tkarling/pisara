import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyImagePicker from "./src/modules/MyImagePicker";
import ServerPicker from "./src/modules/ServerPicker";
import Header from "./src/components/Header";

const IMAGE_PICKER = "IMAGE_PICKER";
const SERVER_PICKER = "SERVER_PICKER";

export default class App extends React.Component {
  state = {
    page: IMAGE_PICKER
  };

  togglePage = () => {
    this.setState(state => {
      return {
        page: state.page === IMAGE_PICKER ? SERVER_PICKER : IMAGE_PICKER
      };
    });
  };
  render() {
    const { page } = this.state;
    const content =
      page === IMAGE_PICKER ? <MyImagePicker /> : <ServerPicker />;
    return (
      <View style={styles.container}>
        <Header onRightIconPress={this.togglePage} />
        <View style={styles.container}>
          {content}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
