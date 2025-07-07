import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OperatorCostCentrePage = () => {
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
    navigate(`/operator/tools?costCentreId=${costCentreId}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Cost Centres</h1>

      <input
        type="text"
        placeholder="Search cost centres"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full  border p-2 rounded mb-4"
      />

      {filteredCentres.length === 0 ? (
        <p className="text-gray-500">No cost centres found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredCentres.map((cc) => (
            <div
              key={cc._id}
              className="bg-white p-4 rounded shadow border flex justify-between items-center cursor-pointer"
              onClick={() => handleNavigate(cc._id)}
            >
              <p className="font-medium text-blue-700 hover:underline">
                {cc.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OperatorCostCentrePage;
