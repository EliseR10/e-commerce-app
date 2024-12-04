import React from 'react';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

/*Import my files*/
import Welcome from './welcome';
import Home from './home';
import Cart from './cart';
import ThankYou from './thankYou';
import Account from './account';
import AddProduct from './addProduct';
import AdminAccount from './adminAccount';
import ModifyProduct from './modifyProduct';

const router = createBrowserRouter(createRoutesFromElements(
    <>
  {/* Wrap this Root Route to create Router here */}
  <Route path="/" element={ <Welcome/> }/>
  <Route path="/home" element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>
  <Route path="/cart" element={<ProtectedRoute> <Cart/> </ProtectedRoute>}/>
  <Route path="/thankYou" element={<ProtectedRoute> <ThankYou/> </ProtectedRoute>}/>
  <Route path="/account" element={<ProtectedRoute> <Account/> </ProtectedRoute>} />
  <Route>
    <Route path="/adminAccount" element={<ProtectedRoute> <AdminAccount/> </ProtectedRoute>} />
    <Route path="/addProduct" element={<ProtectedRoute>  <AddProduct/> </ProtectedRoute>} />
    <Route path="/modifyProduct/:id" element={<ProtectedRoute> <ModifyProduct/> </ProtectedRoute>} />
  </Route>
    </>
))

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;
