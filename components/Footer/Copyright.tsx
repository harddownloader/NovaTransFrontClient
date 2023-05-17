import React from "react"

// mui
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"

// const
import { WEBSITE_NAME } from "@/utils/const"

// styles
import classes from './Copyright.module.scss'

// assets
const visaMasterCardImg = "/static/img/payments/visa-logo-png-2026.png"

function Copyright() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={12} md={12} className={classes.payments_image_wrap}>
        <div></div>
        <img
          src={visaMasterCardImg}
          alt="Visa Mastercard Payments"
          height={30}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="/">
            { WEBSITE_NAME }
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Copyright
