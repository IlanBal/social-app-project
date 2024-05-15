import axios from "axios";

export default class PostService {
  add(values) {
    return axios.post("http://localhost:8080/posts/add", values);
  }

  getAll() {
    return axios.get("http://localhost:8080/posts/get/all");
  }

  getAllByUserId(userId) {
    return axios.get("http://localhost:8080/posts/get/all/by-user/" + userId);
  }

  getAllByUserFollowing(userId) {
    return axios.get(
      "http://localhost:8080/posts/get/all/by-user/following/" + userId
    );
  }

  getById(id) {
    return axios.get("http://localhost:8080/posts/get/by-id/" + id);
  }
}
