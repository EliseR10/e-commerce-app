import React from "react";
import {Tile} from "../../components/tile/Tile"

export const TileList = ({contacts}) => {
  return (
    <div>
      {/*Use contact to access the current contact's data
      Use index as a key or part of a key for each child in the list
      The rest parameter syntax (...rest) allows you to collect the remaining properties of an object into another object*/}

      {contacts.map(({name, ...description}, index) => (
        <li key={index}>
          <h2>{name}</h2>
          <p>{description.detail}</p>
        </li>
      ))}
      {/*key prop essential for list items in react. It helps React iodentify which items have changed, are added or are 
      removed, which can improve performance and prevent bugs. Using index as a key is generally acceptable when the list 
      is static and does not change order, but it's recommended to use unique identifiers if available.*/}
    </div>
  );
};
