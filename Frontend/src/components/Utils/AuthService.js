import axios from "axios";

export default class AuthService {
  register(values) {
    return axios.post("http://localhost:8080/auth/register", values);
  }
  login(values) {
    return axios.post("http://localhost:8080/auth/login", values);
  }
}
