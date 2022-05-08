import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
let TOKEN = "";

if (localStorage.getItem("persist:root")) {
  const user = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).currentUser
  );
  if (user) {
    // console.log("inside");
    // console.log(user);
    TOKEN = user.accessToken;
  }
}
// console.log();

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: "Bearer " + TOKEN,
  },
});
