import "./App.css";
import { useContext, useState } from "react";
import UserDataContext from "./UserDataContext";

const UserPostsComp = (props) => {
  const { userPosts } = props;

  const { setPosts } = useContext(UserDataContext);
  const [showPostsList, setShowPostsList] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

  const addNewUserPost = () => {
    //Get the latest id from userPosts and set new id to lastid+1
    const highestId = userPosts.reduce((maxId, currentValue) => {
      return currentValue.id > maxId ? currentValue.id : maxId;
    }, 0);

    const postObj = {
      userId: userPosts[0].userId,
      id: highestId + 1,
      title: newPostTitle,
      body : newPostBody
    };

    setPosts((allPosts) => [...allPosts, postObj]);
    setShowPostsList(true);
  };

  return (
    <div>
      {showPostsList && (
        <div>
          Posts - User {userPosts[0].userId}
          <button
            style={{ backgroundColor: "rgb(255,230,153,1)", height: "20px" }}
            onClick={() => setShowPostsList(false)}
          >
            {" "}
            Add
          </button>
        </div>
      )}

      {showPostsList && (
        <div style={{ border: "2px solid black" }}>
          {userPosts.map((post, index) => {
            return (
              <div
                key={index}
                style={{
                  border: "2px solid purple",
                  margin: "15px",
                }}
              >
                <br />
                <label
                  htmlFor="titleLabel"
                  style={{ borderBottom: "2px solid blue", width: "30px" }}
                >
                  Title:
                </label>
                <div style={{ fontWeight: "normal", fontSize: "14px" }}>
                  {post.title}
                </div>

                <label
                  htmlFor="completeLabel"
                  style={{ borderBottom: "2px solid blue", width: "30px" }}
                >
                  Complete:
                </label>
                <div style={{ fontWeight: "normal", fontSize: "14px" }}>
                  {post.body}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add new Post - User [] */}
      {!showPostsList && (
        <div>
          New Post - User {userPosts[0].userId}
          <div style={{ border: "2px solid black", height: "130px" }}>
            <label
              htmlFor="titleLabel"
              style={{ borderBottom: "2px solid blue", width: "30px" }}
            >
              Title :
            </label>
            <input
              type="text"
              name="new-post-title"
              style={{ border: "1.5px solid black" }}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />

            <br />
            <br />

            <label
              htmlFor="bodyLabel"
              style={{ borderBottom: "2px solid blue", width: "30px" }}
            >
              Body :
            </label>
            <input
              type="text"
              name="new-post-body"
              style={{ border: "1.5px solid black" }}
              onChange={(e) => setNewPostBody(e.target.value)}
            />

            <br />
            <br />
            <button onClick={addNewUserPost} style={{backgroundColor:"rgb(255,230,153,1)"}}>Add</button>
            <button
              onClick={() => setShowPostsList(true)}
              style={{ backgroundColor: "rgb(255,230,153,1)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPostsComp;
