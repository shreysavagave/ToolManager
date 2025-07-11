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
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
          🧭 Cost Centres
        </h1>
  
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search cost centre..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
  
        {/* Add cost centre */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter new cost centre name"
            value={newCostCentre}
            onChange={(e) => setNewCostCentre(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createCostCentre()}
            disabled={loading}
            className="flex-1 bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={createCostCentre}
            disabled={loading || !newCostCentre.trim()}
            className={`px-4 py-2 rounded font-semibold transition ${
              loading || !newCostCentre.trim()
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Adding..." : "Add Cost Centre"}
          </button>
        </div>
  
        {/* Display */}
        {filteredCentres.length === 0 ? (
          <p className="text-gray-400 text-center">No cost centres found for this plant.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCentres.map((cc) => (
              <div
                key={cc._id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
              >
                <p
                  onClick={() => handleNavigate(cc._id)}
                  className="font-medium text-lg text-green-300 hover:underline"
                >
                  {cc.name}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => deleteCostCentre(cc._id)}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default CostCentresPage;

