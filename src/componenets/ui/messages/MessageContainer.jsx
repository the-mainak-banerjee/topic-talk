import { Box, Text } from '@chakra-ui/react'
import React, { useLayoutEffect, useRef } from 'react'
import { useAuth, useRoom } from '../../../contexts'
import { useMsg } from '../../../hooks'
import MessageItem from './MessageItem'

export const MessageContainer = ({ room }) => {

  const { allMsg } = useMsg(room?.id)
  const { user } = useAuth()
  const { selectedMessege, editedMessage } = useRoom()
  const msgContainerRef = useRef()


  useLayoutEffect(() => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
});

  return (
    <Box 
        p='2' 
        backgroundColor='gray.300' 
        width='100%' 
        height={editedMessage ? '74%' : '84%'} 
        overflowY='scroll' 
        ref={msgContainerRef}
        sx={{
          '&:: -webkit-scrollbar' : {
              width: '4px',
              backgroundColor:'#f8f8f8'
          },
          '&::-webkit-scrollbar-thumb' : {
              backgroundColor:'#00C884'
          }
      }}  
    >
      {allMsg?.length > 0 
      ? (
            <>
              {allMsg.map(item => {
                return (
                  <MessageItem 
                    key={item.id}
                    msg={item}
                    senderDetails={room?.members?.find(data => data.id === item.sender.id)}
                    isUserMsg = {item.sender.id === user?.uid}
                    selectedMessege = {selectedMessege}
                    user = {user}
                    room = {room}
                  />
                )
              })}
            </>
        ) : (
            <Text textAlign='center' pt='4' fontSize='xl'>Be The First One To Send Message in {room?.name}</Text>
        )
      }
    </Box>
  )
}


