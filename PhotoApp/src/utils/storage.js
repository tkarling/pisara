//@flow
import React from "react";
import { AsyncStorage, Alert } from "react-native";

const STORAGE_ID = "@PhotoApp";
export const KEY_SERVER_IP = "KEY_SERVER_IP";

export async function setItem(key: string, value: string) {
  try {
    await AsyncStorage.setItem(STORAGE_ID + key, value);
  } catch (error) {
    Alert.alert("Error Saving Data", error.message);
  }
}

export async function getItem(key: string) {
  try {
    const value = await AsyncStorage.getItem(STORAGE_ID + key);
    return value;
  } catch (error) {
    Alert.alert("Error Retrieving Data", error.message);
    return "";
  }
}
