import fetch from "isomorphic-unfetch"
import { API } from "../utils/const"

export const getAllCategories = async () => {
  const resp = await fetch(`${API}/categories`)
  const response = await resp.json()

  return response
}
