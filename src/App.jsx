import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListView from "./components/ListView";
import { AuthProvider } from "./context/auth";
import RequireAuth from "./utils/RequireAuth";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<RequireAuth><Home />{' '}</RequireAuth>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/listview" element={<RequireAuth><ListView />{' '}</RequireAuth>}></Route>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
      {/* <ListView/> */}
    </>
  );
}

export default App;
