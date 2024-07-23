import React from "react";
import { ContactPicker } from "../../components/contactPicker/ContactPicker";

const getTodayString = () => {
  const [month, day, year] = new Date()
    .toLocaleDateString("en-US")
    .split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const AppointmentForm = ({
  name,
  setName,
  contacts,
  title,
  setTitle,
  contact,
  setContact,
  date,
  setDate,
  time,
  setTime,
  handleSubmit
}) => {

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <input type="text" name={name} onChange={(e) => setName(e.target.value)}>Name</input>
      <input type= "date" date={date} onChange={(e) => setDate(e.target.value)} min={getTodayString()}>Date</input>
      <input type= "time" time={time} onChange={(e) => setTime(e.target.value)}>Time</input>
      <ContactPicker contacts={contacts}/>
      <button type="submit" onclick={onSubmit}>Submit</button>
    </Form>
    </>
  );
};
