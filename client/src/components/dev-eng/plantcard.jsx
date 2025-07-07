import React from 'react';
import axios from '../../axios';
import { toast } from 'react-toastify';

const PlantCard = ({ plant, refreshPlants }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this plant?')) return;
    
    try {
      setLoading(true);
      const res = await axios.delete(`/plants/${plant._id}`);
      
      if (res.data.success) {
        toast.success('Plant deleted successfully');
        refreshPlants();
      } else {
        toast.error(res.data.error || 'Failed to delete plant');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete plant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-4 shadow-sm">
      <h3 className="text-xl font-semibold">{plant.name}</h3>
      <div className="mt-4 flex justify-end gap-2">
        <button 
          onClick={handleDelete}
          disabled={loading}
          className={`px-3 py-1 rounded ${
            loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
          } text-white`}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default PlantCard;
