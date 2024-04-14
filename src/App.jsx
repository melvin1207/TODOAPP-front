import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Login from './pages/Login'
import Register from './pages/Register'
import MainPage from './pages/MainPage'
import Header from "./components/Header"

function App() {
  return (
    <>
      <Router>
        <Header/>
        <div>
          <Routes>
            <Route path="/" element={<MainPage/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
          </Routes>
          <ToastContainer/>
        </div>
      </Router>
    </>
  )
}

export default App