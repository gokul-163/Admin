import React, { useState, useEffect } from "react";
import axios from "axios";

function UserForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    age: "",
    gender: "",
  });

  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
 

  const fields = [
    "name","phone","email","city","state","country","zip","age","gender"
  ];

  const API = "http://localhost:5000/api/users";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(API);
    setData(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    await axios.post(API, form);

    setForm({
      name: "", phone: "", email: "", city: "",
      state: "", country: "", zip: "", age: "", gender: ""
    });

    fetchData();
    window.alert("User add successfully");
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchData();
    window.alert("Delete User data");
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setShowModal(true);
    window.alert("✏️ Editing user data...");
  };

  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

 const updateUser = async () => {
  try {
    await axios.put(`${API}/${editUser._id}`, editUser);

    setShowModal(false);
    fetchData();

    window.alert("User updated successfully");
  } catch (error) {
    console.error(error);
    window.alert("Failed to update user");
  }
};

  return (
    <div className="container-fluid p-4">

  

      <h3 className="text-center mb-4 text-primary">
        👤 User Management
      </h3>

      {/* FORM */}
      <div className="card p-4 mb-4">
        <form className="row g-3" onSubmit={addUser}>
          {fields.map((field) => (
            <div className="col-md-4" key={field}>

              {/* ✅ GENDER DROPDOWN */}
              {field === "gender" ? (
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <input
                  name={field}
                  placeholder={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="form-control"
                />
              )}

            </div>
          ))}

          <div className="text-center">
            <button className="btn btn-success">Add</button>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            {fields.map(f => <th key={f}>{f}</th>)}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {data.map(u => (
            <tr key={u._id}>
              {fields.map(f => <td key={f}>{u[f]}</td>)}

              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => openEditModal(u)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && editUser && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">

              <h5>Edit User</h5>

              {fields.map(field => (
                <div key={field} className="mb-2">

                  {/* ✅ GENDER DROPDOWN IN MODAL */}
                  {field === "gender" ? (
                    <select
                      name="gender"
                      value={editUser.gender}
                      onChange={handleEditChange}
                      className="form-control"
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <input
                      name={field}
                      value={editUser[field]}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  )}

                </div>
              ))}

              <button
                className="btn btn-success"
                onClick={updateUser}
              >
                Update
              </button>

              <button
                className="btn btn-secondary mt-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UserForm;