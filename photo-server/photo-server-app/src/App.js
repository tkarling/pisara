import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import "./App.css";

// Components
const Card = ({ children }) =>
  <View style={styles.card}>
    {children}
  </View>;
const Photo = ({ src }) => {
  const { innerWidth: width, innerHeight: height } = window;
  if (!src) {
    return <view />;
  }
  const uri = window.URL.createObjectURL(src);
  return (
    <Image source={{ uri }} style={{ width, height }} resizeMode="contain" />
  );
};

const getNexPhoto = () => {
  return fetch("http://localhost:8080/v2/photo/next", {
    method: "get",
    headers: {
      Accept: "application/json"
    }
  })
    .then(result => result.json())
    .then(meta => {
      return fetch("http://localhost:8080/v2/photo/photo", {
        method: "get",
        headers: {
          Accept: "image/*",
          URL: meta.URL
        }
      })
        .then(myBlob => myBlob.blob())
        .then(myBlob => {
          return myBlob;
        });
    });
};

class App extends Component {
  timer = null;
  state = {
    photo: null
  };
  // resize based on https://stackoverflow.com/questions/19014250/reactjs-rerender-on-browser-resize
  updateDimensions = () => {
    this.setState({});
  };
  updatePhoto = () => {
    getNexPhoto().then(photo => {
      this.setState({ photo });
    });
  };

  componentWillMount() {
    this.updateDimensions();
    this.updatePhoto();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.timer = setInterval(this.updatePhoto, 20000);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    delete this.timer;
  }
  render() {
    const { photo } = this.state;
    if (!photo) {
      return (
        <Card>
          <Text>No photo yet</Text>
        </Card>
      );
    }
    return (
      <Card>
        <Photo src={photo} />
      </Card>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  }
});

export default App;
