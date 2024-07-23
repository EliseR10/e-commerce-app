import React from "react";

export const Tile = ({name, description}) => {
    return (
      <div className="tile-container">
        <p name={name} className="tile-title"></p>
      {Object.values(description).map((value, index) => (
        <p key={index} className="tile">{value}</p>
      ))}
      </div>
    );
};

//Object.values(description) is used to create an array of the values from the description object. This is useful when you want to render the values without needing to know the keys.
//map() iterate over this array of values. For each value, it renders a p element with the class tile. The index from the map() function is used as the key prop for each p element, which is necessary for React to manage the list efficiently.
//This approach dynamically renders the contents of the description object, regardless of how nany properties it has or what they are named.
