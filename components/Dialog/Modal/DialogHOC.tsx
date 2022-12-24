import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { SlideProps } from "@mui/material";


/*
* https://github.com/mui/material-ui/issues/32601
* */
const Transition = React.forwardRef((props: SlideProps, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function DialogHOC({ children, ...props }) {
  const {
    title,
    childrenFooter,
    confirm,
    handleClose,
    isMobileVesion
  } = props

  return (
    <div>
      <BootstrapDialog
        fullScreen={isMobileVesion}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.visible}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {children}
        </DialogContent>
        <DialogActions>
          {childrenFooter}
        </DialogActions>
      </BootstrapDialog>

      { confirm }
    </div>
  )
}