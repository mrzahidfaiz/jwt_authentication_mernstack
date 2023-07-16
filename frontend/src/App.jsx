import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import useAutoLogin from "../hooks/useAutoLogin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const loading = useAutoLogin();
  const isAuth = useSelector((state) => state.user.auth);
  return loading ? (
    ""
  ) : (
    <>
      <Router>
        <div className="bg-red-600 flex justify-center align-middle">
        <Navbar />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <div className="flex h-screen w-full justify-center items-center">
          <Routes>
            <Route
              path="/"
              element={
                isAuth ? (
                  <>WELCOME TO HOME</>
                ) : (
                  <>
                    <Login />
                  </>
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
