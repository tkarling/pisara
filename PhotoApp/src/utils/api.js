// @flow
// const SERVER_URL = "http://10.0.1.7:10010/todo";

// let payload = {
//   todo_id: 77,
//   todo: "moi",
//   datecreated: "2016-11-01T23:15:00.000Z",
//   author: "aa",
//   duedate: "2016-11-01T23:15:00.000Z"
// };
import { Alert } from "react-native";
import { setItem, getItem, KEY_SERVER_IP } from "./storage";

async function init() {
  const value = await getItem(KEY_SERVER_IP);
  if (!value) {
    await setItem(KEY_SERVER_IP, "10.0.1.7");
    // await setItem(KEY_SERVER_IP, "");
  }
  console.log(KEY_SERVER_IP + " at init", value);
}
init();

async function getServerUrl() {
  const serverIP = await getItem(KEY_SERVER_IP);
  if (serverIP) {
    return "http://" + serverIP + ":8080/v2/photo/upload";
  }
  return null;
}

export async function addText(photoUrl: string) {
  const serverUrl = await getServerUrl();
  if (!serverUrl) {
    console.error("NO SERVER IP");
    return;
  }

  const payload = { todo: photoUrl };
  fetch(serverUrl, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(payload)
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      // console.log("success", data);
    })
    .catch(function(res) {
      console.error("error", res);
    });
}

export async function addPhoto(photoUrl: string) {
  const serverUrl = await getServerUrl();
  if (!serverUrl) {
    Alert.alert("Error Uploading", "No Server IP");
    return new Promise().reject(new Error("No Server IP"));
  }

  const file = {
    uri: photoUrl, // e.g. 'file:///path/to/file/image123.jpg'
    name: "myImage" + "-" + Date.now() + ".jpg", // e.g. 'image123.jpg',
    type: "image/jpg" // e.g. 'image/jpg'
  };

  const body: any = new FormData();
  body.append("image", file);

  return fetch(serverUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    },
    body: body
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      // console.log("success", SERVER_URL, data);
      return "OK";
    })
    .catch(function(error) {
      Alert.alert("Error Uploading", error.message);
      return error;
    });
}
