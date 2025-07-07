import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DevPage = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [newPlantName, setNewPlantName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/plants");
      if (res.data.success) {
        setPlants(res.data.data);
        setFilteredPlants(res.data.data);
      } else {
        toast.error(res.data.error || "Failed to load plants");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error fetching plants");
    } finally {
      setLoading(false);
    }
  };

  const createPlant = async () => {
    const name = newPlantName.trim();
    if (!name) return toast.error("Plant name cannot be empty");
    try {
      setLoading(true);
      const res = await axios.post("/api/plants", { name });
      if (res.data.success) {
        toast.success("Plant created");
        setNewPlantName("");
        fetchPlants();
      } else {
        toast.error(res.data.error || "Failed to create plant");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error creating plant");
    } finally {
      setLoading(false);
    }
  };

  const deletePlant = async (id) => {
    try {
      const res = await axios.delete(`/api/plants/${id}`);
      if (res.data.success) {
        toast.success("Plant deleted");
        fetchPlants();
      } else {
        toast.error(res.data.error || "Failed to delete plant");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error deleting plant");
    }
  };

  const handleNavigate = (plantId) => {
    navigate(`/dev-eng/costcentres?plantId=${plantId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = plants.filter((plant) =>
      plant.name.toLowerCase().includes(value)
    );
    setFilteredPlants(filtered);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Plant Management
      </h1>

      {/* Search bar */}
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Search plant..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Create plant form */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter new plant name"
          value={newPlantName}
          onChange={(e) => setNewPlantName(e.target.value)}
          className="w-full sm:w-auto flex-1 border p-2 rounded"
          onKeyDown={(e) => e.key === "Enter" && createPlant()}
          disabled={loading}
        />
        <button
          onClick={createPlant}
          disabled={loading || !newPlantName.trim()}
          className={`w-full sm:w-auto px-4 py-2 rounded text-white font-medium ${
            loading || !newPlantName.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Plant"}
        </button>
      </div>

      {/* Plant cards */}
      {filteredPlants.length === 0 ? (
        <p className="text-gray-500">No plants found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlants.map((plant) => (
            <div
              key={plant._id}
              className="bg-white p-4 rounded shadow-md border hover:shadow-lg transition duration-200"
            >
              <div
                className="cursor-pointer"
                onClick={() => handleNavigate(plant._id)}
              >
                <p className="font-semibold text-lg text-blue-800 hover:underline">
                  {plant.name}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => deletePlant(plant._id)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevPage;
