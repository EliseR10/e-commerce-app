import React, { useState, useEffect } from "react";

import { ContactForm } from "../../components/contactForm/ContactForm";
import { TileList } from "../../components/tileList/TileList";

//Extract the array of contacts and the callback so you can use it in your current file
export const ContactsPage = ({contact, addContact}) => {
  
  /*Define state variables for contact info and duplicate check*/
const [info, setInfo] = useState("");
const [isDuplicate, setIsDuplicate] = useState(false);
const [ name, setName ] = useState("");
const [ email, setEmail ] = useState("");
const [ phone, setPhone ] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    /*Add contact info and clear data if the contact name is not a duplicate*/

    //contact.some(contact => contact.name === name) checks if there is at least one contact in the contacts array whose name property matches the current name state variable. It returns true if such a contact exists, and false otherwise.
    //isDuplicate(nameExists) updates the isDuplicate state variable based on whether a duplicate name was found.
    //the useEffect hook runs every time the name state variable or the contacts array changes, ensuring that the duplicate check is always up to date with the latest input and contacts list
    useEffect(() => {
      const nameExists = contact.some(contact => contact.name === name);
      setIsDuplicate(nameExists);
    }, [name, contact]);

    if (!isDuplicate) {
      addContact({name, phone, email});
      //Reset each field to its default state
      setName("");
      setPhone("");
      setEmail("");
    }
  };

  /* Using hooks, check for contact name in the contacts array variable in props */

  //Local state variables are my state variables defined above (name, email,. phone)
  //Local state variable setter functions are setName, setPhone, setEmail
  //This setup allows ContactForm to be a controlled component, meaning its form inputs are controlled by the state in ContactsPage, and it can notify ContactsPage of changes through the setter functions and submission through handleSubmit.
  return (
    <div>
      <section>
        <h2>Add Contact</h2> 
      <ContactForm 
        name = {name}
        email = {email}
        phone = {phone}
        setName = {setName}
        setEmail = {setEmail}
        setPhone = {setPhone}
        handleSubmit = {handleSubmit}
      />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList contacts={contact}/>
        {/*pass the contact prop to TileList*/}
      </section>
    </div>
  );
};
