import fetch from "isomorphic-unfetch"
import { API } from "@/utils/const"

export const getBookingById = async (bookingId: string) => {
  const booking = await fetch(`${API}/bookings/${bookingId}`)
    .then((data) => data.json())
    .catch((e) => {
      console.warn(e)
      return null
    })

  return booking
}

// slug - string
// seats - array of strings
export const postSoldSeat = async (slug: string, seats) => {
  console.warn('postSoldSeat hasn\'t been tested before');
  const response = await fetch(`/bookings/sold/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ seatNumber: seats })
  }).then((data) => data.json())

  return response
}

// slug - string
// body : {
//    name: string
//    phone: string
//    address: string
//    email: string
//    seatNumber: array(of strings) like string(because JSON.stringify(seatNumbers) )
// }
export const postBookSeat = async (slug: string, body) => {
  const response = await fetch(`${API}/bookings/book/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((data) => data.json())

  return response
}

/**
 * 
 * @param {Object} body 
 * @returns 
 * 
 * body: {
 *  userauth?
 *  
 *  name: 'John',
 *  email: 'john@gmail.com',
 *  phone: 1823673827712,
 *  address: 'Lendersa 8'
 *  tickets: [
 *    {
 *      seats: ['A1', 'A2'],
 *      slug: 'toronto-boston'
 *    }
 *  ]
 * }
 */
export const postMultiBookSeat = async (body) => {
  const response = await fetch(`${API}/bookings/milti-book/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((data) => data.json())

  return response
}
