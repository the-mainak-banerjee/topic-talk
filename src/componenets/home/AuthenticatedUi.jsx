import { Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { LeftBar } from '../ui/LeftBar'
import { NavBar } from '../ui/NavBar'
import { RightBar } from '../ui/RightBar'

export const AuthenticatedUi = () => {
  return (
    <>
        <NavBar/>
        <Box as='section' width='80vw' height='85vh' mx='auto' my='-4' backgroundColor='#F8F8F8' boxShadow='md'>
            <HStack height='full'>
                <LeftBar/>
                <RightBar/>
            </HStack>
        </Box>
    </>
  )
}


