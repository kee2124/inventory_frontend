import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    productId: "",
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Delete a product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Start editing a product
  const startEdit = (product) => {
    setEditProduct({ ...product });
  };

  // Handle update change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save edited product
  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/${editProduct.productId}`,
        editProduct
      );
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Add new product
  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/products", newProduct);
      setNewProduct({
        productId: "",
        name: "",
        price: "",
        stock: "",
        category: "",
      });
      setShowAddForm(false);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Function to check if product has low stock
  const isLowStock = (stock) => {
    return stock <= 5; // Highlight products with stock of 5 or less
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl font-semibold mb-4">Product Inventory</h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            backgroundColor: "brown",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
        >
          Add Product
        </button>
      </div>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.productId}
              style={{
                color: isLowStock(product.stock) ? "#b00715" : "black", 
                textDecoration: isLowStock(product.stock) ? "underline" : "none"
              }}
            >
              <td>{product.productId}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <button
                  onClick={() => handleDelete(product.productId)}
                  style={{
                    backgroundColor: "brown",
                    color: "white",
                    borderRadius: "5px",
                    border: "none",
                    padding: "5px 10px",
                    marginRight: "5px",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => startEdit(product)}
                  style={{
                    backgroundColor: "brown",
                    borderRadius: "5px",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editProduct && (
        <div style={{ marginTop: "20px" }}>
          <h2>Edit Product</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveEdit();
            }}
          >
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editProduct.name}
                onChange={handleEditChange}
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={editProduct.price}
                onChange={handleEditChange}
              />
            </label>
            <br />
            <label>
              Stock:
              <input
                type="number"
                name="stock"
                value={editProduct.stock}
                onChange={handleEditChange}
              />
            </label>
            <br />
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={editProduct.category}
                onChange={handleEditChange}
              />
            </label>
            <br />
            <button
              type="submit"
              style={{
                backgroundColor: "brown",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                marginRight: "10px",
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditProduct(null)}
              style={{
                backgroundColor: "brown",
                color: "white",
                borderRadius: "5px",
                border: "none",
                padding: "5px 10px",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {showAddForm && (
        <div style={{ marginTop: "20px" }}>
          <h2>Add New Product</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddProduct();
            }}
          >
            <label>
              Product ID:
              <input
                type="text"
                name="productId"
                value={newProduct.productId}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    productId: e.target.value,
                  }))
                }
              />
            </label>
            <br />
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            </label>
            <br />
            <label>
              Stock:
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    stock: e.target.value,
                  }))
                }
              />
            </label>
            <br />
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              />
            </label>
            <br />
            <button
              type="submit"
              style={{
                backgroundColor: "brown",
                color: "white",
                borderRadius: "5px",
                border: "none",
                padding: "5px 10px",
                marginRight: "10px",
              }}
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              style={{
                backgroundColor: "brown",
                color: "white",
                borderRadius: "5px",
                border: "none",
                padding: "5px 10px",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
