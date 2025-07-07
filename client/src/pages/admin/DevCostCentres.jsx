import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CostCentresPage = () => {
  const [costCentres, setCostCentres] = useState([]);
  const [filteredCentres, setFilteredCentres] = useState([]);
  const [newCostCentre, setNewCostCentre] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const plantId = queryParams.get("plantId");

  // Fetch cost centres for given plant
  const fetchCostCentres = async () => {
    if (!plantId) {
      toast.error("Plant ID not provided");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`/api/costcentres/${plantId}`);
      if (res.data.success) {
        setCostCentres(res.data.data);
        setFilteredCentres(res.data.data);
      } else {
        toast.error(res.data.error || "Failed to fetch cost centres");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error(err.response?.data?.error || "Server error while fetching cost centres");
    } finally {
      setLoading(false);
    }
  };

  const createCostCentre = async () => {
    const name = newCostCentre.trim();
    if (!name) {
      toast.error("Cost centre name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/costcentres", { name, plantId });
      if (res.data.success) {
        toast.success("Cost centre created");
        setNewCostCentre("");
        fetchCostCentres();
      } else {
        toast.error(res.data.error || "Failed to create");
      }
    } catch (err) {
      console.error("Create error:", err);
      toast.error(err.response?.data?.error || "Server error while creating cost centre");
    } finally {
      setLoading(false);
    }
  };

  const deleteCostCentre = async (id) => {
    try {
      const res = await axios.delete(`/api/costcentres/${id}`);
      if (res.data.success) {
        toast.success("Deleted successfully");
        fetchCostCentres();
      } else {
        toast.error(res.data.error || "Failed to delete");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Server error while deleting cost centre");
    }
  };

  const handleNavigate = (costCentreId) => {
    navigate(`/dev-eng/tools?costCentreId=${costCentreId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = costCentres.filter((cc) =>
      cc.name.toLowerCase().includes(value)
    );
    setFilteredCentres(filtered);
  };

  useEffect(() => {
    fetchCostCentres();
  }, [plantId]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
        Cost Centres
      </h1>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search cost centre..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Add cost centre */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter new cost centre name"
          value={newCostCentre}
          onChange={(e) => setNewCostCentre(e.target.value)}
          className="w-full sm:w-auto flex-1 border p-2 rounded"
          onKeyDown={(e) => e.key === "Enter" && createCostCentre()}
          disabled={loading}
        />
        <button
          onClick={createCostCentre}
          disabled={loading || !newCostCentre.trim()}
          className={`w-full sm:w-auto px-4 py-2 rounded text-white font-medium ${
            loading || !newCostCentre.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add Cost Centre"}
        </button>
      </div>

      {/* Display cost centres */}
      {filteredCentres.length === 0 ? (
        <p className="text-gray-500">No cost centres found for this plant.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCentres.map((cc) => (
            <div
              key={cc._id}
              className="bg-white p-4 rounded shadow border flex flex-col justify-between hover:shadow-lg transition"
            >
              <p
                onClick={() => handleNavigate(cc._id)}
                className="font-medium text-lg text-green-700 cursor-pointer hover:underline"
              >
                {cc.name}
              </p>
              <button
                onClick={() => deleteCostCentre(cc._id)}
                className="mt-4 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded self-end"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CostCentresPage;

