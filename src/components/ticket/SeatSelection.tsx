
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Seat } from '@/types';
import { useApp } from '@/context/AppContext';
import { generateSeatData } from '@/utils/animations';
import { motion } from 'framer-motion';

const SeatSelection: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state.selectedConcert) {
      navigate('/');
      return;
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      const generatedSeats = generateSeatData();
      setSeats(generatedSeats);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [state.selectedConcert, navigate]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'unavailable') return;

    if (seat.status === 'available') {
      const updatedSeat = { ...seat, status: 'selected' };
      setSeats(seats.map(s => (s.id === seat.id ? updatedSeat : s)));
      dispatch({ type: 'ADD_SEAT', payload: updatedSeat });
    } else {
      const updatedSeat = { ...seat, status: 'available' };
      setSeats(seats.map(s => (s.id === seat.id ? updatedSeat : s)));
      dispatch({ type: 'REMOVE_SEAT', payload: seat.id });
    }
  };

  const handleSubmit = () => {
    navigate('/payment');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 bg-gray-200 rounded mx-auto"></div>
          <div className="h-64 w-80 bg-gray-200 rounded mx-auto"></div>
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  // Get price categories
  const priceCategories = [...new Set(seats.map(seat => seat.price))].sort((a, b) => b - a);

  return (
    <div className="pt-24 pb-16 bg-brand-black min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-red-600 rounded-lg p-4 mb-8 flex justify-between items-center flex-wrap gap-4"
        >
          {priceCategories.map((price) => (
            <div key={price} className="flex items-center space-x-4">
              <div 
                className={`w-12 h-12 rounded-full ${
                  price === 2000 ? 'bg-brand-green' : price === 1800 ? 'bg-brand-yellow' : 'bg-brand-blue'
                } flex items-center justify-center text-white font-bold`}
              />
              <span className="text-white font-bold">{price.toLocaleString()} BATH</span>
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="py-6 px-12 bg-brand-red text-white font-bold uppercase text-2xl inline-block mx-auto">
            STAGE
          </div>
          <div className="w-full h-0.5 bg-red-600 mt-2 rounded-full" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-10"
        >
          {Object.entries(seatsByRow).map(([row, rowSeats]) => (
            <div key={row} className="flex items-center justify-center mb-4">
              <div className="text-white font-bold mr-4">{row}</div>
              <div className="flex flex-wrap justify-center gap-2">
                {rowSeats.map((seat) => (
                  <div
                    key={seat.id}
                    onClick={() => handleSeatClick(seat)}
                    className={`seat w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      seat.status === 'available'
                        ? seat.price === 2000
                          ? 'bg-brand-green'
                          : seat.price === 1800
                          ? 'bg-brand-yellow'
                          : 'bg-brand-blue'
                        : seat.status === 'selected'
                        ? 'seat-selected'
                        : 'seat-unavailable'
                    }`}
                  >
                    {seat.status === 'selected' ? (
                      <Check size={18} className="text-brand-pink" />
                    ) : seat.status === 'unavailable' ? (
                      <X size={18} className="text-white" />
                    ) : (
                      seat.number
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-6 border border-red-600 rounded-lg flex justify-between items-center mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-white font-bold">
              <Check size={18} className="text-white" />
            </div>
            <span className="text-white font-medium">Selected seat</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center">
              <X size={18} className="text-white" />
            </div>
            <span className="text-white font-medium">Unavailable seat</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={handleSubmit}
            disabled={state.selectedSeats.length === 0}
            className={`px-8 py-3 rounded-full text-white font-medium ${
              state.selectedSeats.length > 0
                ? 'bg-brand-pink hover:bg-opacity-90 hover:shadow-lg active:scale-95'
                : 'bg-gray-400 cursor-not-allowed'
            } transition-all`}
          >
            {state.selectedSeats.length > 0 
              ? 'Proceed to Payment' 
              : 'Please select at least one seat'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SeatSelection;
