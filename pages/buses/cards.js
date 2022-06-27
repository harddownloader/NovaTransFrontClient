import React from 'react';
import SingleCard from "./singleCard";


const Cards = ({ buses=[] }) => {

  const markup =
    buses.length <= 0 ? (
      <h2>Рейс еще не запланирован</h2>
    ) : (
      <div className="cards">
        <div>
          {buses.length > 0 && buses.map(bus => (
            <SingleCard key={bus._id} bus={bus} />
          ))}
        </div>
      </div>
    );

  return markup;
};

export default Cards;
