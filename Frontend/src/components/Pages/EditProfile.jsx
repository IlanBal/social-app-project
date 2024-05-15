import React from "react";
import "../../App.css";
import "../UI/ProfilePage.css";
import "../UI/EditProfile.css";
import withRouter from "../Utils/CustomWithRouter";
import UserService from "../Utils/UserService";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      bio: "",
      date: "",
      userImage: "images/defaultUserIcon.svg",
      userBackground: "images/userBackground.png",
      addImage: "images/add-Image.svg",
    };
  }

  handleNickChange = (event) => {
    this.setState({ nickname: event.target.value });
  };
  handleBioChange = (event) => {
    this.setState({ bio: event.target.value });
  };
  handleDateChange = (event) => {
    this.setState({ date: event.target.value });
  };
  handleProfileUpdate = async () => {
    const userService = new UserService();
    try {
      console.log(
        "------" +
          this.props.userId +
          "------" +
          this.state.nickname +
          "------" +
          this.state.bio +
          "------" +
          this.state.date +
          "------"
      );
      const response = await userService.update({
        id: this.props.userId,
        nickname: this.state.nickname,
        bio: this.state.bio,
        date: this.state.date,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { userBackground, userImage, addImage } = this.state;
    return (
      <div className="editScreen">
        <div className="editProfile">
          <form className="editOverlay">
            <span className="exitEdit" onClick={this.props.onCancel}></span>
            <h1 className="editTitle">Edit profile</h1>
            <img
              className="editUserBackground"
              src={userBackground}
              alt=""
            ></img>
            <img src={addImage} alt="" className="changeBackground" />
            <img className="editUserImage" src={userImage} alt=""></img>
            <img src={addImage} alt="" className="changeUserImage" />

            <input
              type="text"
              placeholder="Nickname"
              onChange={this.handleNickChange}
              className="editName"
            />
            <input
              type="text"
              placeholder="Bio"
              onChange={this.handleBioChange}
              className="editBio"
            />
            <input
              type="date"
              placeholder="Date of birth"
              onChange={this.handleDateChange}
              className="editBirthDate"
            />
            <button
              type="button"
              onClick={this.handleProfileUpdate && this.props.onSave}
              className="saveProfile"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditProfile);
