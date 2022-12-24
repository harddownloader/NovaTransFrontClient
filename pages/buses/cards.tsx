import React, { useState, useMemo } from 'react'
import SingleCard from "./singleCard"
import { Typography } from '@mui/material'
import classes from './cards.module.scss'

const Cards = ({ 
  buses
}) => {
  const oneWayTickets = buses?.oneWayTickets
  const returnTickets = buses?.returnTickets
  const [ticketsOrder, setTicketsOrder] = useState({
    oneWayTicketsOrder: null,
    oneWayTicketsSelectedId: null,
    returnTicketsOrder: null,
    returnTicketsSelectedId: null,
  })

  const handleOneWayTicketsBook = (id, order) => {
    if (!order) id = null
    setTicketsOrder({
      ...ticketsOrder,
      oneWayTicketsOrder: order,
      oneWayTicketsSelectedId: id,
    })
  }

  const handleReturnTicketsBook = (id, order) => {
    if (!order) id = null
    setTicketsOrder({
      ...ticketsOrder,
      returnTicketsOrder: order,
      returnTicketsSelectedId: id,
    })
  }

  const sortByDateTime = (first, second) => {
    if(
      first?.wayStations &&
      Array.isArray(first.wayStations) &&
      first.wayStations.length &&
      second?.wayStations &&
      Array.isArray(second.wayStations) &&
      second.wayStations.length
    ) {
      const firstStart = first.wayStations[0]
      const secondStart = second.wayStations[0]

      const firstDateTime = new Date(`${firstStart.date}T${firstStart.time}:00`)
      const secondDateTime = new Date(`${secondStart.date}T${secondStart.time}:00`)

      return firstDateTime > secondDateTime ? 1 : -1
    }

    return 0
  }

  const isOweWayTickets = Boolean(oneWayTickets && oneWayTickets.length)
  const isReturnTickets = Boolean(returnTickets && returnTickets.length)

  return (
    <>
    {
      !isOweWayTickets ? (
        <Typography
          variant="h5"
          className={classes.sub_heading}
          gutterBottom
          component="h2"
        >
          Рейс еще не запланирован
        </Typography>
      ) : (
        <div className="cards">
          {<Typography
            variant="h5"
            className={classes.sub_heading}
            gutterBottom
            component="h2"
          >
            Билеты в одну сторону
          </Typography>}
          {oneWayTickets && oneWayTickets.filter((ticket) => {
              if (ticketsOrder?.oneWayTicketsSelectedId) {
                if (ticketsOrder.oneWayTicketsSelectedId === ticket._id) return true
                else return false
              }
              return true
            })
            .sort(sortByDateTime)
            .map((ticket) => (
              <SingleCard
                key={ticket._id}
                bus={ticket}
                isReturnTicket={false}
                searchingWithReturnTicket={isReturnTickets}
                orders={ticketsOrder}
                handleBook={handleOneWayTicketsBook.bind(this, ticket._id)}
              />
            ))}
  
          {returnTickets && <Typography
            variant="h5"
            className={classes.sub_heading}
            gutterBottom
            component="h2"
          >
            Обратный билет
          </Typography>}
          { returnTickets &&
            returnTickets.length === 0 &&
            <Typography
              variant="h6"
              gutterBottom
              component="div"
            >
              Рейс еще не запланирован
            </Typography>}
          {isReturnTickets && returnTickets && returnTickets.filter((ticket) => {
              if (ticketsOrder?.returnTicketsSelectedId) {
                if (ticketsOrder.returnTicketsSelectedId === ticket._id) return true
                else return false
              }
              return true
            })
            .sort(sortByDateTime)
            .map((ticket) => (
            <SingleCard
              key={ticket._id}
              bus={ticket}
              isReturnTicket={true}
              searchingWithReturnTicket={isReturnTickets}
              orders={ticketsOrder}
              handleBook={handleReturnTicketsBook.bind(this, ticket._id)}
            />
          ))}
        </div>
      )
    }
    </>
  )
}

export default Cards
