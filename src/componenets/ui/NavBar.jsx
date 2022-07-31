import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../../contexts'

export const NavBar = () => {

    const { logOut } = useAuth()

    const logOutHandler = () => {
        logOut()
    }

  return (
    <Box as='nav' backgroundColor='#00A884' pt='4' pb='8' px='36' color='white'>
        <Flex>
            <Heading as='h2' size='xl'>Topic-Talk</Heading>
            <Spacer/>
            <Button onClick={logOutHandler} backgroundColor='white' color='black' fontWeight='medium' size='lg'>Logout</Button>
        </Flex>
    </Box>
  )
}
