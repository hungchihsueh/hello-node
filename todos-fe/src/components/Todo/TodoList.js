import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import ShowBtn from "./buttons/ShowBtn";
import DeleteBtn from "./buttons/DeleteBtn";
import axios from "axios";
import {STATUS,STATUSCOLOR} from "../configs/Status"

const TodoList = () => {
  const [todos, setTodos] = useState([{}, {}, {}]);
  useEffect(async () => {
    let res = await axios.get("http://localhost:3006/api/todos");
    setTodos(res.data);
  }, []);
  // console.log(todos);

  
  return (
    <div className="column is-three-fifths">
      <nav
        className="pagination is-success"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list"></ul>
      </nav>
      <div className="level">
        <div className="level-item">
          <div className="buttons">
            <button className="button is-info">進行中</button>
            <button className="button is-success">已完成</button>
            <button className="button is-danger">已暫停</button>
          </div>
        </div>
      </div>
      TODO: 列表
      {todos.map((todo) => {
        return(
        <section className={`message ${STATUSCOLOR[todo.status]}`} key={todo.id}>
          <header className="message-header">
            <p>{STATUS[todo.status]} {todo.title}</p>
          </header>
          <div className="message-body">
          {todo.content}
          <div>截止時間:{todo.deadline}</div>
          </div>
          <footer className="card-footer">
            <ShowBtn />
            <a href="#" className="card-footer-item">
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Done
            </a>
            <EditBtn />
            <DeleteBtn />
          </footer>
        </section>
      )})}
    </div>
  );
};

export default TodoList;
