import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { useRoom } from '../../../contexts'
import { useMsg, useUser } from '../../../hooks'

const MessageItem = ({msg, isUserMsg, selectedMessege, senderDetails, user, room}) => {

  const msgRef = useRef()
  const [showActionButtons, setShowActionButtons] = useState(false)
  const { updateUser, userData } = useUser(user?.uid)
  const { deleteMessage } = useMsg(room?.id)
  const { setEditedMessage } = useRoom()
  // const toast = useToast()

  
  useEffect(() => {
    if(msgRef.current?.id === selectedMessege){
      msgRef.current.scrollIntoView({
        behavior: 'smooth'
      })
    } 

  },[selectedMessege,msgRef])

 

  // Star action handler
  const starHandler = () => {
    const isStarred = userData?.starredMsgs?.some(item => item.id === msg.id)
    let data;

    if(isStarred) {
      data = {
        starredMsgs:  userData?.starredMsgs?.filter(item => item.id !== msg.id)
      }
    }else{
      data = {
        starredMsgs: [...userData.starredMsgs, msg]
      }
    }
    updateUser(data)
  }


  // Delete Action Handler
  const deleteHandler = () => {
    deleteMessage(msg.id)
  }


  // Edit action Handler
  const editHandler = () => {
    setEditedMessage({id: msg.id, msg: msg.content })
  }



  return (
    <Box id={msg?.id} ref={msgRef} p='2' maxW='40%' mb='1' ml={isUserMsg ? 'auto' : '0'} mr={isUserMsg ? '0' : 'auto'}>

        {/* <Box backgroundColor='white' p='2' borderRadius='lg' z-index='10'>
          <Text fontSize='xs'>Star Message</Text>
          <Text fontSize='xs'>Edit Message</Text>
          <Text fontSize='xs'>Delete Message</Text>
        </Box> */}

        <Flex flexDirection='column' py='2' px='4' mb='1' ml={isUserMsg ? 'auto' : '0'} mr={isUserMsg ? '0' : 'auto'}borderRadius='lg' backgroundColor={isUserMsg ? "green.100" : 'white'} boxShadow='md' width='fit-content' position='relative' 
        onMouseEnter={() => setShowActionButtons(true)}
        onMouseLeave={() => setShowActionButtons(false)}>

            <Text pt='2' color={`${senderDetails?.color}`} fontWeight='medium'>{isUserMsg ? 'Me' : msg?.sender?.name}</Text>

            <Text>{msg?.content}</Text>

            {!isNaN(msg?.createdAt?.formatedMsgHour) && <Text pt='2' fontSize='xs' alignSelf='flex-end'>{msg?.createdAt?.formatedMsgDate?.slice(4)} {msg?.createdAt?.formatedMsgHour}:{msg?.createdAt?.formatedMsgMins}</Text>}

            {showActionButtons && <Flex position='absolute' top='1' right='0.5' gap='1' cursor='pointer'>
                {isUserMsg && <BsPencil onClick={editHandler}/>}
                {isUserMsg && <BsTrash onClick={deleteHandler}/>}
                {userData?.starredMsgs?.some(item => item.id === msg.id) 
                  ? (
                    <FaStar onClick={starHandler}/>
                  ) : (
                    <FaRegStar onClick={starHandler}/>
                  )
                }
            </Flex>}
            
        </Flex>

    </Box>
  )
}

export default MessageItem
