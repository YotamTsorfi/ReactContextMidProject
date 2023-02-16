import { createContext } from "react";

const UserDataContext = createContext({
    setUsers: () => {},
    setTodos: () => {},
    setPosts: () => {},
  });

export default UserDataContext;