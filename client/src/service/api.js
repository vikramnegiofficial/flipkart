import axios from "axios";

const URL = "http://localhost:8000";
export const authenticationSignup = async (data) => {
  try {
    return await axios.post(`${URL}/signup`, data);
  } catch (e) {
    console.log("Can't make signup api call : ", e);
  }
};
