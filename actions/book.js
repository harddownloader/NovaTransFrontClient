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
