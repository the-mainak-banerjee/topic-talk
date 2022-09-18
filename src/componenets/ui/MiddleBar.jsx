import React from 'react'
import { Box } from '@chakra-ui/react'
import { DefaultScreen } from './DefaultScreen'
import { MiddleBarHeader } from './MiddleBarHeader'
import { MessageContainer } from './messages/MessageContainer'
import { UserActionContainer } from './UserActionContainer'

export const MiddleBar = ({ showRightBar, room, changeRightBar, showMiddleBar, setShowLeftBar, setShowMiddleBar, setShowRightBarInMobile }) => {

  return (
    <Box width={{base:'100%', md:showRightBar ? '40%' : '70%'}} height='full' backgroundColor='#f8f8f8' position='relative' display={{base: showMiddleBar ? 'block' : 'none', md: 'block'}}>
        {room === undefined 
        ? (
            <DefaultScreen/>
        ) : (
            <>
                <MiddleBarHeader 
                    room = {room}
                    changeRightBar = {changeRightBar}
                    setShowLeftBar={setShowLeftBar}
                    setShowMiddleBar={setShowMiddleBar}
                    setShowRightBarInMobile={setShowRightBarInMobile}
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
