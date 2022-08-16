import React from 'react'
import { Box } from '@chakra-ui/react'
import { DefaultScreen } from './DefaultScreen'
import { MiddleBarHeader } from './MiddleBarHeader'
import { MessageContainer } from './messages/MessageContainer'
import { UserActionContainer } from './UserActionContainer'

export const MiddleBar = ({ showRightBar, room, changeRightBar }) => {

  return (
    <Box width={showRightBar ? '40%' : '70%'} height='full' backgroundColor='#f8f8f8' position='relative'>
        {room === undefined 
        ? (
            <DefaultScreen/>
        ) : (
            <>
                <MiddleBarHeader 
                    room = {room}
                    changeRightBar = {changeRightBar}
                />
                <MessageContainer
                    room = {room}
                />
                <UserActionContainer
                    room = {room}
                    changeRightBar = {changeRightBar}
                />
            </>
        )
        }
    </Box>
  )
}
