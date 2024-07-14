import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Route, Routes } from "react-router-dom";
import "./components/dashboard.css";
import Home from "@pages/Home/Home";
import Navbar from "./components/Navbar/Navbar.jsx"
import Customer from "./pages/customer/customer.jsx";

function App() {
  return (
    <>
      <div className={''}>
        <Navbar />
        <div className={''}>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Customer" element={<Customer />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
