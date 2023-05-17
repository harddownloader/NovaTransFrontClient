import fetch from "isomorphic-unfetch"
import { API } from "@/utils/const"
import queryString from "query-string"
import { ISearchForm } from "@/interfaces/searchform"

export const getAllLocations = async () => {
  const response = await fetch(`${API}/locations`).then((data) => data.json())

  return response
}

export const searchBus = async (query: ISearchForm) => {
  const queryData = queryString.stringify(query)
  const response = await fetch(`${API}/bus/search?${queryData}`).then((data) => data.json())

  return response
}

export const searchBusByFilter = async body => {
  const response = await fetch(`${API}/bus/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((data) => data.json())

  return response
}
