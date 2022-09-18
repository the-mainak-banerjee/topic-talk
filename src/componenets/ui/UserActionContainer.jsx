import React, { useEffect, useState } from 'react'
import { Box, Flex, IconButton, Button, Textarea, Text, Spacer } from '@chakra-ui/react'
import { BsEmojiSmile, BsPencil } from 'react-icons/bs'
import { AiOutlineCheckCircle, AiOutlineSend } from 'react-icons/ai'
import Picker from 'emoji-picker-react'
import { useAuth, useRoom } from '../../contexts'
import { v4 as uuid} from 'uuid'
import { useMsg } from '../../hooks'
import { serverTimestamp } from 'firebase/firestore'
import { GrClose } from 'react-icons/gr'

export const UserActionContainer = ({ room, changeRightBar }) => {

    const { user } = useAuth()
    const { updateRoom, updating, editedMessage, setEditedMessage } = useRoom()
    const { createMessage, updateMsg} = useMsg(room?.id)
    const [isMember,setIsMember] = useState(false)
    const [msgInput, setMsgInput] = useState({id:'', msg:''})
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)


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
        changeRightBar('')
    }

    // Handle Emoji Selection
    const onEmojiClick = (event, emojiObject) => {
        if(editedMessage) {
            setEditedMessage(prevState => ({...prevState, msg:prevState.msg+emojiObject.emoji}))
        
        }else{
            setMsgInput(prevState => ({...prevState, msg:prevState.msg+emojiObject.emoji}))
        }
    }

    
    // Function to create new message in database
    const handleMessageSubmit = () => {
        if(msgInput.msg === '') return

        const data = {
            content: msgInput.msg.trim(),
            sender: {name:user?.displayName, id:user?.uid},
            room: room,
            createdAt: serverTimestamp()
        }
        createMessage(msgInput.id,data)
        updateRoom(room.id,{recentMessage: data})
        setMsgInput(prevData => ({...prevData, msg:''}))   
    }

    // Function to update a message of a room
    const updateMessageHandler = () => {

        const data = {
            content: editedMessage.msg.trim()
        }
        updateMsg(editedMessage?.id,data)
        setEditedMessage(null)
    }

    // Handle Message Form Submit
    const submitHandler = (e) => {
        e.preventDefault()
        if(editedMessage?.msg){
            updateMessageHandler()
        }else{
            handleMessageSubmit()
        }
        setShowEmojiPicker(false)
    }

    // Prevent new line creation by enter key
    const handleKeyPress = (e) => {
        if(e.keyCode === 13 && !e.shiftKey){
            e.preventDefault()
            if(editedMessage?.msg){
                updateMessageHandler()
            }else{
                handleMessageSubmit()
            }
            setShowEmojiPicker(false)
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
                <>
                    {editedMessage && <Flex p='2' gap='2'>
                        <BsPencil/>
                        <Box>
                            <Text fontSize='xs' color='#00A884'>Edit Message</Text>
                            <Text>{editedMessage.msg}</Text>
                        </Box>
                        <Spacer/>
                        <GrClose cursor='pointer' onClick={() => setEditedMessage(null)}/>
                    </Flex>}
                    <form onSubmit={submitHandler}>
                        <Flex h='fit-content' gap='2' position='relative'>
                            <IconButton type='button' icon={<BsEmojiSmile/>} onClick={() => setShowEmojiPicker(prevState => !prevState)}/>
                            {showEmojiPicker && <Box position='absolute' top={editedMessage ? '-24rem' : '-20.5rem'}>
                                <Picker onEmojiClick={onEmojiClick}/>
                            </Box>}
                            {editedMessage?.msg 
                            ? (
                                <Textarea 
                                placeholder='type your message' 
                                rows='1' 
                                backgroundColor='white'
                                value={editedMessage.msg}
                                onKeyDown={handleKeyPress}
                                autoFocus={true}
                                onChange={(e) => setEditedMessage(prevData => ({...prevData, msg: e.target.value}))} 
                            />

                            ) : (
                                <Textarea 
                                placeholder='type your message' 
                                rows='1' 
                                backgroundColor='white'
                                value={msgInput.msg}
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setMsgInput(prevData => ({id:uuid(), msg: e.target.value}))} 
                            />

                            )
                            }
                            <IconButton type='submit' backgroundColor='#00A884' color='white' icon={editedMessage ? <AiOutlineCheckCircle/> : <AiOutlineSend/>} disabled={!msgInput.msg && !editedMessage?.msg}/>
                        </Flex> 
                    </form>
                </>
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


