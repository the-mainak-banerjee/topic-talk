import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const MessageItem = ({msg, isUserMsg, senderDetails}) => {

  // const msgdate = new Date((msg.createdAt.seconds + msg.createdAt.nanoseconds) * 1000)
  const msgdate = (new Date(msg?.createdAt?.toDate()))
  const formatedMsgHour = msgdate.getHours() < 10 ? `0${msgdate.getHours()}` :  `${msgdate.getHours()}` 
  const formatedMsgMins = msgdate.getMinutes() < 10 ? `0${msgdate.getMinutes()}` : `${msgdate.getMinutes()}`


  console.log(formatedMsgHour, formatedMsgMins)

  return (
    <Box p='2' maxW='40%' ml={isUserMsg ? 'auto' : '0'} mr={isUserMsg ? '0' : 'auto'}>
        <Flex flexDirection='column' py='2' px='4' mb='1' borderRadius='lg' backgroundColor={isUserMsg ? "green.100" : 'white'} boxShadow='md' width='fit-content'  ml={isUserMsg ? 'auto' : '0'} mr={isUserMsg ? '0' : 'auto'}>
            <Text color={`${senderDetails?.color}`} fontWeight='medium'>{isUserMsg ? 'Me' : msg?.sender?.name}</Text>
            <Text>{msg?.content}</Text>
            <Text fontSize='xs' alignSelf='flex-end'>{formatedMsgHour}:{formatedMsgMins}</Text>
        </Flex>
    </Box>
  )
}

export default MessageItem
