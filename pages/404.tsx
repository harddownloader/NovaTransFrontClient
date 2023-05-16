import React from "react"
import Router from "next/router"

// mui
import {
  Typography,
  Button,
  Grid,
  Container,
} from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

// project components
import { NotFoundSeo } from "@/components/seo/NotFoundSeo"

const Custom404 = () => {
  return (
    <>
      <NotFoundSeo />
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="mb-2"
          style={{ minHeight: "100vh" }}
        >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="mb-2"
            >
            <Grid
              item
              sm={12}
              className="mb-2"
            >
              <Typography
                variant="h4"
                component="div"
                align="center"
              >
                404 - Страница не найдена
              </Typography>
            </Grid>
            <Grid
              item
              sm={12}
              className="mb-2"
              justifyContent="center"
              style={{display: 'flex', justifyContent: 'center'}}
            >
              <Button
                size="large"
                variant="contained"
                onClick={() => Router.push('/')}
                startIcon={<HomeOutlinedIcon />}
              >
                На главную
              </Button>
            </Grid>
            </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Custom404
