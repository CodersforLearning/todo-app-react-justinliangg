import "../app.css";
import Todo from "./Todo";

function Todos({todos, onDelete}){

    return(
        <div class="todos">
            {todos.map((todo) => (
                <Todo todo={todo} onDelete={onDelete}/>
            ))}
        </div>
    )
};

export default Todos;