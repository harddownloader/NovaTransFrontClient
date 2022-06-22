import React from "react"
import {
  Paper,
  Typography,
} from '@mui/material'
import classes from './PoperCard.module.scss'

export default function PoperCard(props) {
  const { heading, content } = props

  return (
    <Paper
      elevation={1}
      className={classes.poper_card}>
      <Typography variant="h5" gutterBottom component="div">
        {heading}
      </Typography>

      {content.map((textLine, indx) => (
        <Typography
          key={indx}
          variant="body1"
          gutterBottom
          component="div"
        >
          <b>{textLine.title}: </b>{textLine.text}
        </Typography>
      ))}
    </Paper>
  )
} 
