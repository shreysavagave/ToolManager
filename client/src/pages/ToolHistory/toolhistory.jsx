import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-toastify";

const ToolHistoryPage = () => {
  const { id: toolId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`/api/tools/history/${toolId}`);
        setHistory(res.data.data); // ✅ fix is here
      } catch (err) {
        console.error("Error fetching tool history:", err);
        toast.error("Error fetching tool history");
      }
    };
    if (toolId) fetchHistory();
  }, [toolId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl text-orange-400 mb-6 text-center">🕓 Tool History</h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-400">No history available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-white/10">
            <thead className="bg-white/10">
              <tr>
                <th className="p-2 border-b border-white/10">#</th>
                <th className="p-2 border-b border-white/10">Previous life</th>
                <th className="p-2 border-b border-white/10">Updated By</th>
                <th className="p-2 border-b border-white/10">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h._id} className="text-center border-t border-white/10">
                  <td className="p-2">{h.serialNo}</td>
                  <td className="p-2">{h.previousValue?.currentAge ?? "N/A"}</td>
                  <td className="p-2">{h.updatedBy?.username || "N/A"}</td>
                  <td className="p-2">{new Date(h.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ToolHistoryPage;
