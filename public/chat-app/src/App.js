import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Avatar from "./pages/Avatar";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={ <Register/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/avatar" element={ <Avatar/> }/>
        <Route path="/" element={ <Chat/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
