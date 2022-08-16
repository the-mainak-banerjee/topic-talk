import { Box } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { LeftBarProfile } from './LeftBarProfile'
import { LeftBarRooms } from './LeftBarRooms'

export const LeftBar = ({ changeRightBar }) => {
  const [showProfile,setShowProfile] = useState(false)

  const changeProfileVisibility = useCallback((data) => {
    setShowProfile(data)
  },[])

  return (
    <Box width='30%' height='full' backgroundColor='white' position='relative' borderRight='1px' borderStyle='solid' borderColor='blackAlpha.400'>
        {showProfile 
          ? (
              <LeftBarProfile changeProfileVisibility={changeProfileVisibility}/>
          ) : (
              <LeftBarRooms changeRightBar={changeRightBar} changeProfileVisibility={changeProfileVisibility}/>
          )
        }
        
    </Box>
  )
}
