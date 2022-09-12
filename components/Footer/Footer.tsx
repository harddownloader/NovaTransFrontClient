import React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import { makeStyles } from '@mui/styles'
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Copyright from './Copyright'
// icons
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
// styles
import styles from "./Footer.module.scss"
// images
const logo = "/static/img/logos/AdobeStock_323576245-ai.png"
const headingImg = "/static/img/logos/goodBusNaming2.jpg"

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}))


const pages = [
  {
    title: "Информация",
    description: ["О Нас", "Вопросы и ответы", "Договор оферты", "Контакты"],
  },
]

const socials = [
  {
    title: "Мы в социальных сетях",
    links: [
      {
        name: "Facebook",
        icon: <FacebookIcon className="social-link__icon" color="primary" />,
      },
      {
        name: "Instagram",
        icon: <InstagramIcon className="social-link__icon" color="primary" />,
      },
    ],
  },
]

export default function Footer() {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container  justifyContent="space-evenly">
          <Grid
            item
            xs={12} sm={3} md={3}
            className={`${styles.footer__company} ${styles.info_block}`}
          >
            <div
              className={styles.footer_logo_wrapper}
            >
              <img
                src={logo}
                alt="logo Good Bus"
                height="75"
              />
            </div>
            <div
              className={styles.footer_logo_wrapper}
            >
              <img
                src={headingImg}
                alt="logo Good Bus"
                height={20}
              />
            </div>
            <Typography
              color="textSecondary"
              gutterBottom
              className={styles.footer__logo_description}
            >
              Ваш надежный перевозчик.
            </Typography>
          </Grid>
          {pages.map((page, index) => (
            <Grid
              item
              xs={12}
              sm={3}
              md={6}
              key={index}
              className={`${styles.footer__pages_list} ${styles.info_block}`}
            >
              <Typography
                variant="h6"
                color="textPrimary"
                gutterBottom
                className={styles.pages_list__title}
              >
                {page.title}
              </Typography>
              <ul>
                {page.description.map((item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      variant="subtitle1"
                      color="textSecondary"
                      className={styles.pages_list__item}
                      underline="none"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}

          {socials.map((cosial, index) => (
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              key={index}
              className={`${styles.social_list_container} ${styles.info_block}`}
            >
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {cosial.title}
              </Typography>
              <ul className={styles.social_list}>
                {cosial.links.map((link, index) => (
                  <li key={index} className={styles.social_link__item}>
                    <Link href="#" underline="none" variant="subtitle1" color="textSecondary" >
                      <Typography className={styles.social_list__text}>
                        {link.icon} {link.name}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </>
  )
}
