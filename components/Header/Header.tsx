import React from "react"
import Link from "next/link"
import dynamic from 'next/dynamic'
// import Image from 'next/image'

// mui
import {
  AppBar,
  Toolbar,
  Container,
} from '@mui/material'
import { Breakpoint } from "@mui/system/createTheme/createBreakpoints" // this was exported from mui breakpoint type for Container maxWidth, that path may change in the future

// project components
import { LangMenu } from './LangMenu'
const DynamicAlertArea = dynamic(() => import('./AlertArea'), {
  ssr: false,
})

// assets
import { PATH_TO_LOGO, WEBSITE_NAME } from "@/utils/const"
import classes from "./Header.module.scss"

const headingImg = "/static/img/logos/NewTrans.png"

interface HeaderProps {
  isDarkStyle?: boolean
  containerWidth?: false | Breakpoint
}

export const Header = ({
  isDarkStyle=false,
  containerWidth="md"
}: HeaderProps) => {
  return (
    <>
      <DynamicAlertArea />
      <AppBar
        // color="transparent"
        elevation={0}
        position="relative"
        className={`${classes.container} ${isDarkStyle ? classes.darkColors : classes.lightColors}`}
      >
      <Container maxWidth={containerWidth}>
        <Toolbar disableGutters>
          <div className={classes.logo_wrap}>
            <Link href='/' className={classes.logo_wrap_link}>
              <img
                src={PATH_TO_LOGO}
                alt={`logo ${WEBSITE_NAME}`}
                height={40}
                className={`${classes.logo_img} ${classes.pointer}`}
              />
            </Link>
            <Link href='/' className={classes.logo_wrap_link}>
              <img
                src={headingImg}
                alt={`logo ${WEBSITE_NAME}`}
                className={`${classes.pointer}`}
                height={24}
              />
            </Link>
          </div>

          <section className={classes.rightToolbar}>
            <LangMenu isDarkStyle={isDarkStyle} />
          </section>
        </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
