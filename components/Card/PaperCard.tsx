import React from "react"
import {
  Paper,
  Typography,
} from '@mui/material'
import classes from './PoperCard.module.scss'

export function PaperCard(props) {
  const { heading, content } = props

  return (
    <Paper
      elevation={1}
      className={classes.paper_card}>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        className={classes.heading}
      >
        {heading}
      </Typography>

      {content.map((textLine, index) => (
        <Typography
          key={index}
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
