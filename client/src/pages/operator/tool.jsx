import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OperatorToolsPage = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAge, setEditingAge] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const costCentreId = queryParams.get("costCentreId");

  const fetchTools = async () => {
    if (!costCentreId) return toast.error("Cost Centre ID not found");

    try {
      setLoading(true);
      const res = await axios.get(`/api/tools/${costCentreId}`);
      if (res.data.success) {
        setTools(res.data.data);
      } else {
        toast.error(res.data.error || "Failed to load tools");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error fetching tools");
    } finally {
      setLoading(false);
    }
  };

  const updateToolAge = async (id) => {
    const addedAge = parseInt(editingAge[id]);
    if (isNaN(addedAge) || addedAge <= 0) {
      return toast.error("Please enter a valid number greater than 0");
    }

    const tool = tools.find((t) => t._id === id);
    if (!tool) return toast.error("Tool not found");

    const newAge = tool.currentAge + addedAge;

    try {
      const res = await axios.put(`/api/tools/${id}`, {
        currentAge: newAge,
      });

      if (res.data.success) {
        toast.success("Tool life updated");
        setEditingAge({ ...editingAge, [id]: "" });
        fetchTools();
      } else {
        toast.error(res.data.error || "Failed to update age");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error updating age");
    }
  };

  useEffect(() => {
    fetchTools();
  }, [costCentreId]);

  const handleHistoryClick = (toolId) => {
    navigate(`/operator/tool-history/${toolId}`);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-400 text-center">
        Tool Management
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : tools.length === 0 ? (
        <p className="text-gray-400 text-center">No tools found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const percent = Math.min((tool.currentAge / tool.lifeSpan) * 100, 100);
            const barColor =
              percent < 70 ? "bg-green-500" : percent < 90 ? "bg-yellow-400" : "bg-red-500";

            return (
              <div
                key={tool._id}
                className="bg-gray-800 p-4 rounded-xl shadow border border-gray-700 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="w-full break-words whitespace-normal">
                    {tool.name}
                  </div>


                  <p className="text-sm text-gray-300">Life Span: {tool.lifeSpan}</p>
                  <p className="text-sm text-gray-300">Current Life: {tool.currentAge}</p>

                  <div className="w-full bg-gray-600 h-3 rounded mt-2">
                    <div className={`${barColor} h-3 rounded`} style={{ width: `${percent}%` }}></div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <input
                    type="number"
                    placeholder="Add Life"
                    value={editingAge[tool._id] || ""}
                    onChange={(e) =>
                      setEditingAge({ ...editingAge, [tool._id]: e.target.value })
                    }
                    className="border border-gray-600 bg-gray-900 text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => updateToolAge(tool._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm w-full"
                  >
                    Update Life
                  </button>
                  <button
                    onClick={() => handleHistoryClick(tool._id)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm w-full"
                  >
                    View History
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OperatorToolsPage;
