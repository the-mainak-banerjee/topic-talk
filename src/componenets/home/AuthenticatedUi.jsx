import { Box, HStack } from '@chakra-ui/react'
import React, { useEffect, useState, useCallback } from 'react'
import { LeftBar } from '../ui/LeftBar'
import { NavBar } from '../ui/NavBar'
import { MiddleBar } from '../ui/MiddleBar'
import { RightBar } from '../ui/RightBar'
import { useAuth, useRoom } from '../../contexts'
import { useLocation } from 'react-router-dom'

export const AuthenticatedUi = () => {

  const { showRightBar, setShowRightBar, showMiddleBar,setShowMiddleBar, showLeftBar, setShowLeftBar, setShowRightBarInMobile, showRightBarInMobile } = useAuth()
  const [room,setRoom] = useState([])
  const { allRooms, changeSelectedMessage } = useRoom()
  const location = useLocation()


  useEffect(() => {
    setRoom(allRooms.find(item => item.id === location?.state?.id))
  }, [allRooms,location])

  useEffect(() => {
    if(showRightBar === ''){
      changeSelectedMessage(null)
    }
    // eslint-disable-next-line
  }, [showRightBar])

  const changeRightBar = useCallback((value) => {
    setShowRightBar(value)
  },[setShowRightBar])

  return (
    <>
        <NavBar/>
        <Box as='section' width={{base:'100vw',md:'80vw'}} height={{base:'92vh', md:'85vh'}} mx='auto' my={{base:'0',md:'-4'}} backgroundColor='#F8F8F8' boxShadow='md'>
            <HStack height='full'>
                <LeftBar changeRightBar={changeRightBar} setShowRightBar={setShowRightBar} showLeftBar={showLeftBar} setShowLeftBar={setShowLeftBar} setShowMiddleBar={setShowMiddleBar}/>
                <MiddleBar room={room} showRightBar={showRightBar} changeRightBar={changeRightBar} showMiddleBar={showMiddleBar} setShowMiddleBar={setShowMiddleBar} setShowLeftBar={setShowLeftBar} setShowRightBarInMobile={setShowRightBarInMobile}/>
                {showRightBar !== '' && <RightBar showRightBar={showRightBar} changeRightBar={changeRightBar} room={room} setShowMiddleBar={setShowMiddleBar} setShowLeftBar={setShowLeftBar} setShowRightBarInMobile={setShowRightBarInMobile} showRightBarInMobile={showRightBarInMobile}/>}
            </HStack>
        </Box>
    </>
  )
}


