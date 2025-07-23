"use client";

import React, { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";
import toast from "react-hot-toast";

const AllCategoriesUnits = () => {
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newUnit, setNewUnit] = useState({ name: "", abbreviation: "" });
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [unitLoading, setUnitLoading] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState({});
  const [deletingUnit, setDeletingUnit] = useState({});
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.get("/api/category-units", config);
      setCategories(data.categories || []);
      setUnits(data.units || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim()) return toast.error("Enter category name");
    setCategoryLoading(true);
    try {
      const token = localStorage.getItem("adminAuthToken");
      await api.post(
        "/api/category-units/category",
        { name: newCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Category added");
      setNewCategory("");
      fetchData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add category");
    } finally {
      setCategoryLoading(false);
    }
  };

  const addUnit = async () => {
    if (!newUnit.name.trim()) return toast.error("Enter unit name");
    setUnitLoading(true);
    try {
      const token = localStorage.getItem("adminAuthToken");
      await api.post("/api/category-units/unit", newUnit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Unit added");
      setNewUnit({ name: "", abbreviation: "" });
      fetchData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add unit");
    } finally {
      setUnitLoading(false);
    }
  };

  const deleteCategory = async (name) => {
    setDeletingCategory((prev) => ({ ...prev, [name]: true }));
    try {
      const token = localStorage.getItem("adminAuthToken");
      await api.delete(`/api/category-units/category/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category deleted");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete category");
    } finally {
      setDeletingCategory((prev) => ({ ...prev, [name]: false }));
    }
  };

  const deleteUnit = async (name) => {
    setDeletingUnit((prev) => ({ ...prev, [name]: true }));
    try {
      const token = localStorage.getItem("adminAuthToken");
      await api.delete(`/api/category-units/unit/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Unit deleted");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete unit");
    } finally {
      setDeletingUnit((prev) => ({ ...prev, [name]: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Categories & Units
      </h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categories */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            <div className="flex mb-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add new category"
                className="border p-2 rounded w-full mr-2"
              />
              <button
                onClick={addCategory}
                disabled={categoryLoading}
                className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {categoryLoading ? "Adding..." : "Add"}
              </button>
            </div>
            {!loading && categories.length === 0 ? (
              <p className="text-gray-500 text-sm">No categories added.</p>
            ) : (
              <ul>
                {categories.map((cat, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <span>{cat.name}</span>
                    <button
                      onClick={() => deleteCategory(cat.name)}
                      disabled={deletingCategory[cat.name]}
                      className="text-red-500 hover:underline disabled:opacity-50"
                    >
                      {deletingCategory[cat.name] ? "Deleting..." : "Delete"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Units */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Units</h2>
            <div className="flex mb-4 gap-2">
              <input
                type="text"
                value={newUnit.name}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, name: e.target.value })
                }
                placeholder="Unit name (e.g. Kilogram)"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={newUnit.abbreviation}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, abbreviation: e.target.value })
                }
                placeholder="Abbreviation (e.g. kg)"
                className="border p-2 rounded w-1/3"
              />
              <button
                onClick={addUnit}
                disabled={unitLoading}
                className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {unitLoading ? "Adding..." : "Add"}
              </button>
            </div>
            {!loading && units.length === 0 ? (
              <p className="text-gray-500 text-sm">No units added.</p>
            ) : (
              <ul>
                {units.map((unit, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <span>
                      {unit.name}{" "}
                      {unit.abbreviation && `(${unit.abbreviation})`}
                    </span>
                    <button
                      onClick={() => deleteUnit(unit.name)}
                      disabled={deletingUnit[unit.name]}
                      className="text-red-500 hover:underline disabled:opacity-50"
                    >
                      {deletingUnit[unit.name] ? "Deleting..." : "Delete"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategoriesUnits;
