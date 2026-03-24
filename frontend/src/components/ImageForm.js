import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import EditImage from "./editImage";

function ImageForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const API = `${API_BASE}/api/images`;
  const UPLOADS = `${API_BASE}/uploads`;

  const fetchData = useCallback(async () => {
    try {
      setError("");
      const res = await axios.get(API);
      setData(res.data);
    } catch {
      setError("Server not connected");
    }
  }, [API]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      await axios.post(API, formData);

      setName("");
      setImage(null);
      fetchData();
      window.alert("User add successfully");
    } catch {
      window.alert("Add failed");
    }
  };

  const deleteData = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchData();
    window.alert("Delete data");
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setShowModal(true)
    window.alert("Edit User data");
    
  };

  return (
    <div className="container-fluid">


      {/* 🔹 ADD FORM */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">📸 Image Manager</h5>
        </div>

        <div className="card-body">
          <form className="row g-3" onSubmit={addData}>

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="col-md-4">
              <button className="btn btn-success w-100">
                ➕ Add Image
              </button>
            </div>

          </form>

          {error && (
            <p className="text-danger mt-2">{error}</p>
          )}
        </div>
      </div>

      {/* 🔹 TABLE */}
      <div className="card shadow">
        <div className="card-body table-responsive">

          <table className="table table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>

                  <td>
                    <img
                      src={`${UPLOADS}/${item.image}`}
                      alt=""
                      className="img-thumbnail"
                      width="80"
                    />
                  </td>

                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => handleEditClick(item)}
                    >
                       Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteData(item._id)}
                    >
                       Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* 🔹 MODAL */}
      {showModal && selectedItem && (
        <EditImage
          item={selectedItem}
          closeModal={() => setShowModal(false)}
          refresh={fetchData}
        />
      )}
    </div>
  );
}

export default ImageForm;