import { Box, Typography } from '@mui/material'
import React from 'react'

const Thankyou = () => {
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant="h4" component="div" gutterBottom>
          Muchas gracias por su donación!
        </Typography>
      </Box>
    </>
  )
}

export default Thankyou
