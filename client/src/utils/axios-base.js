import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    "x-access-token": localStorage.getItem("token")
  }
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
