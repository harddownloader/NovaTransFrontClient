import React from "react"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import classes from './Copyright.module.scss'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        NovaTrans
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default Copyright
