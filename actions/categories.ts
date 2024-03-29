import { API } from "@/utils/const"

export const getAllCategories = async () => {
  const response = await fetch(`${API}/categories`).then((data) => data.json())

  return response
}
