import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import "./App.css";

// Components
const Card = ({ children }) => <View style={styles.card}>{children}</View>;
const Photo = ({ uri }) => {
  const { innerWidth: width, innerHeight: height } = window;
  return (
    <Image source={{ uri }} style={{ width, height }} resizeMode="contain" />
  );
};

class App extends Component {
  // resize based on https://stackoverflow.com/questions/19014250/reactjs-rerender-on-browser-resize
  updateDimensions = () => {
    this.setState({});
  };
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    return (
      <Card>
        <Photo uri="https://avatars0.githubusercontent.com/u/9029281?v=3&s=40" />
      </Card>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
