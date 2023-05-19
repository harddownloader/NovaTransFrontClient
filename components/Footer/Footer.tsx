import React from "react"

// mui
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import { makeStyles } from '@mui/styles'
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

// project components
import Copyright from './Copyright'

// icons
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'

// styles
import styles from "./Footer.module.scss"

// images
import { PATH_TO_LOGO, WEBSITE_NAME } from "@/utils/const"
const headingImg = "/static/img/logos/NewTrans.png"

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


const pagesRows = [
  {
    title: "Информация",
    list: [
       {
        title: "О Нас",
        link: '/info/ru/about-us'
      },
      {
        title: "Политика конфиденциальности",
        link: '/info/ru/privacy-policy'
      },
      {
        title: "Договор оферты",
        link: '/info/ru/public-offer'
      },
      {
        title: "Правила перевозок",
        link: '/info/ru/transportation-rules'
      }
    ],
  },
]

export default function Footer() {
  const classes = useStyles()

  const socials = [
    {
      title: "Контакты",
      links: [
        {
          name: "+38097-356-96-96",
          icon: <LocalPhoneIcon className={styles.social_link__icon} color="primary" />,
          link: 'tel:380973569696',
        },
        {
          name: "newtrans.comp@gmail.com",
          icon: <EmailIcon className={styles.social_link__icon} color="primary" />,
          link: 'mailto:newtrans.comp@gmail.com',
        },
        {
          name: "Одеская обл., ул. Фрунзе 64",
          icon: <LocationOnIcon className={styles.social_link__icon} color="primary" />,
          link: '#',
        }
      ],
    },
  ]

  return (
    <>
      <CssBaseline />
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container justifyContent="space-evenly">
          <Grid
            item
            xs={12} sm={3} md={3}
            className={`${styles.footer__company} ${styles.info_block}`}
          >
            <div
              className={styles.footer_logo_wrapper}
            >
              <img
                src={PATH_TO_LOGO}
                alt={`logo ${WEBSITE_NAME}`}
                height={50}
              />
            </div>
            <div
              className={styles.footer_logo_wrapper}
            >
              <img
                src={headingImg}
                alt={`logo ${WEBSITE_NAME}`}
                height={15}
              />
            </div>
            <Typography
              color="textSecondary"
              gutterBottom
              className={styles.footer__logo_description}
            >
              Если перевозки -<br /> то мы
            </Typography>
          </Grid>
          {pagesRows.map((pagesCol, index) => (
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
                {pagesCol.title}
              </Typography>
              <ul>
                {pagesCol.list.map((page, index) => (
                  <li
                    key={index}
                    className={styles.pages_list__item}
                  >
                    <Link
                      href={page.link}
                      variant="subtitle1"
                      color="textSecondary"
                      className={styles.pages_list__item_link}
                      underline="none"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}

          {socials.map((social, index) => (
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              key={index}
              className={`${styles.social_list_container} ${styles.info_block}`}
            >
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {social.title}
              </Typography>
              <ul className={styles.social_list}>
                {social.links.map((link, index) => (
                  <li key={index} className={styles.social_link__item}>
                    <Link href={link.link} underline="none" variant="subtitle1" color="textSecondary" >
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
