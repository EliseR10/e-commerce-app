import React from 'react';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

/*Import my files*/
import Welcome from './welcome';
import Home from './home';

const router = createBrowserRouter(createRoutesFromElements(
  <>
  {/* Wrap this Root Route to create Router here */}
  <Route path="/" element={ <Welcome/> }/>
  <Route path="/home" element={ <Home/> }/>
  </>
  
))

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
