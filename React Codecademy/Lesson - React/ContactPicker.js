import React from "react";

export const ContactPicker = ({contacts, value, name, onChange }) => {
  return (
    <>
    <select onChange={onChange} value= {value} name={name}>
      <option value="">No Contact Selected</option> {/*the value="" makes this option as default*/}
      {contacts.map((contact, index) => (
        <option key={index} value={contact.name}>{contact.name}</option>
      ))}
    </select>
    </>
  );
};