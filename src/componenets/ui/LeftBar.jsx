import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { LeftBarProfile } from './LeftBarProfile'
import { LeftBarRooms } from './LeftBarRooms'

export const LeftBar = ({ setShowRightBar }) => {
  const [showProfile,setShowProfile] = useState(false)

  return (
    <Box width='30%' height='full' backgroundColor='white' position='relative' borderRight='1px' borderStyle='solid' borderColor='blackAlpha.400'>
        {showProfile 
          ? (
              <LeftBarProfile setShowProfile={setShowProfile}/>
          ) : (
              <LeftBarRooms setShowRightBar={setShowRightBar} setShowProfile={setShowProfile}/>
          )
        }
        
    </Box>
  )
}
