import React, { useState } from "react";

import { AppointmentForm } from "../../components/appointmentForm/AppointmentForm";
import { TileList } from "../../components/tileList/TileList";

export const AppointmentsPage = ({appointments, contacts, addAppointment}) => {
  /*Define state variables for appointment info */
  const [name, setName] = useState("")
  const [selectedContact, setSelectedContact] = useState("");
  const [ date, setDate ] = useState("");
  const [ time, setTime ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /*Add contact info and clear data */
   addAppointment({name, contact: selectedContact, date, time});

   //Reset each field to its default state
   setName("");
   setSelectedContact("");
   setDate("");
   setTime("");
  };

  return (
    <div>
      <section>
        <h2>Add Appointment</h2>
        <AppointmentForm
          name = {name}
          contact = {selectedContact}
          date = {date}
          time = {time}
          handleSubmit = {handleSubmit}
        />
      </section>
      <hr />
      <section>
        <h2>Appointments</h2>
        <TileList appointments={appointments}/>
      </section>
    </div>
  );
};