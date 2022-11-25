import AddTodo from "../components/AddTodo";
import Todos from "../components/Todos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const fetchTodos = async () => {
        let res = await fetch("api/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        const data = await res.json();
        setTodos(data);
      };
      fetchTodos();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const onAdd = async (itemDesc) => {
    const token = sessionStorage.getItem("token");

    //posting new item.
    if (token) {
      const res = await fetch("api/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ desc: itemDesc }),
      });

      if (res.ok) {
        const newTodo = await res.json();
        setTodos([...todos, newTodo]);
      }
    } else {
      navigate("/login");
    }
  };

  const onDelete = async (idToDelete) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      let res = await fetch("api/list/" + idToDelete, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (res.ok) {
        setTodos(todos.filter((todo) => todo._id !== idToDelete));
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="todoList">
      <h1> TODOLIST</h1>
      <AddTodo todos={todos} onAdd={onAdd} setTodos={setTodos} />
      <Todos todos={todos} onDelete={onDelete} />
    </div>
  );
}

export default Dashboard;
