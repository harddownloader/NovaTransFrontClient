import fetch from "isomorphic-unfetch"
import { API } from "../utils/config"

// slug - string
// seats - array of strings
export const postSoldSeat = (slug, seats) => {
  return axios.post(`/bookings/sold/${slug}`, { seatNumber: JSON.stringify(seats) })
}

// slug - string
// body : {
//    name: string
//    phone: string
//    address: string
//    email: string
//    seatNumber: array(of strings) like string(because JSON.stringify(seatNumbers) )
// }
export const postBookSeat = async (slug, body) => {
  const resp = await fetch(`${API}/bookings/book/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  const response = await resp.json()
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
  const resp = await fetch(`${API}/bookings/milti-book/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  const response = await resp.json()
  return response
}
