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
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          🏭 Plant Management
        </h1>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search plant..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Create */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter new plant name"
            value={newPlantName}
            onChange={(e) => setNewPlantName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createPlant()}
            disabled={loading}
            className="flex-1 bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            onClick={createPlant}
            disabled={loading || !newPlantName.trim()}
            className={`px-4 py-2 rounded font-semibold transition ${
              loading || !newPlantName.trim()
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Adding..." : "Add Plant"}
          </button>
        </div>

        {/* Plant List */}
        {filteredPlants.length === 0 ? (
          <p className="text-gray-400 text-center">No plants found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlants.map((plant) => (
              <div
                key={plant._id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl p-5 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <div onClick={() => handleNavigate(plant._id)}>
                  <h2 className="text-lg font-semibold text-indigo-300 hover:underline">
                    {plant.name}
                  </h2>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => deletePlant(plant._id)}
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

export default DevPage;
