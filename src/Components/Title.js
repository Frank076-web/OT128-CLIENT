import React from 'react'
import defaultImage from '../assets/defaultImage.jpg'
import { Box } from '@mui/material'

export const Title = ({ children, image }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mt: 4 }}>
        <img width="100%" src={image || defaultImage} alt={children} />
      </Box>
      <h1 style={{ textAlign: 'center', marginBottom: '8rem' }}>{children}</h1>
    </Box>
  )
}
