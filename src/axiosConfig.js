import axios from "axios";

// Next we make an 'instance' of it

// let APIURL = 'http://3e22-103-76-141-168.ngrok.io/api/v1'

let APIURL = "http://23.92.29.196:8080/api/v1";

if (process.env.NODE_ENV !== "development") {
  // prod code
  //APIURL = 'http://23.92.29.196:3000'
}
const instance = axios.create({
  // .. where we make our configurations
  baseURL: APIURL,
  AccessControlAllowOrigin: "*",
});

// Where you would set stuff like your 'Authorization' header, etc ...

// Also add/ configure interceptors && all the other cool stuff
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      //place your reentry code
      window.location.href = "/login";
    }
    return error.response;
  }
);

export default instance;
