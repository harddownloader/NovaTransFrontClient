import { API } from "@/utils/const"

export const getAllLocations = async () => {
  const response = await fetch(`${API}/locations`).then((data) => data.json())

  return response
}



