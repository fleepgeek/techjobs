import axios from "axios";
// import store from "../store";

const instance = axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {
		"Content-Type": "application/json"
	}
});
// console.log(store.getState().auth.token);

// instance.defaults.headers.post["Content-Type"] = "application/json";
// instance.defaults.headers.common[
// 	"x-access-token"
// ] = store.getState().auth.token;

export default instance;
