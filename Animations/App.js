import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;

// downloaded from https://www.lottiefiles.com/
const fav = require("./animations/favourite_app_icon.json");
const gears = require("./animations/gears.json");

export default class App extends React.Component {
  state = {
    animation: null
  };

  componentWillMount() {
    this._playAnimation();
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        {this.state.animation &&
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 400,
              height: 400,
              backgroundColor: "#eee"
            }}
            source={this.state.animation}
          />}
        <View style={styles.buttonContainer}>
          <Button title="Restart Animation" onPress={this._playAnimation} />
        </View>
      </View>
    );
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    try {
      const fromNW = false;
      let animation;
      if (fromNW) {
        let result = await fetch(
          "https://cdn.rawgit.com/airbnb/lottie-react-native/635163550b9689529bfffb77e489e4174516f1c0/example/animations/Watermelon.json"
        );
        animation = JSON.parse(result._bodyText);
        console.log("result from NW", result._bodyText);
      } else {
        animation = fav;
        console.log("local result", animation);
      }
      this.setState({ animation }, this._playAnimation);
    } catch (error) {
      console.warn("Error", error.message);
    }
  };
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  buttonContainer: {
    paddingTop: 20
  }
});
