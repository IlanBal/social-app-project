import React from "react";
import withRouter from "../Utils/CustomWithRouter";

import "../../App.css";
import "../UI/HomePage.css";

import PostService from "../Utils/PostService";
import UserService from "../Utils/UserService";
import FollowService from "../Utils/FollowService";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: [],
      userImage: "images/defaultUserIcon.svg",
      filteredFollowingList: [],
      posts: [],
      postBody: "",
      isLoading: true,
    };
  }

  handleUserDetails = async () => {
    const userService = new UserService();
    try {
      const response = await userService.getById(this.props.userId);
      const userResponse = response.data;
      if (userResponse.nickname == null)
        userResponse.nickname = userResponse.username;
      this.setState({ userDetails: userResponse });
      this.setState({ isLoading: false });
      this.handleFollowerList(userResponse.following);
      this.handlePostList(userResponse.id);
    } catch (error) {
      console.error(error);
    }
  };

  handleUserSearch = async (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const followerList = this.state.userDetails.following;
    const userService = new UserService();
    try {
      const response = await userService.getAll();
      if (searchQuery === "") {
        this.setState({ filteredFollowingList: followerList });
      } else {
        const filteredUsers = response.data.filter((user) => {
          const nameMatch =
            (!this.state.userDetails.username.includes(searchQuery) &&
              user.username.toLowerCase().includes(searchQuery)) ||
            user.nickname?.toLowerCase().includes(searchQuery);
          return nameMatch;
        });
        this.setState({ filteredFollowingList: filteredUsers });
      }
    } catch (error) {
      console.error(error);
    }
  };

  handlePostInput = (event) => {
    this.setState({ postBody: event.target.value });
  };

  handleFollowerList = (followerList) => {
    this.setState({ filteredFollowingList: followerList });
  };

  onUserPost = async () => {
    const postService = new PostService();
    try {
      const userId = this.state.userDetails.id;
      const postBody = this.state.postBody;
      await postService.add({
        user_id: userId,
        body: postBody,
      });
      this.setState({ postBody: "" });
      this.handlePostList(userId);
    } catch (error) {
      console.error(error);
    }
  };

  handleFollowerAdd = async (followId, event) => {
    const followService = new FollowService();
    const user = this.state.userDetails;
    try {
      const response = await followService.follow({
        user_id: user.id,
        following_id: followId,
      });
      if (response != null) {
        const addButton = event.currentTarget;
        addButton.style.backgroundImage(
          "url('../../../public/images/addFollowerChecked.svg')"
        );
        this.handleFollowerList(user.following);
      }
    } catch (error) {
      console.error(error);
    }
  };

  handlePostList = async (userId) => {
    const postService = new PostService();
    try {
      const response = await postService.getAllByUserFollowing(userId);
      if (response.data == null) {
        const postMessage = document.querySelector(".postState");
        postMessage.innerHTML = "No posts found...";
      }
      const posts = response.data.map((item) => {
        return {
          id: item.id,
          user_id: item.user_id,
          username: item.username,
          nickname: item.nickname,
          body: item.body,
        };
      });

      this.setState({ posts: posts });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.handleUserDetails();
  }

  render() {
    const { userDetails, filteredFollowingList, userImage, posts, postBody } =
      this.state;

    return (
      <div>
        <Link to="/home" className="home-link">
          <svg className="home-logo" />
        </Link>
        <Link to="/login" className="logout-link">
          <svg className="logout-logo" />
        </Link>
        <div className="homepage-container">
          <div className="userScreen">
            <div className="screen-position-left">
              <div className="userProfile">
                <Link to={`/${userDetails.username}`} className="profile-link">
                  <img
                    className="userImage"
                    id="userImage"
                    src={userImage}
                    alt=""
                  />
                </Link>
                <div className="userBox">
                  <label className="userNickname">{userDetails.nickname}</label>
                  <label className="username">
                    {"@" + userDetails.username}
                  </label>
                </div>
              </div>
              <div className="searchBox">
                <input
                  type="search"
                  className="searchInput"
                  id="searchInput"
                  onChange={this.handleUserSearch}
                  placeholder="Search"
                ></input>
              </div>
              <div className="followingList">
                {this.state.isLoading && <p>Loading List..</p>}
                {!this.state.isLoading &&
                  filteredFollowingList.length === 0 && (
                    <p className="followerState">No follower added yet...</p>
                  )}
                {!this.state.isLoading &&
                  filteredFollowingList.length > 0 &&
                  filteredFollowingList.map((follows) => (
                    <div className="followMain">
                      <div className="followHeader">
                        <img
                          className="followUserImage"
                          src={userImage}
                          alt=""
                        ></img>
                        <div className="followName">
                          {follows.nickname == null
                            ? follows.username
                            : follows.nickname}
                        </div>
                        <div className="followSlug">@{follows.username}</div>
                        {!this.state.userDetails.following.some(
                          (user) =>
                            user.user_id === follows.user_id ||
                            user.user_id === follows.id
                        ) && (
                          <button
                            className="followerAdd"
                            onClick={(event) =>
                              this.handleFollowerAdd(follows.id, event)
                            }
                          ></button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="postScreen">
            <form className="postInputBox">
              <textarea
                type="text"
                className="postInput"
                id="postInput"
                value={postBody}
                onChange={this.handlePostInput}
                placeholder="Tell us about your day..."
              />
              <button
                type="button"
                onClick={this.onUserPost}
                disabled={postBody.length === 0}
              >
                Post
              </button>
            </form>
            <div className="postList">
              {this.state.isLoading && <p>Loading List..</p>}
              {!this.state.isLoading && posts.length === 0 && (
                <p className="postState">No posts yet... be the first one!</p>
              )}
              {!this.state.isLoading &&
                posts.length > 0 &&
                posts.map((post) => (
                  <div className="postMain">
                    <div className="postHeader">
                      <img
                        className="postUserImage"
                        src={userImage}
                        alt=""
                      ></img>
                      <div className="postName">
                        {post.nickname == null ? post.username : post.nickname}
                      </div>
                      <div className="postSlug">@{post.username}</div>
                    </div>
                    <div className="postContent">{post.body}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="rightBar"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
