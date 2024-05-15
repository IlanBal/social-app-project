import { Component } from "react";
import React from "react";

import "../../App.css";
import "../UI/ProfilePage.css";

import withRouter from "../Utils/CustomWithRouter";
import UserService from "../Utils/UserService";
import FollowService from "../Utils/FollowService";
import { Link } from "react-router-dom";
import PostService from "../Utils/PostService";
import EditProfile from "./EditProfile";

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: [],
      userImage: "images/defaultUserIcon.svg",
      userBackground: "images/userBackground.png",
      filteredFollowingList: [],
      posts: [],
      showPosts: true,
      showFollowing: false,
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
      this.handlePostsList(userResponse.id);
    } catch (error) {
      console.error(error);
    }
  };

  handlePostList = (event) => {
    const activeBtn = document.querySelector(".activeButton");
    const followingButton = document.querySelector(".followingButton");
    event.target.classList.add("active");
    followingButton.classList.remove("active");
    activeBtn.style.transform = "translateX(0)";
    this.setState({ showPosts: true, showFollowing: false });
  };

  handleFollowing = (event) => {
    const activeBtn = document.querySelector(".activeButton");
    const postButton = document.querySelector(".postButton");
    event.target.classList.add("active");
    postButton.classList.remove("active");
    activeBtn.style.transform = "translateX(145%)";
    this.setState({ showPosts: false, showFollowing: true });
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

  handleFollowerList = (followerList) => {
    this.setState({ filteredFollowingList: followerList });
  };

  handlePostsList = async (userId) => {
    const postService = new PostService();
    try {
      const response = await postService.getAllByUserId(userId);
      this.setState({ posts: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.handleUserDetails();
  }
  render() {
    const {
      userDetails,
      filteredFollowingList,
      userImage,
      userBackground,
      posts,
    } = this.state;
    return (
      <div>
        <Link to="/home" className="home-link">
          <svg className="home-logo" />
        </Link>
        <Link to="/login" className="logout-link">
          <svg className="logout-logo" />
        </Link>
        <div className="profile-container">
          <div className="followerScreen">
            <div className="followerScreenPosition">
              <div className="followerScreenContainer">
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
          </div>
          <div className="profileScreen">
            <img
              className="userProfileBackground"
              src={userBackground}
              alt=""
            ></img>
            <div className="userProfileBox">
              <img
                className="userProfileImage"
                id="userImage"
                src={userImage}
                alt=""
              />
              <div className="userProfileHeader">
                <label className="userProfileNickname">
                  {userDetails.nickname}
                </label>
                <label className="userProfileUsername">
                  {"@" + userDetails.username}
                </label>
                <label className="userProfileDate">
                  Date of Birth: {userDetails.date}
                </label>
              </div>
              <span className="userProfileBio">{userDetails.bio}</span>
              <button
                className="userProfileEdit"
                onClick={this.props.onEditClick}
              >
                Edit Profile
              </button>
              {this.props.isEditing && (
                <div className="edit-profile-overlay">
                  <Link to={`${userDetails.username}`}></Link>
                  {console.log(this.props.isEditing)}
                  <EditProfile
                    userId={userDetails.id}
                    onSave={this.props.onSave}
                    onCancel={this.props.onCancel}
                  />
                </div>
              )}
            </div>
            <div className="userButtons">
              <button
                className="postButton active"
                onClick={this.handlePostList}
              >
                My posts
              </button>
              <button
                className="followingButton"
                onClick={this.handleFollowing}
              >
                Following
              </button>
            </div>
            <span className="activeButton"></span>
            <div className="optionScreen">
              {this.state.showPosts && (
                <div className="optionPostList">
                  {this.state.isLoading && <p>Loading List..</p>}
                  {!this.state.isLoading && userDetails.length === 0 && (
                    <p className="postState">
                      No posts yet... be the first one!
                    </p>
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
                            {post.nickname == null
                              ? post.username
                              : post.nickname}
                          </div>
                          <div className="postSlug">@{post.username}</div>
                        </div>
                        <div className="postContent">{post.body}</div>
                      </div>
                    ))}
                </div>
              )}
              {this.state.showFollowing && (
                <div className="optionFollowingList">
                  {this.state.isLoading && <p>Loading List..</p>}
                  {!this.state.isLoading &&
                    filteredFollowingList.length === 0 && (
                      <p className="followerState">No follower added yet...</p>
                    )}
                  {!this.state.isLoading &&
                    filteredFollowingList.length > 0 &&
                    filteredFollowingList.map((follows) => (
                      <div className="followingMain">
                        <div className="followingHeader">
                          <img
                            className="followingUserImage"
                            src={userImage}
                            alt=""
                          ></img>
                          <div className="followingName">
                            {follows.nickname == null
                              ? follows.username
                              : follows.nickname}
                          </div>
                          <div className="followingSlug">
                            @{follows.username}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="rightBar"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserPage);
