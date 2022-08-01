import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { DefaultScreen } from './DefaultScreen'
import { RightBarHeader } from './RightBarHeader'
import { MessageContainer } from './messages/MessageContainer'
import { UserActionContainer } from './UserActionContainer'

export const RightBar = () => {

    const location = useLocation()
    const room = location.state

    // console.log(location)

  return (
    <Box width='70%' height='full' backgroundColor='#f8f8f8' position='relative'>
        {room === null 
        ? (
            <DefaultScreen/>
        ) : (
            <>
                <RightBarHeader 
                    room = {room}
                />
                <MessageContainer
                    room = {room}
                />
                <UserActionContainer
                    room = {room}
                />
            </>
        )
        }
    </Box>
  )
}
