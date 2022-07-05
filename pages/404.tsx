import React from "react"
import Router from "next/router"
import {
  Typography,
  Button,
  Grid,
  Container,
} from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

const FourOhFour = () => {
  return (
  <>
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

export default FourOhFour
