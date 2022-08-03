import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

const MessageItem = ({msg, isUserMsg, selectedMessege, senderDetails}) => {
  const msgRef = useRef()
  const msgdate = (new Date(msg?.createdAt?.toDate()))
  const formatedMsgHour = msgdate.getHours() < 10 ? `0${msgdate.getHours()}` :  `${msgdate.getHours()}` 
  const formatedMsgMins = msgdate.getMinutes() < 10 ? `0${msgdate.getMinutes()}` : `${msgdate.getMinutes()}`


  useEffect(() => {
    if(msgRef.current?.id === selectedMessege){
      msgRef.current.scrollIntoView()
      msgRef.current.focus()
    }
  },[selectedMessege,msgRef])

  return (
    <Box id={msg?.id} ref={msgRef} p='2' maxW='40%' ml={isUserMsg ? 'auto' : '0'} mr={isUserMsg ? '0' : 'auto'}>
        <Flex flexDirection='column' py='2' px='4' mb='1' borderRadius='lg' backgroundColor={isUserMsg ? "green.100" : 'white'} boxShadow='md' width='fit-content'  ml={isUserMsg ? 'auto' : '0'} mr={isUserMsg ? '0' : 'auto'}>
            <Text color={`${senderDetails?.color}`} fontWeight='medium'>{isUserMsg ? 'Me' : msg?.sender?.name}</Text>
            <Text>{msg?.content}</Text>
            <Text fontSize='xs' alignSelf='flex-end'>{formatedMsgHour}:{formatedMsgMins}</Text>
        </Flex>
    </Box>
  )
}

export default MessageItem
