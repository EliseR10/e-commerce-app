import React from 'react';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

/*Import my files*/
import Welcome from './welcome';
import Home from './home';
import Cart from './cart';
import ThankYou from './thankYou';
import Account from './account';
import AddProduct from './addProduct';
import AdminAccount from './adminAccount';

const router = createBrowserRouter(createRoutesFromElements(
  <>
  {/* Wrap this Root Route to create Router here */}
  <Route path="/" element={ <Welcome/> }/>
  <Route path="/home" element={ <Home/> }/>
  <Route path="/cart" element={ <Cart/> }/>
  <Route path="/thankYou" element={ <ThankYou/> }/>
  <Route path="/account" element={ <Account/>} />
  <Route path="/addProduct" element={ <AddProduct/>} />
  <Route path="/adminAccount" element={ <AdminAccount/>} />
  </>
  
))

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
