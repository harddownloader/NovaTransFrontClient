import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { API } from "@/utils/config"


export type LocationsState = {
  data: Array<T>
  pending: boolean
  error: boolean
}

const initialState: LocationsState = {
  data: [],
  pending: false,
  error: false
}

export const getLocations = createAsyncThunk('locations/locations', async () => {
  const response = await fetch(`${API}/locations`)
  const locations = await response.json()
  console.log({getLocations: locations})
  return locations
})

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    // locationsLoading: (state, action: PayloadAction<boolean>) => {
    //   state.loading = action.payload
    // },
    // locationsReceived: (state, action: PayloadAction<Array<T>>) => {
    //   state.locations = action.payload
    //   state.loading = false
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(getLocations.pending, state => {
        state.pending = true
      })
      .addCase(getLocations.fulfilled, (state, { payload }) => {
        state.pending = false
        state.data = payload
      })
      .addCase(getLocations.rejected, state => {
        state.pending = false
        state.error = true
      })
  }
})

// export const {
//   locationsLoading,
//   locationsReceived, 
// } = locationsSlice.actions

export const selectLocations = (state: RootState) => state.locations

export default locationsSlice.reducer
