import axios from "axios";

const URL = "http://localhost:8000/api/user";

class Authentication {
  static authenticationSignup = async (data) => {
    try {
      return await axios.post(`${URL}/signup`, data);
    } catch (e) {
      // console.log("Can't make signup api call : ", e);
      return e.response;
    }
  };
  static signin = async (data) => {
    try {
      return await axios.post(`${URL}/signin`, data);
    } catch (e) {
      // console.log("Can't make signup api call : ", e);
      return e.response;
    }
  };
}

export default Authentication;
