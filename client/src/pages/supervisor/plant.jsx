import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SupervisorPlantPage = () => {
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
    navigate(`/supervisor/costcentres?plantId=${plantId}`);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Plants</h1>

      <input
        type="text"
        placeholder="Search plants"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {filteredPlants.length === 0 ? (
        <p className="text-gray-500">No plants found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlants.map((plant) => (
            <div
              key={plant._id}
              className="bg-white p-4 rounded shadow border cursor-pointer"
              onClick={() => handleNavigate(plant._id)}
            >
              <p className="font-medium text-lg text-blue-800 hover:underline">
                {plant.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupervisorPlantPage;
