import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'
import { getAllLocations } from '@/actions/location'

export interface LocationState {
  district: string,
  name: string,
  __v: number,
  _id: string
}

export interface LocationsState {
  data: Array<LocationState>
  pending: boolean
  error: boolean
}

const initialState: LocationsState = {
  data: [],
  pending: false,
  error: false
}

export const getLocations = createAsyncThunk('locations/locations', async () => {
  const locations = await getAllLocations({})
  return locations
})

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.data = [...action.payload]
    }
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

export const selectLocations = (state: RootState) => state.locations

export const { setLocations } = locationsSlice.actions

export default locationsSlice.reducer
