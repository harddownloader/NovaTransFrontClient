export type TBusSeatsId = string
export type TSeatsCount = number
export type TCountBlocksInRow = number
export type TCountSeatsInRow = number
export type TBusSeatsRows = number
export type TCountFreeSeatsInRow = number
export type TSeatsForBusElements = number
export type TAdditionalRowsForBusElements = number
export type TAllBlocksCount = number
export type TCreatedAt = Date
export type TUpdatedAt = Date

// bus elements
export type TDriverCoordinates = number
export type TFirstDoorCoordinates = number
export type TSecondDoorCoordinates = number
export type TWcCoordinates = number
export type TBarCoordinates = number

export interface IBusElements {
  driverCoordinates: TDriverCoordinates
  firstDoorCoordinates: TFirstDoorCoordinates
  secondDoorCoordinates: TSecondDoorCoordinates
  wcCoordinates: TWcCoordinates
  barCoordinates: TBarCoordinates
}

export interface IBusSeats {
  _id: TBusSeatsId
  busElements: IBusElements
  seatsCount: TSeatsCount
  countBlocksInRow: TCountBlocksInRow
  countSeatsInRow: TCountSeatsInRow
  rows: TBusSeatsRows
  countFreeSeatsInRow: TCountFreeSeatsInRow
  seatsForBusElements: TSeatsForBusElements
  additionalRowsForBusElements: TAdditionalRowsForBusElements
  allBlocksCount: TAllBlocksCount
  createdAt: TCreatedAt
  updatedAt: TUpdatedAt
}
