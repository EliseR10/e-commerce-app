import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom"
import Root, { ROUTES } from "./components/root/Root";
import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";
import { useState, useEffect } from 'react';

function App() {
  /* Define state variables for contacts and appointments */
  //State variables for contact
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phone, setPhone ] = useState("");

  //State variables for appointments
  const [ date, setDate ] = useState("");
  const [ time, setTime ] = useState("");
  
  //Arrays of objects for contact and appointments
  const [contact, setContact] = useState ([]);
  const [appointments, setAppointments] = useState ([]);

  /* Implement functions to add data to contacts and appointments */
  const addContact = (name, phone, email) => {
    const person = {
      name: name,
      email: email,
      phone: phone
    };
//updating the contact state by adding a new contact to the existing list
//prevContact represent the current list of contact
//...prevContact spreads out all current contacts in the new array
//newContacts is the new contact to be added
//This creates a new array with all previous contacts plus the new one and updates the contact state with this array
setContact(prevContact => [...prevContact, newContacts]);
  };

  const addAppointment = (name, contact, date, time) => {
    const apt = {
      name: name,
      contact: contact,
      date: date,
      time: time
    };
    setAppointments(prevAppointment => [...prevAppointment, apt]);
  };
    
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root/> }>
      <Route index element={ <Navigate to={ROUTES.CONTACTS} replace/> }/>
      {/*That's how you add props below (contact and add contact)*/}
      <Route path={ROUTES.CONTACTS} element={ <ContactsPage contact={contact} addContact={addContact} />}/> 
      <Route path={ROUTES.APPOINTMENTS} element={ <AppointmentsPage appointments={appointments} addAppointment={addAppointment}/> } />
    </Route>
  ));
  
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
