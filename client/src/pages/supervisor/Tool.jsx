// src/pages/supervisor/SupervisorToolsPage.jsx

import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const SupervisorToolsPage = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState({}); // toolId: { currentAge }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const costCentreId = queryParams.get("costCentreId");

  const fetchTools = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/tools/${costCentreId}`);
      if (res.data.success) setTools(res.data.data);
      else toast.error(res.data.error || "Failed to fetch tools");
    } catch (err) {
      toast.error("Error fetching tools");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tool) => {
    setEditing({
      ...editing,
      [tool._id]: {
        currentAge: tool.currentAge,
      },
    });
  };

  const handleSave = async (toolId) => {
    const data = editing[toolId];
    const newAge = parseInt(data.currentAge);

    if (isNaN(newAge) || newAge < 0) {
      return toast.error("Enter a valid positive number");
    }

    try {
      const res = await axios.put(`/api/tools/${toolId}`, {
        currentAge: newAge,
      });
      if (res.data.success) {
        toast.success("Tool age updated");
        fetchTools();
        const updated = { ...editing };
        delete updated[toolId];
        setEditing(updated);
      } else toast.error("Failed to update");
    } catch (err) {
      toast.error("Error updating tool");
    }
  };

  

  useEffect(() => {
    fetchTools();
  }, [costCentreId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Tools</h1>

      {tools.length === 0 ? (
        <p className="text-gray-500">No tools found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const isEditing = editing[tool._id];
            const fillPercent = Math.min((tool.currentAge / tool.lifeSpan) * 100, 100);
            const fillColor = fillPercent >= 80 ? "bg-red-600" : "bg-green-600";

            return (
              <div key={tool._id} className="bg-white p-4 rounded shadow border space-y-3">
                <p className="font-bold text-lg">{tool.name}</p>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full ${fillColor}`}
                    style={{ width: `${fillPercent}%` }}
                  ></div>
                </div>

                <p className="text-sm">Life Span: {tool.lifeSpan}</p>
                <p className="text-sm">Current Age: {tool.currentAge}</p>

                {isEditing ? (
                  <>
                    <input
                      type="number"
                      value={isEditing.currentAge}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          [tool._id]: {
                            currentAge: e.target.value,
                          },
                        })
                      }
                      placeholder="New Age"
                      className="w-full border p-1 rounded"
                    />
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => handleSave(tool._id)}
                        className="bg-orange-600 text-white px-4 py-1 rounded hover:bg-orange-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          const updated = { ...editing };
                          delete updated[tool._id];
                          setEditing(updated);
                        }}
                        className="text-gray-500 hover:text-black"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => handleEdit(tool)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Edit Age
                    </button>
                    
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SupervisorToolsPage;
