import { useState } from "react";
import { Header } from "./components/header";
import { TodoList } from "./components/todoList";
import "./Global.css";

function App() {
  return (
    <>
      <Header />
      <TodoList />
    </>
  );
}

export default App;
