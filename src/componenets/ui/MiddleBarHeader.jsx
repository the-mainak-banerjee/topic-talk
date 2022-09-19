import React from 'react'
import { Avatar, Badge, Box, Flex, IconButton, Spacer, Text, Show } from '@chakra-ui/react'
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai'
// import { BsThreeDotsVertical } from 'react-icons/bs'
import { useAuth } from '../../contexts'

export const MiddleBarHeader = ({ room, changeRightBar, setShowMiddleBar, setShowLeftBar, setShowRightBarInMobile }) => {

  const { user } = useAuth()

  const handleCloseMiddleBar = () => {
    setShowMiddleBar(false)
    setShowLeftBar(true)
  }

  const handleShowRightBarDetails = () => {
    changeRightBar('details')
    setShowRightBarInMobile(true)
    setShowMiddleBar(false)
  }

  const handleShowRightBarSearch = () => {
    changeRightBar('search')
    setShowRightBarInMobile(true)
    setShowMiddleBar(false)
  }

  return (
    <Box p='2' backgroundColor='#f8f8f8' width='100%' height='8%'>
         <Flex alignItems='center' mb='2'>
            <Show breakpoint='(max-width: 767px)'>
              <AiOutlineArrowLeft onClick={handleCloseMiddleBar}/>
            </Show>
            <Flex gap='2' cursor='pointer' onClick={handleShowRightBarDetails}>
                <Avatar name={room?.name} size='sm'/>
                <Box w='100%'>
                    <Text fontSize='sm'>{room?.name}</Text>
                    <Text fontSize='xs' pb='2' color='#00A884'>Owner: {room?.owner?.id === user?.uid ? 'Me' : room?.owner?.name}</Text>
                </Box>
            </Flex>
            <Spacer/>
            <Flex alignItems='center' gap='2' mb='2'>
                <IconButton icon={<AiOutlineSearch/>} variant='unstyled' size='sm' onClick={handleShowRightBarSearch}/>
                {/* <IconButton icon={<BsThreeDotsVertical/>} variant='unstyled' size='sm'/> */}
                {room?.isAdminOnly && <Badge size='sm' colorScheme='green' fontWeight='normal'>Admin Only</Badge>}
            </Flex>
        </Flex>
    </Box>
  )
}

