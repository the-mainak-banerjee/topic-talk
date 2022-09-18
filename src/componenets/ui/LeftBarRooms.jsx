import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Container, Divider, Flex, IconButton, Input, Spacer, Text, useToast } from '@chakra-ui/react'
import { AiFillPlusCircle, AiFillCloseCircle } from 'react-icons/ai'
import { useAuth, useRoom } from '../../contexts' 
import { serverTimestamp } from 'firebase/firestore'


export const LeftBarRooms = ({ changeRightBar, changeProfileVisibility, setShowLeftBar, setShowMiddleBar }) => {

    const [showForm,setShowForm] = useState(false)
    const [roomName,setRoomName] = useState('')
    const { user } = useAuth() 
    const { createRooms, userRooms, suggestedRooms, loading, changeSelectedMessage } = useRoom()
    const toast = useToast()
    const navigate = useNavigate()
    const location = useLocation()
    const activeRoom = location.state


    const handleRoomCreation = () => {
        createRooms({
            name: roomName,
            description:'',
            members:[{name:user.displayName, id:user.uid, color:'blue'}],
            admins: [],
            owner: {name: user.displayName, id:user.uid},
            createdAt: serverTimestamp(),
            isAdminOnly: false,
            recentMessage: ''
        })
        setShowForm(false)
        setRoomName('')
        toast({
            title: 'Room Created Successfully',
            status: 'success',
            position: 'bottom-left'
        })

    }

    

    // handle View Room
    const viewRoom = (room) => {
        navigate('/', {state: room, replace: true})
        changeRightBar('')
        setShowMiddleBar(true)
        setShowLeftBar(false)
        changeSelectedMessage(null)
    }


    // Truncate String

    const truncateString = (str) => {
        return str.length > 27 ? str.slice(0,27) + '...' : str
    }

    return (
        <>
            <Container p='2' backgroundColor='#F8F8F8' height='8%'>
                <Flex alignItems='center'>
                    <Text cursor='pointer' color='#00A884' _hover={{textDecoration: 'underline'}} onClick={() => changeProfileVisibility(true)}>{user?.displayName}</Text>
                    <Spacer/>
                    <IconButton icon={showForm ? <AiFillCloseCircle/> : <AiFillPlusCircle/>} size='sm' colorScheme={showForm ? 'red' : 'green'} variant='outline' onClick={() => setShowForm(prevState => !prevState)}/>
                </Flex>
            </Container>

            <Divider/>

            <Container 
                p='2' 
                overflowY='scroll' 
                height='92%'
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
                {showForm 
                ? (
                    <Flex flexDirection='column' gap='4'>
                        <Input type='text' placeholder='Write Room Name' value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
                        <Button 
                            colorScheme='green' 
                            fontWeight='normal' 
                            onClick={handleRoomCreation}
                            disabled={!roomName || loading} 
                            isLoading={loading}
                            loadingText='Craeting Room'
                        >
                            Create Room
                        </Button>
                        <Button 
                            colorScheme='red' 
                            fontWeight='normal' 
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </Button>
                    </Flex>
                ) : (
                    <Box>
                        <Text mb='4' fontSize='lg' color='#00A884' fontWeight='medium'>Suggested Rooms</Text>
                        {suggestedRooms?.map (room => {
                                return (
                                    <Flex key={room?.id} gap='2' p='2' mb='2' cursor='pointer' onClick={() => viewRoom(room)} backgroundColor={room?.id === activeRoom?.id ? 'gray.200' : '' } _hover={{backgroundColor: '#f4f4f4'}}>
                                        <Avatar name={room.name} size='sm'/>
                                        <Box w='100%'>
                                            <Flex gap='28' alignItems='center' justifyContent='space-between'>
                                                <Text fontSize='sm' fontWeight='medium'>{room.name}</Text>
                                                <Text fontSize='xs'>{room?.createdAt?.formatedMsgDate?.slice(4)}</Text>
                                            </Flex>
                                            <Text fontSize='xs' pb='2' color='gray'>Owner: {room.owner.name}</Text>
                                            <Divider/>
                                        </Box>
                                    </Flex>
                                )
                            })
                        }
                        
                        <Divider mt='4'/>

                        {userRooms?.length > 0 && <Text my='3' fontSize='lg' color='#00A884' fontWeight='medium'>Your Rooms</Text>}
                        {/* {userRooms?.length === 0 && <Text>Please Join Into A Room</Text>} */}
                        {userRooms?.map(room => {
                                return (
                                    <Flex key={room?.id} gap='2' p='2' mb='2' cursor='pointer' onClick={() => viewRoom(room)} backgroundColor={room?.id === activeRoom?.id ? 'gray.200' : '' } _hover={{backgroundColor: '#f4f4f4'}}>
                                        <Avatar name={room.name} size='sm'/>
                                        <Box w='full'>
                                            <Flex  alignItems='center' justifyContent='space-between'>
                                                <Text fontSize='sm' fontWeight='medium'>{room.name}</Text>
                                                {!room.recentMessage?.content
                                                ? (
                                                    <Text fontSize='xs'  color='gray'>{room?.createdAt?.formatedMsgDate?.slice(4)}</Text>    
                                                ) : (
                                                    <>
                                                        {!isNaN(room.recentMessage?.createdAt?.formatedMsgHour) && <Text fontSize='xs'  color='gray'>{room.recentMessage?.createdAt?.formatedMsgDate?.slice(4)}</Text>}
                                                    </>
                                                )
                                                }
                                            </Flex>
                                            {!room.recentMessage?.content
                                            ? (
                                                <Text fontSize='xs' pb='2'  color='gray'>Owner: {room?.owner?.id === user?.uid ? 'Me' : room.owner.name}</Text>
                                            ) : (
                                                <Text fontSize='xs' pb='2'  color='gray'>{truncateString(room?.recentMessage?.sender?.id === user?.uid ?`Me: ${room?.recentMessage?.content}` :`${room?.recentMessage?.sender?.name}: ${room?.recentMessage?.content}`)}</Text>
                                            )
                                            }
                                            <Divider/>
                                        </Box>
                                    </Flex>
                                )
                            })
                        }
                    </Box>
                )}
            </Container>
        </>
    )
}