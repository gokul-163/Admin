import React, { useState } from "react";
import axios from "axios";

function EditImage({ item, closeModal, refresh }) {
  const [editName, setEditName] = useState(item.name);
  const [editImage, setEditImage] = useState(null);
  const [preview, setPreview] = useState(
    `http://localhost:5000/uploads/${item.image}`
  );

  const API = "http://localhost:5000/api/images";

  const updateItem = async () => {
    const formData = new FormData();
    formData.append("name", editName);
    if (editImage) formData.append("image", editImage);

    await axios.put(`${API}/${item._id}`, formData);

    refresh();
    closeModal();
    window.alert("User updated successfully");
  };

  return (
    <div className="modal show fade d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg">

          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Edit Image</h5>
            <button
              className="btn-close btn-close-white"
              onClick={closeModal}
            ></button>
          </div>

          <div className="modal-body">

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setEditImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </div>

            {preview && (
              <div className="text-center">
                <img
                  src={preview}
                  alt="preview"
                  className="img-thumbnail"
                  width="120"
                />
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-success" onClick={updateItem}>
               Update
            </button>

            <button className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditImage;