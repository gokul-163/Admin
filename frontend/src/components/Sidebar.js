import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ setPage, setShowSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column justify-content-between text-white shadow-lg"
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "linear-gradient(180deg, #1e3c72, #2a5298)",
        animation: "slideIn 0.4s ease",
        zIndex: 1000,
      }}
    >
      
      <div>
       
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="m-0 fw-bold"> Admin Panel</h5>

          <span
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => setShowSidebar(false)}
          >
            ✖
          </span>
        </div>

        <ul className="nav flex-column p-3">
          <li className="nav-item mb-3">
            <button
              className="btn btn-outline-light w-100 text-start"
              onClick={() => setPage("image")}
            >
              Images
            </button>
          </li>

          <li className="nav-item mb-3">
            <button
              className="btn btn-outline-light w-100 text-start"
              onClick={() => setPage("user")}
            >
             User Form
            </button>
          </li>

           <li className="nav-item mb-3">
            <button
              className="btn btn-outline-light w-100 text-start"
              onClick={() => setPage("product")}
            >
             Product Form
            </button>
          </li>
        </ul>
      </div>

     
      <div className="p-3 border-top">
        <button
          className="btn btn-danger w-100 fw-bold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

     
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Sidebar;