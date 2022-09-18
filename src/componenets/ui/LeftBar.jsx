import { Box } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { LeftBarProfile } from './LeftBarProfile'
import { LeftBarRooms } from './LeftBarRooms'

export const LeftBar = ({ changeRightBar,showLeftBar, setShowLeftBar, setShowMiddleBar }) => {
  const [showProfile,setShowProfile] = useState(false)

  const changeProfileVisibility = useCallback((data) => {
    setShowProfile(data)
  },[])

  return (
    <>
      <Box width={{base: '100%', md:'30%'}} height='full' backgroundColor='white' position='relative' borderRight='1px' borderStyle='solid' borderColor='blackAlpha.400' display={{base: showLeftBar ? 'block' : 'none', md: 'block'}}>
          {showProfile 
            ? (
                <LeftBarProfile changeProfileVisibility={changeProfileVisibility} setShowMiddleBar={setShowMiddleBar} setShowLeftBar={setShowLeftBar}/>
            ) : (
                <LeftBarRooms changeRightBar={changeRightBar} changeProfileVisibility={changeProfileVisibility} setShowLeftBar={setShowLeftBar} setShowMiddleBar={setShowMiddleBar}/>
            )
          }
      </Box>
    </>
  )
}
