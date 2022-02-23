import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import { useBreakPoints } from '../../utils/hooks/useBreakPoints'

const Header = () => {
  const isMatchSmartTv = useBreakPoints('(min-width: 1536px)')
  const isMatchDesktop = useBreakPoints('(min-width: 1200px)')
  const isMatchTablet = useBreakPoints('(min-width: 600px)')
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: isMatchSmartTv ? 'rgba(7,34,39,0.7)' : 'rgb(7,34,39)',
        }}
      >
        <Toolbar>
          {isMatchTablet && (
            <Box
              component="img"
              sx={{
                width: 108,
                height: 53,
                mx: 0,
                p: 1,
              }}
              alt="Logo ong."
              src="/images/Logo Somos Mas.png"
            />
          )}

          <Box
            component="img"
            sx={{
              height: 60,
              ml: isMatchDesktop ? 0 : 'auto',
              mr: isMatchDesktop && 0,
              p: 1,
            }}
            alt="Logo campaña."
            src="/images/estudio.png"
          />

          {isMatchDesktop && (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                p: 1,
                m: 'auto',
              }}
            >
              Eslogan ejemplo.
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default Header
