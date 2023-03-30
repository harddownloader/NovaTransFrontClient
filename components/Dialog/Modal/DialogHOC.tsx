import React, { ReactNode } from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { SlideProps } from "@mui/material"

/*
* https://github.com/mui/material-ui/issues/32601
* */
const Transition = React.forwardRef((props: SlideProps, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface BootstrapDialogTitleProps {
  children: ReactNode,
  onClose: (e: React.MouseEvent<HTMLElement>) => void
}

const BootstrapDialogTitle = (props: BootstrapDialogTitleProps) => {
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

export interface DialogHOCProps {
  children: ReactNode
  title: string
  childrenFooter: ReactNode
  confirm: null | ReactNode
  handleClose: (e: React.MouseEvent<HTMLElement>) => void
  isMobileVersion: boolean
  visible: boolean
}

export function DialogHOC({ children, ...props }: DialogHOCProps) {
  const {
    title,
    childrenFooter,
    confirm,
    handleClose,
    isMobileVersion,
    visible,
  } = props

  return (
    <div>
      <BootstrapDialog
        fullScreen={isMobileVersion}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={visible}
        maxWidth={'xl'}
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

export default DialogHOC
