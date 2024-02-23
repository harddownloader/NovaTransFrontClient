import React from 'react'
import dynamic from "next/dynamic"

// mui
import Skeleton from "@mui/material/Skeleton"

// dynamic imports
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <Skeleton animation="wave" height={80} />
})

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

