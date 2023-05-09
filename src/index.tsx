import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from 'react-use-cart';
import { DataBaseProvider } from './context/db.context';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
/* Wrapping the `<App />` component with two context providers: `<CartProvider>` and
   `<DataBaseProvider>`. This allows the `<App />` component and its child components to access and
   use the state and functionality provided by these context providers. Specifically,
   `<CartProvider>` provides a shopping cart functionality using the `react-use-cart` library,
   while `<DataBaseProvider>` provides access to a database context. */
root.render(
  <React.StrictMode>
    <DataBaseProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </DataBaseProvider>
  </React.StrictMode>
);

