
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, Building } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

const PaymentOptions = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('qr');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!state.selectedConcert || state.selectedSeats.length === 0) {
    navigate('/');
    return null;
  }

  const totalAmount = state.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Create ticket with the first selected seat
      const ticket = {
        id: uuidv4(),
        concertId: state.selectedConcert.id,
        concertName: state.selectedConcert.name,
        date: state.selectedConcert.date,
        seat: {
          id: state.selectedSeats[0].id,
          row: state.selectedSeats[0].row,
          number: state.selectedSeats[0].number,
          price: state.selectedSeats[0].price,
          status: 'unavailable' // In JavaScript, we don't need type assertions
        },
        price: totalAmount,
        paymentMethod: selectedPayment,
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAACQkJCNjY2RkZGUlJSYmJiamprX19f09PSlpaXn5+f6+vpAQEBZWVlpaWni4uK+vr5HR0ciIiLJycm0tLTs7OxsbGyBgYGdnZ3Pz89kZGTR0dFPT08PDw8WFhY7OztzgLJEAAAH9UlEQVR4nO2d65ayOgyGTwW0gOKAyEFFRZ3c/zUuZVg75AjS0mnYz3oz/WOxb3gSmmDfdjvFVYztOSl5t+egn8mf/u3Z6Gb40p+IhYhbXeOHZYSwl0E/rx/6GUWt0c8zHE+9/JJgHO6T5hMZjJNsNfZbF/Vj/yI8vScOvnXOQ+l7iXIwWR9CITRVCLfT6FtLW+N1tJaZlvw10e8GI7ewGF2F+Ij8IQtDEYSd8hk/49nBFIV4hP40q8jnxZ7NQmUlwX7yt2lVQr/jjZVgO5GfUm1lV8H2Ivb2sME5VDZgO4Hp2S1sP9tLEF7JT49WdVv7rNVnOEmbttEiGmcmLWzvbtxI86a7p3dWgHjhQ/FGtVLsxhHzZWgTbdwkGsU2iUmhWWMLLOmHTPdNtyHNlbYxwJI+FNrmbTCbwsFy/pYkCmHieFXkl+fCQmxp2c2QI9Q8I7YUDjYwGqHuCbOl8F0cIkJb2UvoLlK66xptA/f9Vwx1hPQ2nfP1B9RdbvA7WEZW7LdtKWzLLgr9sFP6O0n7RX73QfEVqhOJ2jSm6MWvGUMf4RBmqc8v5RekHQrYphV9hNhqvIbNKPrCfVpbEUc2A4WdWAo5IWoP2JwCQzX+KxzAT8eWQqitBP0tKWBcBrHc+cz9bN84/DOEYgtzUF5RUCjAjpQthdP7lD6EUojZFpx9pHkiIbRzFMMFwz26RliF/Gf7GylEf0zDQEjxjU7zCoPnBb9lw5BHqnvjOXQIQZGiQDfYIYTClUZCWHLvdANZHvqn+CzMnEZC8ICSY4NTKKLDTyNoHdFg+U2nOL7hdEPDLBrWMz9nQtx1rY5g3oRdNALDCt4FsxsafN++uyOe7iqcWBPCoFvDrghOIvq6ItyhtlVFVyNgbHg0JvyXQqzxVQw/Qx2voQUhwzpT9kOTLxpl7IUWFT5z8S1N4Pti49S+bIxcLG394UJExsXcwu+jWFMVnSz8FquBxe8sXG0g7nSnvNnWn0Xw0KYq/GK1bZM2Zxvt8Ye1mAkDRY5T4oDC+a5pAa6gBTbwMKdCrPOvLkREJzVe4WYPdUQZsXlqZOG90B4K0ORCXCj+jZCJwtlZjQ1v2VTsQCHmvO+BDxT6QCH6tnhVYQj/1LX8Q8F41+KiELeAkxpRyTa4nBCmhauGorKGwxNWYVz9gUzWYlQxcl3Kp9nIwRXCqyKF45+JwvwkIVXo9pUoLCU+JSjcZKeYKTwdDq4oFGvuCvGgmO+YKDy4rnB7ghf0j1OFdnJOj1CeF6VHw8K6K9yzqGKuDRXCBL3PhGw3zCp2P1dYvjjsCuPLYV24rnA71Lfwt77hVvyGQ01FfGqhELbAbVUKsXvLJT7N5tLN7dTKFcZIhJuJQhiH4BJfXqvKMaQdtfKohHpSNioPmEsGRTKyOcOLdJ1UyLU09/fwTON+b2hLTOiGvkLh4+g/ucE/bcMGTwzHXfqqELdQa1t5KPw/D//eOnRfoduLRudXm3hdOLw/rLseGTkGfxQ+Nt2cqEf/fMOB0wsL//0+xF1uLrbNCHOiw407mGiAeM5DLPnA3KUVhSLMb9W2rnDkZv0QV+/LNyavZkThxz1xeF+40SqG5VXpjdF2FeIuKjj2GxavO9RRCGNpXdmw3vNWCG8BvCvEh91UKG+hYx2FIMdgZ0jK59J4yxrPFzXZOF+U76eB+RTXGshWCF1P2TXDlbnQzLjgD+fC0m6FqQCPi4zCYZgLK3aMfvItXZr1YBv19z01n3Gw3o2TcEfwrZJNe/39w8odAa4XNvDBHF+xIwj2MUCv2JqB2NagI9gI//fljZHzXH23AKZLmKlbXsJDX/Qrn6ICMHLbzFdM+V5Q0FOF7SsMM+OMnXOCHO/9FpDe15FMuZaT8r3jAzKgOdwT+VqaUQPOUFmR54nZvhCfzR3S8R46KoHnDYGOqTlfuM/mvgDIhNPi3oEQp2p1QwXvfdXq/jkAIJeQdl+4QCZc330N6Rc/JvsSfjA+R8qTxwRB4A09eY4H9CUEHzC4wvbmGLxPhOrLdYDWUzQXR+LLd8H8jC7nB+1mHE6/KZDr4qB9OUOuL6jKeQM2QnUKq3ItVf91coDXheZaqmUqL9/7C/tqdLllWWGxCUJmtQDwH16U01hhuRCaU1oDwB5H5FPW1WWBk6UKsRTlWrwQWvscV0i9SbpyWWswLi9HtdF8Vdvtdl+1BmefWYWdZcOeVlVZP0CnV5Qr13YXOT/xFcP1v2dZF8hfwRmut8qpBHkRRcuaVwwAe9OHrdRXYwhbdnrQFVVP+hRd1SalcLWRf8nJ2npLn3V6yzpSfoq/w9pIpUeQGQrfunz2rWLG1TaLmpN4K2yP2nrsq2lZ+S3RYb07O/fplbYUB2HLu5+Y3pXouhZ7XbWjYVdxvMm9+Vfj9xCGxirvVU2E1x2Rde5I5eLGXFRDjZDPXaHnHJR5b/rw7gU1jR+Ue2fqYxuDuHlsELPUOfg1jSf63RV8rCMqP/Bm48VNucrqfHzLe9P1vjrdaIR0f6fJ2hPPXTQYj72npxfZ47HnfY+L00D0o0OXnl1ZoONH4TIYoeMo7I1zFJJxFPbGOQrJOAp74xyFZByFvXGOQjKOwt44RyEZR2FvnKOQjKOwN85RSIajsPk/XfCXd9SsHSUAAAAASUVORK5CYII=',
        status: 'confirmed' // In JavaScript, we don't need type assertions
      };
      
      dispatch({ type: 'ADD_TICKET', payload: ticket });
      dispatch({ type: 'CLEAR_SEATS' });
      
      setIsProcessing(false);
      navigate('/ticket');
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h1 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold mb-8 text-center"
        >
          Payment Channel
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div 
                onClick={() => setSelectedPayment('qr')}
                className={`p-4 flex flex-col items-center cursor-pointer transition-all ${
                  selectedPayment === 'qr' 
                    ? 'bg-brand-pink/10 border-2 border-brand-pink rounded-lg' 
                    : 'bg-white dark:bg-brand-darkGray border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md'
                }`}
              >
                <div className="p-3 bg-gray-100 dark:bg-black/30 rounded-lg mb-2">
                  <QrCode className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                </div>
                <p className="text-sm font-medium text-center">Scan QR</p>
              </div>

              <div 
                onClick={() => setSelectedPayment('bank')}
                className={`p-4 flex flex-col items-center cursor-pointer transition-all ${
                  selectedPayment === 'bank' 
                    ? 'bg-brand-pink/10 border-2 border-brand-pink rounded-lg' 
                    : 'bg-white dark:bg-brand-darkGray border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md'
                }`}
              >
                <div className="p-3 bg-gray-100 dark:bg-black/30 rounded-lg mb-2">
                  <Building className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                </div>
                <p className="text-sm font-medium text-center">Bank Transfer</p>
              </div>

              <div 
                onClick={() => setSelectedPayment('card')}
                className={`p-4 flex flex-col items-center cursor-pointer transition-all ${
                  selectedPayment === 'card' 
                    ? 'bg-brand-pink/10 border-2 border-brand-pink rounded-lg' 
                    : 'bg-white dark:bg-brand-darkGray border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md'
                }`}
              >
                <div className="p-3 bg-gray-100 dark:bg-black/30 rounded-lg mb-2">
                  <CreditCard className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                </div>
                <p className="text-sm font-medium text-center">True Money Wallet</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-brand-darkGray border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4 text-red-700">Ticket Details</h2>
              <div className="space-y-4 divide-y divide-gray-100 dark:divide-gray-700">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400">Seat</span>
                  <span className="font-medium">
                    {state.selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400">Seat Number</span>
                  <span className="font-medium">
                    {state.selectedSeats.length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400">Date</span>
                  <span className="font-medium">
                    {state.selectedConcert.date}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400">Artist</span>
                  <span className="font-medium">
                    {state.selectedConcert.name}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400">Price</span>
                  <span className="font-bold text-xl text-brand-red">
                    {totalAmount.toLocaleString()} BATH
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-8 text-center"
            >
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full md:w-auto px-8 py-3 bg-brand-pink text-white rounded-full font-medium transition-all ${
                  isProcessing ? "opacity-70 cursor-not-allowed" : "hover:bg-opacity-90 hover:shadow-lg active:scale-95"
                }`}
              >
                {isProcessing ? "Processing Payment..." : "Confirm Payment"}
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-1/3"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-brand-darkGray border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4">Payment Instructions</h2>
              
              {selectedPayment === 'qr' && (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">Scan the QR code below using your mobile banking app.</p>
                  <div className="flex justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white">
                    <img 
                      src="data:image/png;base64,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" 
                      alt="QR Code for payment" 
                      className="w-32 h-32"
                    />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>1. Open your mobile banking app</p>
                    <p>2. Select "Scan QR Code"</p>
                    <p>3. Aim your camera at the QR code above</p>
                    <p>4. Confirm the payment amount</p>
                    <p>5. Complete the payment</p>
                  </div>
                </div>
              )}
              
              {selectedPayment === 'bank' && (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">Please transfer the amount to our bank account:</p>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Bank:</span>
                      <span className="font-medium">Bangkok Bank</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Account Name:</span>
                      <span className="font-medium">Concert Tickets Co., Ltd.</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Account Number:</span>
                      <span className="font-medium">123-456-7890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Reference:</span>
                      <span className="font-medium">TICKET-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>1. Log in to your banking app or website</p>
                    <p>2. Choose "Transfer"</p>
                    <p>3. Enter the account details above</p>
                    <p>4. Add the reference number in the description</p>
                    <p>5. Complete the transfer</p>
                  </div>
                </div>
              )}
              
              {selectedPayment === 'card' && (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">Pay with True Money Wallet:</p>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Merchant:</span>
                      <span className="font-medium">Concert Tickets</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Wallet ID:</span>
                      <span className="font-medium">wallet-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Amount:</span>
                      <span className="font-medium text-brand-red">{totalAmount.toLocaleString()} BATH</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>1. Open your True Money Wallet app</p>
                    <p>2. Select "Pay"</p>
                    <p>3. Enter the Wallet ID above</p>
                    <p>4. Confirm the payment amount</p>
                    <p>5. Complete the payment</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
