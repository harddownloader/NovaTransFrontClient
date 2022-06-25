import {
  configureStore,
  ThunkAction,
  Action
} from '@reduxjs/toolkit'

import locationsReducer from '@/features/locations/locationsSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      locations: locationsReducer,
    },
  })
}

const store = makeStore()

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
