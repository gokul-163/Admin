import React, { useState, useEffect } from "react";
import axios from "axios";

function Productitems() {
  const API = "http://localhost:5000/api/products";

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    offer: ""
  });
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const categories = ["Electronics", "Clothing", "Food", "Books"];

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          image: URL.createObjectURL(file)
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

 
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const fd =new FormData();
      if (file) fd.append("imageFile", file);
      else fd.append("image", formData.image);
      await axios.post(API, formData);
      fetchProducts();
      setFormData({ name: "", price: "", image: "", category: "", offer: "" });
      window.alert("Product added successfully");
    } catch (error) {
      console.log(error);
    }
  };

 
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
      window.alert("Product deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
    setShowModal(true);
    setFile(null);
    window.alert("Edit the product");
  };

  
  const updateProduct = async () => {
    try {
      const fd =new FormData();
      if (file) fd.append("imageFile", file);
      else fd.append("image", formData.image);
      await axios.put(`${API}/${editId}`, formData);
      setShowModal(false);
      fetchProducts();
      setFormData({ name: "", price: "", image: "", category: "", offer: "" });
      setFile(null);
      window.alert("Product updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product Form</h2>

      
      <div className="card p-4 mb-4">
        <form className="row g-3" onSubmit={addProduct}>
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              type="file"
              name="imageFile"
              className="form-control mb-2"
              onChange={handleChange}
            />
          </div>
          

          <div className="col-md-4">
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, i) => (
                <option key={i}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="number"
              name="offer"
              className="form-control"
              placeholder="Offer %"
              value={formData.offer}
              onChange={handleChange}
            />
          </div>

           <div className="col-md-4">
            <input
              type="text"
              name="image"
              className="form-control"
              placeholder="Paste Image URL"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button className="btn btn-success">Add Product</button>
          </div>
        </form>
      </div>

      

   
      <div className="row">
        {products.map((item) => (
          <div className="col-md-3 mb-4" key={item._id}>
            <div className="card shadow-sm h-100">
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5>{item.name}</h5>
                <p className="text-success">
                  <del><small>₹{item.price}</small></del>{" "}
                  <b>₹{item.price - (item.price * item.offer / 100 || 0)}</b>
                </p>
                {item.offer && <span className="badge bg-danger">{item.offer}% OFF</span>}
                <p className="mt-2 text-muted">{item.category}</p>

                <button className="btn btn-warning" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="btn btn-danger ms-2" onClick={() => deleteProduct(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      {showModal && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>Edit Product</h5>

              <input
                type="text"
                name="name"
                className="form-control mb-2"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                className="form-control mb-2"
                placeholder="Product Price"
                value={formData.price}
                onChange={handleChange}
              />
              <input
                type="file"
                name="imageFile"
                className="form-control mb-2"
                onChange={handleChange}
              />
              {formData.image && (
        <div className="mb-3 text-center">
          <img
            src={formData.image}
            alt="preview"
            style={{ height: "150px", objectFit: "cover" }}
          />
        </div>
      )}
              <input
                type="text"
                name="image"
                className="form-control mb-2"
                placeholder="Or paste Image URL"
                value={formData.image}
                onChange={handleChange}
              />
              <input
                type="number"
                name="offer"
                className="form-control mb-2"
                value={formData.offer}
                onChange={handleChange}
              />

              <div className="text-center">
                <button className="btn btn-success me-2" onClick={updateProduct}>
                  Update
                </button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productitems;