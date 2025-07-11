import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SupervisorCostCentrePage = () => {
  const [costCentres, setCostCentres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const plantId = queryParams.get("plantId");

  const fetchCostCentres = async () => {
    if (!plantId) return toast.error("Plant ID not found");

    try {
      const res = await axios.get(`/api/costcentres/${plantId}`);
      if (res.data.success) {
        setCostCentres(res.data.data);
      } else {
        toast.error(res.data.error || "Failed to fetch cost centres");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error fetching cost centres");
    }
  };

  useEffect(() => {
    fetchCostCentres();
  }, [plantId]);

  const filteredCentres = costCentres.filter((cc) =>
    cc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigate = (costCentreId) => {
    navigate(`/supervisor/tools?costCentreId=${costCentreId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-400">🏭 Cost Centres</h1>
  
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search cost centres"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 text-white p-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
  
        {/* Cost Centres List */}
        {filteredCentres.length === 0 ? (
          <p className="text-gray-400 text-center">No cost centres found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filteredCentres.map((cc) => (
              <div
                key={cc._id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow hover:shadow-lg cursor-pointer transition"
                onClick={() => handleNavigate(cc._id)}
              >
                <p className="text-lg font-semibold text-green-300 hover:underline">
                  {cc.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default SupervisorCostCentrePage;
