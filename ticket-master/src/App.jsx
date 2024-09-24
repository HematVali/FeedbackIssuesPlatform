import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Logout from "./components/util/Logout";
import Header from "./components/header/Header";
import LandingPage from "./components/landing/LandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import FAQ from "./components/faq/FAQ";
import SignUp from "./components/signup/SignUp";
import CreateTicket from "./components/createticket/CreateTicket";
import TicketCreated from "./components/createticket/TicketCreated";
import Services from "./components/service-status/Services";

import { Footer } from "./components/footer/Footer";
import Archive from "./components/ticketdisplay/archive/Archive";
import Tickets from "./components/ticketdisplay/ticket/Tickets";
import FilterContextProvider from "./components/ticketdisplay/FilterContextProvider";
import ViewTicket from "./components/viewticket/ViewTicket";
import TicketUpdatedConfirmation from "./components/viewticket/TicketUpdated";

import Users from "./components/userdisplay/Users";
import UserContextFilterProvider from "./components/userdisplay/UserContextFilterProvider";
import ViewUser from "./components/userdisplay/ViewUser";

const App = () => {
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setLoggedUser(user);
    } catch (error) {}
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/view-ticket/:id" element={<ViewTicket />} />
          <Route
            path="/ticket-updated"
            element={<TicketUpdatedConfirmation />}
          />

          <Route
            path="/archive"
            element={<FilterContextProvider children={<Archive />} />}
          />
          <Route
            path="/tickets"
            element={<FilterContextProvider children={<Tickets />} />}
          />
          <Route path="/services" element={<Services />} />

          <Route
            path="/users"
            element={<UserContextFilterProvider children={<Users />} />}
          />
          <Route path="/view-user/:id" element={<ViewUser />} />

          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/ticket-created" element={<TicketCreated />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/logout" element={<Logout />} />
          {!loggedUser && <Route path="/" element={<LandingPage />} />}
          {loggedUser && <Route path="/" element={<Dashboard />} />}
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
