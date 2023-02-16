import {useEffect, useState } from "react";
import axios from "axios";
import UserListComp from "./UserListComp";
import UserDataContext from "./UserDataContext";

const App = () => {
  
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, postsResponse, todosResponse] = await Promise.all([
          axios.get("http://jsonplaceholder.typicode.com/users"),
          axios.get("http://jsonplaceholder.typicode.com/posts"),
          axios.get("http://jsonplaceholder.typicode.com/todos"),
        ]);
        setUsers(userResponse.data);
        setPosts(postsResponse.data);
        setTodos(todosResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    
    <UserDataContext.Provider value={{setUsers, setTodos, setPosts }}>
      <UserListComp users={users} todos={todos} posts={posts} />
    </UserDataContext.Provider>


  );
};

export default App;
