import { Box, Button, Flex, Heading, Spacer, useToast } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../../contexts'
import inviteHandler from '../../utils/InviteHandler'

export const NavBar = () => {

    const { logOut, userTocken } = useAuth()
    const toast = useToast()


    const inviteFriends = () => {
      inviteHandler(process.env.REACT_APP_TOPIC_TALK_OFFICIAL,toast)
    }

    const logOutHandler = () => {
        logOut()
    }

  return (
    <Box as='nav' backgroundColor='#00A884' pt='4' pb='8' color='white'>
        <Flex width='80%' mx='auto'>
            <Heading as='h2' size='xl'>Topic-Talk</Heading>
            <Spacer/>
            <Button onClick={inviteFriends} variant='outline' fontWeight='medium' mr='4' color='black'>Invite Friends</Button>
            {userTocken && <Button onClick={logOutHandler} backgroundColor='white' color='black' fontWeight='medium'>Logout</Button>}
        </Flex>
    </Box>
  )
}
