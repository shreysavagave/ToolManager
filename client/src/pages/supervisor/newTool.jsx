import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";


const SupervisorToolsPagenew = () => {
  const [tools, setTools] = useState([]);
  const [toolName, setToolName] = useState("");
  const [lifeSpan, setLifeSpan] = useState("");
  const [loading, setLoading] = useState(false);
  const [editToolId, setEditToolId] = useState(null);
  const [editValues, setEditValues] = useState({ currentAge: "", lifeSpan: "" });

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

  const createTool = async () => {
    if (!toolName.trim() || !lifeSpan.trim()) {
      return toast.error("Tool name and life span are required");
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/tools", {
        name: toolName.trim(),
        lifeSpan: parseInt(lifeSpan),
        currentAge: 0,
        costCentreId,
      });

      if (res.data.success) {
        toast.success("Tool added");
        setToolName("");
        setLifeSpan("");
        fetchTools();
      } else {
        toast.error(res.data.error || "Failed to add tool");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error adding tool");
    } finally {
      setLoading(false);
    }
  };

  const deleteTool = async (id) => {
    try {
      const res = await axios.delete(`/api/tools/${id}`);
      if (res.data.success) {
        toast.success("Tool deleted");
        fetchTools();
      } else {
        toast.error(res.data.error || "Failed to delete");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error deleting tool");
    }
  };

  const updateTool = async (id) => {
    const { currentAge, lifeSpan } = editValues;

    if (
      currentAge === "" ||
      lifeSpan === "" ||
      isNaN(currentAge) ||
      isNaN(lifeSpan)
    ) {
      return toast.error("Please enter valid numbers");
    }

    try {
      const res = await axios.put(`/api/tools/${id}`, {
        currentAge: parseInt(currentAge),
        lifeSpan: parseInt(lifeSpan),
      });

      if (res.data.success) {
        toast.success("Tool updated");
        setEditToolId(null);
        setEditValues({ currentAge: "", lifeSpan: "" });
        fetchTools();
      } else {
        toast.error(res.data.error || "Failed to update tool");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error updating tool");
    }
  };

  const getBarColor = (percent) => {
    if (percent < 70) return "bg-green-500";
    if (percent < 90) return "bg-yellow-500";
    return "bg-red-500";
  };

  useEffect(() => {
    fetchTools();
  }, [costCentreId]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-700 text-center">Tools Management</h1>

      {/* Add Tool Form */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Tool Name"
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
          className="w-full md:w-auto flex-1 border p-2 rounded"
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Tool Life Span"
          value={lifeSpan}
          onChange={(e) => setLifeSpan(e.target.value)}
          className="w-full md:w-auto flex-1 border p-2 rounded"
          disabled={loading}
        />
        <button
          onClick={createTool}
          disabled={loading || !toolName.trim() || !lifeSpan.trim()}
          className={`px-4 py-2 rounded text-white w-full md:w-auto ${loading || !toolName.trim() || !lifeSpan.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
            }`}
        >
          {loading ? "Adding..." : "Add Tool"}
        </button>
      </div>

      {/* Tool List */}
      {tools.length === 0 ? (
        <p className="text-center text-gray-500">No tools found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const percentUsed = Math.min((tool.currentAge / tool.lifeSpan) * 100, 100);
            const barColor = getBarColor(percentUsed);

            return (
              <div key={tool._id} className="bg-white p-4 rounded shadow border space-y-2">
                <p className="font-semibold text-lg text-purple-800">{tool.name}</p>

                {/* Progress Bar */}
                <div className="text-sm text-gray-600">
                  Life Span: {tool.lifeSpan} | Current Age: {tool.currentAge}
                </div>
                <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
                  <div
                    className={`${barColor} h-full`}
                    style={{ width: `${percentUsed}%` }}
                  ></div>
                </div>

                {editToolId === tool._id ? (
                  <div className="flex flex-col gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Edit Tool Name"
                      value={editValues.name}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="border p-2 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Edit Current Age"
                      value={editValues.currentAge}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, currentAge: e.target.value }))
                      }
                      className="border p-2 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Edit Life Span"
                      value={editValues.lifeSpan}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, lifeSpan: e.target.value }))
                      }
                      className="border p-2 rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateTool(tool._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditToolId(null);
                          setEditValues({ name: "", currentAge: "", lifeSpan: "" });
                        }}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        setEditToolId(tool._id);
                        setEditValues({
                          name: tool.name,
                          currentAge: tool.currentAge,
                          lifeSpan: tool.lifeSpan,
                        });
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTool(tool._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
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

export default SupervisorToolsPagenew;
