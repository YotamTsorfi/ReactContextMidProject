import "./App.css";
import { useContext, useState } from "react";
import UserComp from "./UserComp";
import UserDataContext from "./UserDataContext";

const UserListComp = ({ users, todos, posts }) => {
  const [searchText, setSearchText] = useState("");

  const { setUsers } = useContext(UserDataContext);
  const [showNewUserSection, setShowNewUserSection] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEamil] = useState("");

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const addNewUser = () => {
    //Get the latest id from userPosts and set new id to lastid+1
    const highestId = users.reduce((maxId, currentValue) => {
      return currentValue.id > maxId ? currentValue.id : maxId;
    }, 0);

    const userObj = {
      id: highestId + 1,
      name: newName,
      email: newEmail,
      address: {
        street: "",
        city: "",
        zipcode: "",
      },
    };

    setUsers((allUsers) => [...allUsers, userObj]);
    setShowNewUserSection(false);
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => a.id - b.id);

  return (
    <div>
      <div className="add-new-user-container">
        {showNewUserSection && (
          <div id="add_new_user">
            Add New User
            <div style={{ border: "2px solid black" , width: "300px"}}>
              <label
                htmlFor="nameLabel"
                style={{ borderBottom: "2px solid blue", width: "30px" }}
              >
                Name :
              </label>
              <input
                type="text"
                name="new-name"
                style={{ border: "1.5px solid black" }}
                onChange={(e) => setNewName(e.target.value)}
              />

              <br />

              <label
                htmlFor="EmailLabel"
                style={{ borderBottom: "2px solid blue", width: "30px" }}
              >
                Email :
              </label>
              <input
                type="text"
                name="new-email"
                style={{ border: "1.5px solid black" }}
                onChange={(e) => setNewEamil(e.target.value)}
              />

              <br />
              <br />

              <button
                style={{
                  backgroundColor: "rgb(255,230,153,1)",
                  height: "20px",
                }}
                onClick={addNewUser}
              >
                {" "}
                Add
              </button>
              <button
                onClick={() => setShowNewUserSection(false)}
                style={{ backgroundColor: "rgb(255,230,153,1)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ 
            border: '2px solid black',
            borderRadius: '60px',
            padding: '5px',
            width: "425px"
      }}>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style = {{marginLeft : "110px"}}
        />
        <button
          onClick={() => setShowNewUserSection(true)}
          style={{ backgroundColor: "rgb(255,230,153,1)" }}
        >
          Add
        </button>

        {sortedUsers.map((user) => {
          const userTodos = todos.filter((todo) => todo.userId === user.id);
          const userPosts = posts.filter((post) => post.userId === user.id);

          return (
            <UserComp
              key={user.id}
              user={user}
              userTodos={userTodos}
              userPosts={userPosts}
            />
          );
        })}
      </div>

    </div>
  );
};

export default UserListComp;
