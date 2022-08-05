import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export const DefaultScreen = () => {
  return (
    <Flex flexDirection='column' alignItems='center' justifyContent='center' h='full' gap='4'>
      <Image
        src='../../../assets/defaultsectionimg.png'
        boxSize='200px'
        objectFit='cover'
      />
      <Text width='40%' textAlign='center' fontSize='lg'>Now Join In Your Favourite Room And Start Chatting With Others.</Text>
    </Flex>
  )
}

