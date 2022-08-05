import React from 'react'
import { Box } from '@chakra-ui/react'
import { DefaultScreen } from './DefaultScreen'
import { MiddleBarHeader } from './MiddleBarHeader'
import { MessageContainer } from './messages/MessageContainer'
import { UserActionContainer } from './UserActionContainer'

export const MiddleBar = ({ showRightBar, setShowRightBar, room }) => {

  return (
    <Box width={showRightBar ? '40%' : '70%'} height='full' backgroundColor='#f8f8f8' position='relative'>
        {room === undefined 
        ? (
            <DefaultScreen/>
        ) : (
            <>
                <MiddleBarHeader 
                    room = {room}
                    setShowRightBar = {setShowRightBar}
                />
                <MessageContainer
                    room = {room}
                />
                <UserActionContainer
                    room = {room}
                    setShowRightBar = {setShowRightBar}
                />
            </>
        )
        }
    </Box>
  )
}
