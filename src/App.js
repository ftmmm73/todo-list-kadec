import "./App.css";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./store/TodoContext";
import FilterButtons from "./components/FilterButtons";

function App() {
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TodoProvider>
        <FilterButtons />
        <TodoList />
      </TodoProvider>
    </div>
  );
}

export default App;
