import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ImageForm from "./ImageForm";
import UserForm from "./UserForm";
import Productitems from "./Productitems";


function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [page, setPage] = useState("image");

  return (
    <div className="d-flex">
     
      <div
        className={`bg-primary text-white position-fixed top-0 start-0 vh-100 shadow ${
          showSidebar ? "d-block" : "d-none"
        }`}
        style={{
          width: "250px",
          transition: "0.3s",
          zIndex: 1000,
        }}
      >
        <Sidebar
          setPage={setPage}
          setShowSidebar={setShowSidebar}
        />
      </div>

      
      <div
        className="flex-grow-1"
        style={{
          marginLeft: showSidebar ? "250px" : "0",
          transition: "0.3s",
          width: "100%",
        }}
      >

       
        <div className="bg-white shadow-sm p-3 d-flex align-items-center justify-content-between">

         
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            ☰
          </button>

          <h5 className="mb-0 fw-bold text-primary">
            Admin Dashboard
          </h5>

          <span className="text-muted small">
            Welcome Admin 👋
          </span>

        </div>

        
        <div className="p-4 bg-light min-vh-100">

          <div className="card shadow-sm border-0 rounded-4 p-3">
            {page === "image" && <ImageForm />}
            {page === "user" && <UserForm />}
            {page === "product" && <Productitems/>}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;