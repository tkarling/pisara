// @flow
import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ImagePicker } from "expo";
import { colors } from "../../config/styles";
import { addPhoto } from "../../utils/api";

function Header({ onRightIconPress }: { onRightIconPress: Function }) {
  return (
    <View style={styles.header}>
      <View style={{ width: 32 }} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Castapic</Text>
      </View>
      <Ionicons
        name="md-settings"
        size={32}
        color={colors.primary}
        onPress={() => {
          console.log("pressing right icon");
          onRightIconPress();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 8
  },
  titleContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 24,
    color: colors.primary,
    justifyContent: "center"
  }
});

export default Header;
