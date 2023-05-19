import React from 'react'
import Link from "next/link"

// mui
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import AlertTitle from "@mui/material/AlertTitle"
import Collapse from "@mui/material/Collapse"
import { Alert } from "@mui/material"

// hooks
import { useLocalStorage } from "@/hooks/useLocalStorage"

// assets
import classes from "@/components/HeaderMaterial/Header.module.scss"

export const AlertArea = () => {
  const [isMainAlertOpen, setIsMainAlertOpen] = useLocalStorage(true, 'isMainAlertOpen')

  const closeHandler = () => {
    setIsMainAlertOpen(false)
  }

  return (
    <>
      <Collapse
        in={isMainAlertOpen}
        className={classes.collapse_alert}
      >
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={closeHandler}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Правила перевозок обновленны</AlertTitle>
          Мы обновили правила перевозок - мы пожете про это почитать <Link href={'/info/ru/transportation-rules'}><strong className={classes.pointer}>здесь</strong></Link>.
        </Alert>
      </Collapse>
    </>
  )
}

export default AlertArea
