import { ISearchForm } from "@/interfaces/searchform"
import queryString from "query-string"
import { API } from "@/utils/const"

export const searchBus = async (query: ISearchForm) => {
  const queryData = queryString.stringify(query)
  const response = await fetch(`${API}/bus/search?${queryData}`).then((data) => data.json())

  return response
}
