import { API } from "@/utils/const";

export const getBusSeats = async (busSeatsId: string) => {
  const response = await fetch(`${API}/buses-seats/${busSeatsId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  }).then((data) => data.json())

  return response
}
