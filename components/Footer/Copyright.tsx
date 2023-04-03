import React from "react"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import classes from './Copyright.module.scss'
import { WEBSITE_NAME } from "@/utils/const"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        { WEBSITE_NAME }
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default Copyright
