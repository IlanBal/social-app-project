import { Link } from "react-router-dom";

function PostList({ username, userNickname, postBody, userId }) {
  return (
    <div className="postMain">
      <div className="postHeader">
        <div className="postName" key={userId}>
          {userNickname}
        </div>
        <div className="postSlug" key={userId}>
          {username}
        </div>
      </div>
      <div className="postContent" key={userId}>
        {postBody}
      </div>
    </div>
  );
}

export default PostList;
