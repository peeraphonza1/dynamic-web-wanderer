
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { generateSeatData } from '@/utils/animations';
import { Seat } from '@/types';

const SeatSelection: React.FC = () => {
  const { state, dispatch } = useApp();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [seats, setSeats] = React.useState<Seat[]>([]);

  React.useEffect(() => {
    // Generate seat data when component mounts
    const generatedSeats = generateSeatData().map(seat => ({
      ...seat,
      status: seat.status === 'unavailable' ? 'unavailable' : 'available'
    }));
    setSeats(generatedSeats);

    // Clear previously selected seats
    dispatch({ type: 'CLEAR_SEATS' });
  }, [dispatch]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'unavailable') return;

    // Create a new array with updated seat status
    const updatedSeats = seats.map(s => {
      if (s.id === seat.id) {
        const newStatus = s.status === 'selected' ? 'available' : 'selected';
        return { ...s, status: newStatus };
      }
      return s;
    });
    
    setSeats(updatedSeats);

    // Update selected seats in context
    const clickedSeat = updatedSeats.find(s => s.id === seat.id);
    if (clickedSeat) {
      if (clickedSeat.status === 'selected') {
        dispatch({ type: 'ADD_SEAT', payload: clickedSeat });
      } else {
        dispatch({ type: 'REMOVE_SEAT', payload: clickedSeat.id });
      }
    }
  };

  const handleProceedToPayment = () => {
    if (state.selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to continue",
        variant: "destructive"
      });
      return;
    }
    
    navigate('/payment');
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-gray-200 hover:bg-blue-200 cursor-pointer';
      case 'unavailable':
        return 'bg-gray-500 cursor-not-allowed';
      case 'selected':
        return 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {state.selectedConcert?.name || 'Concert'} - Select Your Seats
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Stage representation */}
          <div className="w-full bg-gray-800 text-white text-center py-4 mb-8 rounded-lg">
            STAGE
          </div>

          {/* Seat map */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {seats.map((seat) => (
              <div
                key={seat.id}
                className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${getSeatColor(seat.status)}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.row}{seat.number}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded-sm mr-2"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-500 rounded-sm mr-2"></div>
              <span>Unavailable</span>
            </div>
          </div>
        </CardContent>

        <Separator className="my-2" />

        {/* Selected seats summary */}
        <CardContent>
          <h3 className="font-semibold mb-2">Selected Seats ({state.selectedSeats.length})</h3>
          {state.selectedSeats.length > 0 ? (
            <div className="space-y-2">
              {state.selectedSeats.map((seat) => (
                <div key={seat.id} className="flex justify-between">
                  <span>Seat {seat.row}{seat.number}</span>
                  <span>฿{seat.price.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>฿{state.selectedSeats.reduce((sum, seat) => sum + seat.price, 0).toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No seats selected yet</p>
          )}
        </CardContent>

        <CardFooter>
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SeatSelection;
