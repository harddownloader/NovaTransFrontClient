import fetch from "isomorphic-unfetch"
import { API } from "../utils/config"

export const getAllCategories = async () => {
  const resp = await fetch(`${API}/categories`)
  const response = await resp.json()

  return response
}
