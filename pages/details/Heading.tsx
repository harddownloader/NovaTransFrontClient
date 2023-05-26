import React from 'react'
import Router from "next/router"

// mui
import {
  Grid,
  IconButton,
  Typography
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

// assets
import classes from "./Details.module.scss"

export const Heading = ({ referer }) => {
  return (
    <>
      <Grid item xs={12} className={`${classes.heading_wrap}`}>
        <IconButton
          aria-label="back"
          size="large"
          onClick={() => {
            if (referer !== null && referer.includes('/buses')) {
              Router.back()
            } else {
              Router.push('/')
            }
          }}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <Typography variant="h4" component="div">
          Оформление заказа
        </Typography>
      </Grid>
    </>
  )
}
