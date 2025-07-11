// src/pages/operator/ToolsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const OperatorToolsPage = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAge, setEditingAge] = useState({});

  const location = useLocation();
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
    const newAge = editingAge[id];
    if (!newAge || isNaN(newAge)) {
      return toast.error("Please enter a valid number");
    }
  
    const tool = tools.find((t) => t._id === id);
    if (!tool) return toast.error("Tool not found");
  
    if (parseInt(newAge) < tool.currentAge) {
      return toast.error("Age cannot be decreased");
    }
  
    try {
      const res = await axios.put(`/api/tools/${id}`, {
        currentAge: parseInt(newAge),
      });
  
      if (res.data.success) {
        toast.success("Tool age updated");
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

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">Tool Management</h1>
  
      {tools.length === 0 ? (
        <p className="text-gray-400">No tools found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const percent = Math.min((tool.currentAge / tool.lifeSpan) * 100, 100);
            const barColor =
              percent < 70 ? "bg-green-500" : percent < 90 ? "bg-yellow-400" : "bg-red-500";
  
            return (
              <div
                key={tool._id}
                className="bg-gray-800 p-4 rounded shadow border border-gray-700 space-y-2"
              >
                <p className="font-semibold text-lg text-indigo-300">{tool.name}</p>
                <p className="text-sm text-gray-300">Life Span: {tool.lifeSpan}</p>
                <p className="text-sm text-gray-300">Life: {tool.currentAge}</p>
  
                <div className="w-full bg-gray-600 h-3 rounded">
                  <div
                    className={`${barColor} h-3 rounded`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
  
                <div className="flex gap-2 mt-2">
                  <input
                    type="number"
                    placeholder="New Life"
                    value={editingAge[tool._id] || ""}
                    onChange={(e) =>
                      setEditingAge({ ...editingAge, [tool._id]: e.target.value })
                    }
                    className="border border-gray-600 bg-gray-900 text-white p-1 rounded w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => updateToolAge(tool._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Update Life
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
