import axios from "axios";

export default class UserService {
  getById(id) {
    return axios.get("http://localhost:8080/users/get/by-id/" + id);
  }

  getAll() {
    return axios.get("http://localhost:8080/users/get/all");
  }

  isFollowing(userId, followingId) {
    return axios.get(
      "http://localhost:8080/" +
        `users/isfollowing?userId=${userId}&followingId=${followingId}`
    );
  }

  update(values) {
    return axios.post("http://localhost:8080/users/update/" + values);
  }
}
