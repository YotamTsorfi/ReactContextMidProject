import "./App.css";
import { useContext, useState } from "react";
import UserDataContext from "./UserDataContext";
import UserTodosComp from "./UserTodosComp";
import UserPostsComp from "./UserPostsComp";

const UserComp = (props) => {
  const { user, userTodos, userPosts } = props;

  const { setUsers } = useContext(UserDataContext);

  const [userData, setUserData] = useState(user);
  const [showOtherData, setShowOtherData] = useState(false);

  const [showTodosAndPosts, setShowTodosAndPosts] = useState(false);

  const hasUncompletedTodos = userTodos.some((todo) => !todo.completed);
  const colorBorder = hasUncompletedTodos ? "red" : "green";

  const updatUserData = () => {
    setUsers((prevUsers) => [
      ...prevUsers.filter((u) => u.id !== userData.id),
      userData,
    ]);
  };

  const deleteUserData = () => {
    setUsers((prevUsers) => [...prevUsers.filter((u) => u.id !== userData.id)]);
  };

  return (
    <div
      style={{
        border: "2px solid " + colorBorder,
        padding: "10px",
        margin: "10px",
        marginLeft: "25px",
        width: "350px",
        height: "inherit",
      }}
    >
      <div
        style={{
          backgroundColor: showTodosAndPosts ? "rgb(248 203 173)" : "white",
        }}
      >
        <label
          onClick={() => setShowTodosAndPosts(!showTodosAndPosts)}
          htmlFor="idLabel"
          style={{ borderBottom: "2px solid blue", width: "30px" }}
        >
          ID : {userData.id}
        </label>
        <br />

        <label
          htmlFor="nameLabel"
          style={{ borderBottom: "2px solid blue", width: "30px" }}
        >
          Name :
        </label>
        <input
          type="text"
          name="name"
          value={userData.name}
          style={{
            border: "1.5px solid black",
            backgroundColor: showTodosAndPosts ? "rgb(248 203 173)" : "white",
          }}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <br />
        <label
          htmlFor="emailLabel"
          style={{ borderBottom: "2px solid blue", width: "30px" }}
        >
          Email :
        </label>
        <input
          type="text"
          name="email"
          value={userData.email}
          style={{
            border: "1.5px solid black",
            backgroundColor: showTodosAndPosts ? "rgb(248 203 173)" : "white",
          }}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <br />
        <button
          onMouseOver={() => setShowOtherData(true)}
          onClick={() => setShowOtherData(!showOtherData)}
        >
          Other Data
        </button>
        <br />
        {showOtherData && (
          <div className="other-data">
            <label
              htmlFor="streetLabel"
              style={{ borderBottom: "2px solid blue", width: "30px" }}
            >
              Street :
            </label>
            <input
              type="text"
              name="street"
              value={userData.address.street}
              style={{
                border: "1.5px solid black",
                backgroundColor: showTodosAndPosts
                  ? "rgb(248 203 173)"
                  : "white",
              }}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...userData.address, street: e.target.value },
                })
              }
            />
            <br />
            <label
              htmlFor="cityLabel"
              style={{ borderBottom: "2px solid blue", width: "30px" }}
            >
              City :
            </label>
            <input
              type="text"
              name="city"
              value={userData.address.city}
              style={{
                border: "1.5px solid black",
                backgroundColor: showTodosAndPosts
                  ? "rgb(248 203 173)"
                  : "white",
              }}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...userData.address, city: e.target.value },
                })
              }
            />
            <br />
            <label
              htmlFor="zipcodeLabel"
              style={{ borderBottom: "2px solid blue", width: "30px" }}
            >
              Zip Code :
            </label>
            <input
              type="text"
              name="zipcode"
              value={userData.address.zipcode}
              style={{
                border: "1.5px solid black",
                backgroundColor: showTodosAndPosts
                  ? "rgb(248 203 173)"
                  : "white",
              }}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...userData.address, zipcode: e.target.value },
                })
              }
            />
          </div>
        )}

        <button
          onClick={updatUserData}
          style={{ backgroundColor: "rgb(255,230,153,1)" }}
        >
          Update
        </button>
        <button
          onClick={deleteUserData}
          style={{ backgroundColor: "rgb(255,230,153,1)" }}
        >
          Delete
        </button>
      </div>
      {/* Spilt the Todos & Posts to the right screen */}
      <br /> <br />
      {showTodosAndPosts && (
        <div className="todos-posts-data">
          <UserTodosComp userTodos={userTodos} />
          <br />
          <br />
          <UserPostsComp userPosts={userPosts} />
        </div>
      )}
    </div>
  );
};

export default UserComp;
