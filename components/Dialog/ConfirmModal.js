import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
});

export default function ConfirmModal(props) {
  const {
    isVisible,
    changeVisibility,
    titleText,
    contentText,
    confirmButtonText,
    cancelButtonText,
    confirmButtonHandler,
  } = props

  const handleClose = (e) => {
    e.stopPropagation()
    changeVisibility(false)
  }

  const handleSuccess = (e) => {
    e.stopPropagation()
    confirmButtonHandler()
  }

  return (
    <div>
      <Dialog
        open={isVisible}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>{cancelButtonText}</Button>
          {
            confirmButtonText &&
            handleSuccess && 
            <Button variant="contained" onClick={handleSuccess}>{confirmButtonText}</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}
