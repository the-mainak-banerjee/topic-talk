import { Avatar, Badge, Box, Button, Container, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Spacer, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import { FiUserPlus } from 'react-icons/fi'
import { BsPencil, BsSearch } from 'react-icons/bs'
import { useAuth, useRoom } from '../../contexts'
import { useMsg } from '../../hooks'
import inviteHandler from '../../utils/InviteHandler'

export const RightBar = ({ showRightBar, setShowRightBar, room }) => {

    const [searchText, setSearchText] = useState('')
    const [searchedMsg, setSearchedMsg] = useState([])
    const [editDescription,setEditDescription] = useState(false)
    // const [actionVisibility, setActionVisibility] = useState(true)
    const [description,setDescription] = useState(room?.description)
    const inputRef = useRef()
    const { allMsg } = useMsg(room?.id)
    const { user } = useAuth()
    const { updateRoom, setSelectedMessege, deleteRoom } = useRoom()
    const toast = useToast()

    const isAdmin = room?.admins?.some(item => item.id === user?.uid)
    const isOwner = room?.owner?.id === user?.uid
    const isMemeber = room?.members?.some(item => item.id === user?.uid) 


 

    // Get the searched message array
    const getFilteredMsg = useCallback((text) => {
        if(text !== ''){
            const filteredData = allMsg.filter(msg => {
                return msg.content.toLowerCase().includes(text.toLowerCase())
            })
            setSearchedMsg(filteredData)
        }else{
            setSearchedMsg([])
        }
    },[allMsg])

    // Debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            getFilteredMsg(searchText)
        },300)
        return () => clearTimeout(timer)
    },[searchText, getFilteredMsg])

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleSearchTextClear = () => {
        setSearchText('')
        inputRef.current.focus()
    }


    // Handle Description change

    const handleDescriptionChange = () => {

        const data = {
            description: description
        }

        updateRoom(room?.id, data, 'Description Updated Successfully')
        setEditDescription(false)
    }

    
    // Handle Invite Friends
    const handleInviteFriends = async () => {
        // const shareUrl = `https://${window.location.host}/room/${room?.id}`
        // const shareUrl = `${window.location.host}/room/${room?.id}`

        // try {
        //     await navigator.clipboard.writeText(shareUrl)
        //     toast({
        //         title: 'Link Copied To Clipboard, Now Share With friends',
        //         status: 'success',
        //         position: 'bottom-left'
        //     })
        // }catch(error){
        //     toast({
        //         title: 'Something Went Wrong, Please Try again',
        //         status: 'error',
        //         position: 'bottom-left'
        //     })
        // }

        inviteHandler(room?.id,toast)
    }


    // Handle Room Danger Actions

    // Leave Room
    const handleLeaveRoom = () => {
        const data = {
            members: room.members.filter(item => item.id !== user?.uid) 
        }

        updateRoom(room.id, data, 'You Have Left The Room')
        setShowRightBar('')
    }

    // Activate Admin Mode
    const handleAdminMode = () => {
        const data = {
            isAdminOnly: !room.isAdminOnly
        } 

        const msg = room.isAdminOnly ? 'Disabled Admin Mode' : 'Enabled Admin Mode'
        updateRoom(room.id, data, msg)
        setShowRightBar('')
    }

    // Delete Room 

    const handleDeleteRoom = () => {
        deleteRoom(room?.id)
        setShowRightBar('')
    }


  return (
    <Box width={showRightBar ? '35%' : '0'} height='full' backgroundColor='#f8f8f8'>
        <Flex p='2' backgroundColor='#f8f8f8' width='100%' height='8%' alignItems='center' gap='4'>
            <GrClose cursor='pointer' onClick={() =>  setShowRightBar('')}/>
            {showRightBar === 'search' && <Text fontSize='sm' fontWeight='normal'>Search Messages</Text>}
            {showRightBar === 'details' && <Text fontSize='sm' fontWeight='normal'>Room Info</Text>}
        </Flex>


        {showRightBar === 'search' && <>
            <Box pb='8' pt='4' px='4' backgroundColor='white' width='100%' height='10%' boxShadow='xl'>
                <InputGroup>
                    <InputLeftElement 
                        pointerEvents='none'
                        children={<BsSearch/>}
                    />
                    <Input type='text' ref={inputRef} autoFocus placeholder={`Search Message In ${room?.name}`} value={searchText} onChange={handleSearchTextChange} variant='filled'/>
                    {searchText && <InputRightElement>
                        <AiFillCloseCircle onClick={handleSearchTextClear} cursor='pointer'/>
                    </InputRightElement>}
                </InputGroup>
            </Box>

            <Container py='2' px='4'  height='82%' backgroundColor='white' overflowY='scroll'>
                {searchedMsg?.map(msg => {
                        return (
                            <Flex key={msg?.id} flexDirection='column' py='2' px='4' mb='4' backgroundColor='#f8f8f8' borderRadius='lg' boxShadow='md' cursor='pointer' onClick={() => setSelectedMessege(msg?.id)}>
                                <Text fontWeight='medium'>{user?.uid === msg?.sender?.id ? 'Me' : msg?.sender?.name}</Text>
                                <Text>{msg?.content}</Text>
                                <Text fontSize='xs' alignSelf='flex-end'>{msg?.createdAt?.formatedMsgDate?.slice(4)} {msg?.createdAt?.formatedMsgHour}:{msg?.createdAt?.formatedMsgMins}</Text>
                            </Flex>
                        )
                    })
                }
            </Container>
        </>}


        {showRightBar === 'details' && <Container p='0' height='92%' backgroundColor='#f4f4f4' overflowY='scroll'>
            <Flex flexDirection='column' alignItems='center' justifyContent='center' backgroundColor = 'white' p='4' mb='2'>
                <Avatar name={room?.name} size='xl'/>
                <Text fontSize='xl' fontWeight='normal'>{room?.name}</Text>
                <Text>Members Count: {room?.members?.length}</Text>
            </Flex>



            <Box backgroundColor='white' p='4' mb='2'>
                <Flex alignItems='center' mb='2'>
                    <Text>Description</Text>
                    <Spacer/>
                    {(isAdmin || isOwner) && <IconButton icon={editDescription ? <AiFillCloseCircle/> : <BsPencil/>} cursor='pointer' onClick={() => setEditDescription(prevState => !prevState)}/>}
                </Flex>
                {editDescription 
                ? (
                    <Box>
                        <Textarea autoFocus placeholder='Add description here' value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <Button colorScheme='blue' size='sm' mt='2' onClick={handleDescriptionChange}>Save</Button>
                    </Box>
                ) : (
                    <Text>{room?.description ? room.description : 'This room has no description'}</Text>
                )
                }
            </Box>

            {isMemeber && <Box backgroundColor='white' p='4' mb='2'>
                <Flex onClick={handleInviteFriends} gap='4' cursor='pointer' alignItems='center'>
                    <FiUserPlus/>
                    <Text>Invite Friends</Text>
                </Flex>
            </Box>}
            


            <Box backgroundColor='white' p='4' mb='2'>
                <Text mb='4'>{room?.members?.length > 1 ? `${room?.members?.length} members` : `${room?.members?.length} member`} </Text>
                {room?.members?.map(item => {
                    return (
                        <Box key={item.id} mb='4'>
                            <Flex gap='2' w='100%' alignItems='center' mb='4'>
                                <Avatar size='sm' name={item.name}/>
                                <Text>{item.name}</Text>
                                <Spacer/>
                                <Flex gap='4'>
                                    {room?.owner?.id === item.id && <Badge fontWeight='medium' size='sm' colorScheme='green'>Owner</Badge>}
                                    {/* {(isOwner || isAdmin) && <IconButton icon={<AiOutlineDown/>}/>} */}
                                </Flex>
                            </Flex>
                            {/* {actionVisibility && <Button fontWeight='normal'>Make Admin</Button>} */}
                        </Box>
                    )
                })}
            </Box>


            {isMemeber && <Flex backgroundColor='white' p='4' mb='2' flexDirection='column' gap='4'>
                {!isOwner && <Button colorScheme='red' fontWeight='medium' onClick={handleLeaveRoom}>Leave Room</Button>}
                {isOwner  && <Button colorScheme='red' fontWeight='medium' onClick={handleDeleteRoom}>Delete Room</Button>}
                {isOwner  && <Button colorScheme='green' fontWeight='medium' onClick={handleAdminMode}>{room?.isAdminOnly ? 'Disable Admin Mode' : "Activate Admin Mode"}</Button>}
            </Flex>}


        </Container>}
    </Box>
  )
}


