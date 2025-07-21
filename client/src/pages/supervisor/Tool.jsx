import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SupervisorToolsPage = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleChangeTool = async (toolId, currentAge) => {
    if (currentAge === 0) {
      return toast.info("Tool is already at age 0");
    }

    const confirm = window.confirm("Are you sure you want to change this tool? This will reset its life to 0 and record history.");
    if (!confirm) return;

    try {
      const res = await axios.put(`/api/tools/${toolId}`, {
        currentAge: 0,
      });
      if (res.data.success) {
        toast.success("Tool changed and life reset to 0");
        fetchTools();
      } else {
        toast.error("Failed to change tool");
      }
    } catch (err) {
      toast.error("Error changing tool");
    }
  };

  const handleHistoryClick = (toolId) => {
    navigate(`/supervisor/tool-history/${toolId}`);
  };

  useEffect(() => {
    fetchTools();
  }, [costCentreId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-orange-400 text-center">🧰 Tools</h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading tools...</p>
        ) : tools.length === 0 ? (
          <p className="text-center text-gray-400">No tools found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const fillPercent = Math.min((tool.currentAge / tool.lifeSpan) * 100, 100);
              const fillColor = fillPercent >= 80 ? "bg-red-600" : "bg-green-600";

              return (
                <div
                  key={tool._id}
                  className="bg-white/10 backdrop-blur p-4 rounded-xl shadow border border-white/10 space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <p className="font-semibold text-lg text-white">{tool.name}</p>
                    <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mt-2">
                      <div
                        className={`${fillColor} h-full transition-all duration-300`}
                        style={{ width: `${fillPercent}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">Life Span: {tool.lifeSpan}</p>
                    <p className="text-sm text-gray-300">Current Age: {tool.currentAge}</p>
                  </div>

                  <div className="flex justify-between gap-2 mt-4">
                    <button
                      onClick={() => handleChangeTool(tool._id, tool.currentAge)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Change Tool
                    </button>
                    <button
                      onClick={() => handleHistoryClick(tool._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
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
    </div>
  );
};

export default SupervisorToolsPage;
