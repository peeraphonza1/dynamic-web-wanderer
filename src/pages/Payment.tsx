
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  
  const totalAmount = state.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  
  const handlePaymentCompleted = () => {
    // Here we would normally process payment, but for demo purposes we'll just navigate
    navigate('/ticket');
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Payment Details</h1>
      
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
            <CardDescription>
              {state.selectedConcert?.name} - {state.selectedSeats.length} seat(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Selected seats:</span>
                <span>
                  {state.selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total amount:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Payment Methods</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                    Credit Card
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-7h-2c0-1-1.5-1.5-1.5-1.5z" />
                      <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                      <path d="M16 11h0" />
                    </svg>
                    PayPal
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handlePaymentCompleted}>
              Complete Payment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
