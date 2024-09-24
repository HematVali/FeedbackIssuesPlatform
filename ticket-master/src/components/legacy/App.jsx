import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Tickets from "./components/legacy/Tickets";
import NavBar from "./components/legacy/NavBar";
import Login from "./components/legacy/Login";
import Register from "./components/legacy/Register";
import Logout from "./components/legacy/Logout";
import InputTicket from "./components/legacy/InputTicket";
import UpdateTicket from "./components/legacy/UpdateTicket";
import ReadTicket from "./components/legacy/ReadTicket";
import SearchTicket from "./components/legacy/SearchTicket";
import ViewUser from "./components/legacy/ViewUser";
import UpdateUser from "./components/legacy/UpdateUser";
import SearchUser from "./components/legacy/SearchUser";
import ResolvedTicket from "./components/legacy/ResolvedTicket";
import Users from "./components/legacy/Users";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Tickets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/newTicket" element={<InputTicket />} />
          <Route path="/ticket/:id" element={<UpdateTicket />} />
          <Route path="/ticket/read/:id" element={<ReadTicket />} />
          <Route path="/ticket/search/:title" element={<SearchTicket />} />
          <Route path="/viewuser" element={<ViewUser />} />
          <Route path="/updateUser/:id" element={<UpdateUser />} />
          <Route path="/ticket/user/:name" element={<SearchUser />} />
          <Route path="/ticket/resolved" element={<ResolvedTicket />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
