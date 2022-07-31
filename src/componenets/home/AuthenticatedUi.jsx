import { Box } from '@chakra-ui/react'
import React from 'react'
import { LeftBar } from '../ui/LeftBar'
import { NavBar } from '../ui/NavBar'

export const AuthenticatedUi = () => {
  return (
    <>
        <NavBar/>
        <Box as='section' width='80vw' height='80vh' mx='auto' my='-4' backgroundColor='#F8F8F8' boxShadow='md'>
            <LeftBar/>
        </Box>
    </>
  )
}


