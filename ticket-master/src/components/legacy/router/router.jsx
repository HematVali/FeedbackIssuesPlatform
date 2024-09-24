import { createBrowserRouter } from "react-router-dom";
import Tickets from "../Tickets";
import Login from "../Login";
import Register from "../Register";
import Logout from "../Logout";
import Users from "../Users";
import InputTicket from "../InputTicket";
import UpdateTicket from "../UpdateTicket";
import ReadTicket from "../ReadTicket";
import SearchTicket from "../SearchTicket";
import ViewUser from "../ViewUser";
import UpdateUser from "../UpdateUser";
import SearchUser from "../SearchUser";

const router = createBrowserRouter([
  { path: "/", element: <Tickets /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/logout", element: <Logout /> },
  { path: "/users", element: <Users /> },
  { path: "/newTicket", element: <InputTicket /> },
  { path: "/ticket/:id", element: <UpdateTicket /> },
  { path: "/ticket/read/:id", element: <ReadTicket /> },
  { path: "/ticket/search/:title", element: <SearchTicket /> },
  { path: "/viewuser", element: <ViewUser /> },
  { path: "/updateUser/:id", element: <UpdateUser /> },
  { path: "/ticket/user/:name", element: <SearchUser /> },
]);

export default router;