import React from 'react'

// assets
import RefreshIcon from '@mui/icons-material/Refresh'

export const Preloader = ({
  IconComponent = RefreshIcon
                          }) => {
  return (
    <>
      <IconComponent className={"animate-spin h-5 w-5 text‑white"} />
    </>
  )
}
