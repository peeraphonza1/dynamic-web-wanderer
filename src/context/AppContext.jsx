
import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  selectedConcert: null,
  selectedSeats: [],
  tickets: [],
  auth: {
    user: null,
    isAuthenticated: false
  }
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_CONCERT':
      return {
        ...state,
        selectedConcert: action.payload
      };
    case 'ADD_SEAT':
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, action.payload]
      };
    case 'REMOVE_SEAT':
      return {
        ...state,
        selectedSeats: state.selectedSeats.filter(seat => seat.id !== action.payload)
      };
    case 'CLEAR_SEATS':
      return {
        ...state,
        selectedSeats: []
      };
    case 'ADD_TICKET':
      return {
        ...state,
        tickets: [...state.tickets, action.payload]
      };
    case 'LOGIN':
      return {
        ...state,
        auth: {
          user: action.payload,
          isAuthenticated: true
        }
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          user: null,
          isAuthenticated: false
        }
      };
    default:
      return state;
  }
};

// Create the context
const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
