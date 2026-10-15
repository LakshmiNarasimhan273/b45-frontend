import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const decodedToken = token ? jwtDecode(token) : null;

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================
  // GET PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://b45-ecommerce-backend.onrender.com/products",
        axiosConfig,
      );

      // axios.get(url, {headers: {Authorization: `Bearer ${token}`});

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (error.response?.status === 404) {
        setProducts([]);
        return;
      }

      alert(error.response?.data?.message || "Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // =========================
      // UPDATE
      // =========================

      if (editId) {
        const response = await axios.put(
          `https://b45-ecommerce-backend.onrender.com/products/${editId}`,
          {
            title: formData.title,
            description: formData.description,
            price: formData.price,
          },
          axiosConfig,
        );

        alert("Product updated successfully");

        setProducts(
          products.map((product) =>
            product._id === editId ? response.data.updatedProduct : product,
          ),
        );

        setEditId(null);
      }

      // =========================
      // CREATE
      // =========================
      else {
        const response = await axios.post(
          "https://b45-ecommerce-backend.onrender.com/products/add",
          {
            title: formData.title,
            description: formData.description,
            price: formData.price,
          },
          axiosConfig,
        );

        alert("Product added successfully");

        setProducts([...products, response.data.product]);
      }

      // Clear form

      setFormData({
        title: "",
        description: "",
        price: "",
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Product operation failed");
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (product) => {
    setEditId(product._id);

    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `https://b45-ecommerce-backend.onrender.com/products/${id}`,
        axiosConfig,
      );

      alert("Product deleted successfully");

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Product deletion failed");
    }
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancelEdit = () => {
    setEditId(null);

    setFormData({
      title: "",
      description: "",
      price: "",
    });
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= NAVBAR ================= */}

      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">ShopKart Admin</h1>

          <p className="text-sm text-gray-300">
            Welcome, {decodedToken?.username}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ================= FORM ================= */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editId ? "Update Product" : "Add Product"}
            </h2>

            {editId && (
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-800"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* TITLE */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* PRICE */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* BUTTONS */}

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700"
              >
                {editId ? "Update Product" : "Add Product"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ================= PRODUCT LIST ================= */}

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {products.length} Products
            </span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No products available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 min-h-[60px]">
                    {product.description}
                  </p>

                  <p className="text-xl font-bold text-green-600 mb-4">
                    ₹{product.price}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
