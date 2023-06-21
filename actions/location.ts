import { API } from "@/utils/const"

export const getAllLocations = async ({ fetchOptions={}} ) => {
  const response = await fetch(`${API}/locations`, {
    ...fetchOptions,
  }).then((data) => data.json())

  return response
}



