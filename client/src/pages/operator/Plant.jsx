import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OperatorPlantPage = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchPlants = async () => {
    try {
      const res = await axios.get("/api/plants");
      if (res.data.success) {
        setPlants(res.data.data);
      } else {
        toast.error(res.data.error || "Failed to fetch plants");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Server error while fetching plants");
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleNavigate = (plantId) => {
    navigate(`/operator/costcentres?plantId=${plantId}`);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-400 text-center">🏭 Plants</h1>
  
        <input
          type="text"
          placeholder="Search plants"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-600 bg-gray-800 text-white p-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
  
        {filteredPlants.length === 0 ? (
          <p className="text-gray-400 text-center">No plants found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlants.map((plant) => (
              <div
                key={plant._id}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer hover:border-blue-500"
                onClick={() => handleNavigate(plant._id)}
              >
                <p className="font-medium text-lg text-white hover:underline">
                  {plant.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default OperatorPlantPage;
