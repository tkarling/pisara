// @flow
// const SERVER_URL = "http://10.0.1.7:10010/todo";

// let payload = {
//   todo_id: 77,
//   todo: "moi",
//   datecreated: "2016-11-01T23:15:00.000Z",
//   author: "aa",
//   duedate: "2016-11-01T23:15:00.000Z"
// };

const SERVER_URL = "http://10.0.1.8:8080/v2/photo/upload";

export function addText(photoUrl: string) {
  // console.log("photoUrl", photoUrl);
  const payload = { todo: photoUrl };
  fetch(SERVER_URL, {
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

export function addPhoto(photoUrl: string) {
  const file = {
    uri: photoUrl, // e.g. 'file:///path/to/file/image123.jpg'
    name: "myImage" + "-" + Date.now() + ".jpg", // e.g. 'image123.jpg',
    type: "image/jpg" // e.g. 'image/jpg'
  };

  const body: any = new FormData();
  body.append("image", file);

  // console.log("body", body);

  fetch(SERVER_URL, {
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
    })
    .catch(function(res) {
      console.error("error", res);
    });
}
