import axios from "axios";

export default class FollowService {
  follow(values) {
    return axios.post("http://localhost:8080/follows/add", values);
  }

  unfollow(values) {
    return axios.post("http://localhost:8080/follows/delete", values);
  }
}
