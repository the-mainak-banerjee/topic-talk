import React from 'react'
import { Avatar, Box, Flex, IconButton, Spacer, Text } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useAuth } from '../../contexts'

export const RightBarHeader = ({ room }) => {

  const { user } = useAuth()

  return (
    <Box p='2' backgroundColor='#f8f8f8' width='100%' height='8%'>
         <Flex alignItems='center' mb='2'>
            <Flex gap='2' cursor='pointer'>
                <Avatar name={room.name} size='sm'/>
                <Box w='100%'>
                    <Text fontSize='sm'>{room.name}</Text>
                    <Text fontSize='xs' pb='2'>Owner: {room.owner.name === user?.displayName ? 'Me' : room.owner.name}</Text>
                </Box>
            </Flex>
            <Spacer/>
            <Flex alignItems='center' gap='2' mb='2'>
                <IconButton icon={<AiOutlineSearch/>} variant='unstyled' size='sm'/>
                <IconButton icon={<BsThreeDotsVertical/>} variant='unstyled' size='sm'/>
            </Flex>
        </Flex>
    </Box>
  )
}

