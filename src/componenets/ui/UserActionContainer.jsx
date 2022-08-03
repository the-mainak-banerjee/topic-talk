import React, { useEffect, useState } from 'react'
import { Box, Flex, IconButton, Button, Textarea, Text } from '@chakra-ui/react'
import { BsEmojiSmile } from 'react-icons/bs'
import { AiOutlineSend } from 'react-icons/ai'
import { useAuth, useRoom } from '../../contexts'
import { v4 as uuid} from 'uuid'
import { useMsg } from '../../hooks'
import { serverTimestamp } from 'firebase/firestore'

export const UserActionContainer = ({ room, setShowRightBar }) => {

    const { user } = useAuth()
    const { updateRoom, updating } = useRoom()
    const { createMessage } = useMsg(room?.id)
    const [isMember,setIsMember] = useState(false)
    const [msgInput, setMsgInput] = useState({id:'', msg:''})

    const isOwner = room?.owner?.id === user?.uid

    useEffect(() => {
        setIsMember(room?.members?.some(item => item.id === user?.uid) )
    },[room,user])



    // Room Joining Function
    const handleRoomJoining = () => {
        const colorsArray = ['orange.700','green.500','cyan.500','purple.600','pink.700']

        const randomIndex = Math.floor((Math.random() * 5) + 1)

        const roomData = {
            members: [...room.members,{id:user.uid, name:user.displayName, color:colorsArray[randomIndex - 1]}]
        }
        updateRoom(room.id, roomData,'You Have Successfully Joined the Room')
        setIsMember(true)
        setShowRightBar('')
    }


    
    // Function to create new message in database
    const handleMessageSubmit = () => {
        if(msgInput.msg === '') return

        const data = {
            content: msgInput.msg.trim(),
            sender: {name:user?.displayName, id:user?.uid},
            createdAt: serverTimestamp()
        }
        createMessage(msgInput.id,data)
        updateRoom(room.id,{recentMessage: data})
        setMsgInput(prevData => ({...prevData, msg:''}))
    }

    // Handle Message Form Submit
    const submitHandler = (e) => {
        e.preventDefault()
        handleMessageSubmit()
    }

    // Prevent new line creation by enter key
    const handleKeyPress = (e) => {
        if(e.keyCode === 13 && !e.shiftKey){
            e.preventDefault()
            handleMessageSubmit()
        }
    }



  return (
    <Box p='2' backgroundColor='#f4f4f4' width='100%' maxH='40%' position='absolute' bottom='0' zIndex='1'>
        {isMember 
        ? (
            <>
            { room?.isAdminOnly && !isOwner
            ? (
                <Text textAlign='center'>Only Owner Can Send Message</Text>
            ) : (
                <form onSubmit={submitHandler}>
                    <Flex h='fit-content' gap='2'>
                        <IconButton type='button' icon={<BsEmojiSmile/>}/>
                        <Textarea 
                            placeholder='type your message' 
                            rows='1' 
                            backgroundColor='white'
                            value={msgInput.msg}
                            onKeyDown={handleKeyPress}
                            onChange={(e) => setMsgInput(prevData => ({id:uuid(), msg: e.target.value}))} 
                        />
                        <IconButton type='submit' icon={<AiOutlineSend/>} disabled={!msgInput.msg}/>
                    </Flex> 
                </form>
            )
            }
            </>
        )  : (
            <Button m='auto' w='full' fontWeight='medium' fontSize='lg' py='2' variant='unstyled' disabled={updating} onClick={handleRoomJoining}>
                Join Room
            </Button>
        )
        }
    </Box>
  )
}


