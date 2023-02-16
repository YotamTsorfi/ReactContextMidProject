import "./App.css";
import { useContext, useState } from "react";
import UserDataContext from "./UserDataContext";

const UserTodosComp = (props) => {
  const { userTodos } = props;

  const { setTodos } = useContext(UserDataContext);

  const [showTodoList, setShowTodoList] = useState(true);

  const [newTodoTitle, setNewTodoTitle] = useState("");

  const updateTodo = (todoId, todo) => {
    todo.completed = true;
    setTodos((prevTodos) => [
      ...prevTodos.filter((t) => t.id !== todoId),
      todo,
    ]);
  };

  const addNewUserTodo = () => {
    //Get the latest id from userTodos and set new id to lastid+1
    const highestId = userTodos.reduce((maxId, currentValue) => {
      return currentValue.id > maxId ? currentValue.id : maxId;
    }, 0);

    const todoObj = {
      userId: userTodos[0].userId,
      id: highestId + 1,
      title: newTodoTitle,
      completed: false,
    };

    setTodos((allTodos) => [...allTodos, todoObj]);
    setShowTodoList(true);
  };

  return (
    <div>
      {showTodoList && (
        <div>
          Todos - User {userTodos[0].userId}
          <button
            style={{ backgroundColor: "rgb(255,230,153,1)", height: "20px" }}
            onClick={() => setShowTodoList(false)}
          >
            {" "}
            Add
          </button>
        </div>
      )}

      {showTodoList && (
        <div style={{ border: "2px solid black" }}>
          {userTodos.map((todo, index) => {
            return (
              <div
                key={index}
                style={{
                  border: "2px solid purple",
                  margin: "15px",
                }}
              >
                {!todo.completed && (
                  <button
                    onClick={() => updateTodo(todo.id, todo)}
                    style={{
                      backgroundColor: "rgb(255,230,153,1)",
                      height: "20px",
                    }}
                  >
                    Mark Completed
                  </button>
                )}

                <br />
                <label
                  htmlFor="titleLabel"
                  style={{ borderBottom: "2px solid blue", width: "30px" }}
                >
                  Title:
                </label>
                <div style={{ fontWeight: "normal", fontSize: "14px" }}>
                  {todo.title}
                </div>

                <label
                  htmlFor="completeLabel"
                  style={{ borderBottom: "2px solid blue", width: "30px" }}
                >
                  Complete:
                </label>
                <div style={{ fontWeight: "normal", fontSize: "14px" }}>
                  {todo.completed ? "True" : "False"}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add new Todo - User [] */}
      {!showTodoList && (
        <div>
          New Todo - User {userTodos[0].userId}
          <div style={{ border: "2px solid black", height: "130px" }}>
            <label
              htmlFor="titleLabel"
              style={{ borderBottom: "2px solid blue", width: "30px" }}
            >
              Title :
            </label>
            <input
              type="text"
              name="new-todo-title"
              style={{ border: "1.5px solid black" }}
              onChange={(e) => setNewTodoTitle(e.target.value)}
            />

            <br />
            <br />
            <button
              onClick={addNewUserTodo}
              style={{ backgroundColor: "rgb(255,230,153,1)" }}
            >
              Add
            </button>
            <button
              onClick={() => setShowTodoList(true)}
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

export default UserTodosComp;
