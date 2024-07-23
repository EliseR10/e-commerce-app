import React from "react";

export const ContactForm = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  handleSubmit
  }) => {
  return (
    <Form onsubmit = {handleSubmit}>
      <input name = {name} onChange={(e) => setName(e.target.value)}>Name</input>
      <input 
        phone = {phone} 
        value = {phone} /*Binds the input's value to the phone state variable*/
        onChange={(e) => setPhone(e.target.value)} /*Update their state variables*/
        type = "tel" /*Specifies that it is for a phone number*/
        pattern = "^(\+[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$" 
        title = "Phone number should be in the format: 123-456-7890">Phone</input>
        {/*The title will be shown as error message to the user if the wrong pattern is entered*/}
      <input email = {email} onChange={(e) => setEmail(e.target.value)}>Email</input>
      <button onClick = {onSubmit}>Submit</button>
    </Form>
  );
};

