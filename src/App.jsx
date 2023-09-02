import { Route, Routes } from "react-router-dom"
import Login from "./views/Login"
import SignUp from "./views/SignUp"
import TodoList from "./views/TodoList"

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/todoList" element={<TodoList />} />
    </Routes>
  )
}

export default App
