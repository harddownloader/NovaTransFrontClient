import React, { useMemo } from 'react';
import SingleCard from "./singleCard";


const Cards = ({ buses: {oneWayTickets=[], returnTickets=[]} }) => {

  const returnTicket = useMemo(() => {
    returnTickets.length && returnTickets.length > 1
      ? returnTickets[0]
      : null
  }, [returnTickets])

  const markup =
    oneWayTickets.length <= 0 ? (
      <h2>Рейс еще не запланирован</h2>
    ) : (
      <div className="cards">
          {oneWayTickets.length > 0 && oneWayTickets.map(bus => (
            <div key={bus._id}>
              <SingleCard  bus={bus} />
              {returnTicket && <SingleCard key={bus._id} bus={returnTicket} />}
            </div>
          ))}
      </div>
    );

  return markup;
};

export default Cards;
