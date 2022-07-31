import { Avatar, Box, Button, Container, Divider, Flex, IconButton, Input, Spacer, Text, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillPlusCircle, AiFillCloseCircle } from 'react-icons/ai'
import { useAuth, useRoom } from '../../contexts' 


export const LeftBar = () => {

    const [showForm,setShowForm] = useState(false)
    const [roomName,setRoomName] = useState('')
    const { user } = useAuth() 
    const { createRooms, userRooms, suggestedRooms, loading } = useRoom()
    const toast = useToast()


    const handleRoomCreation = () => {
        createRooms({
            name: roomName,
            members:[user.uid],
            admins: [],
            owner: user.displayName,
            createdAt: new Date()
        })
        setShowForm(false)
        toast({
            title: 'Room Created Successfully',
            status: 'success'
        })
    }



    return (
        <Box width='30%' height='full' backgroundColor='white' position='relative'>
            <Container p='2' backgroundColor='#F8F8F8' height='8%'>
                <Flex alignItems='center'>
                    <Text>Mainak</Text>
                    <Spacer/>
                    <IconButton icon={showForm ? <AiFillCloseCircle/> : <AiFillPlusCircle/>} size='sm' colorScheme={showForm ? 'red' : 'green'} onClick={() => setShowForm(prevState => !prevState)}/>
                </Flex>
            </Container>

            <Divider/>

            <Container p='2' overflowY='scroll' height='92%'>
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
                    </Flex>
                ) : (
                    <Box>
                        <Text mb='4' fontSize='lg' color='#00A884' fontWeight='medium'>Suggested Rooms</Text>
                        {suggestedRooms?.map (room => {
                                return (
                                    <Flex gap='2' mb='2' key={room.id} >
                                        <Avatar name={room.name} size='sm'/>
                                        <Box w='100%'>
                                            <Flex gap='28' alignItems='center' justifyContent='space-between'>
                                                <Text fontSize='sm'>{room.name}</Text>
                                                {/* <Text fontSize='xs'>{room.createdAt?.toLocaleDateString()}</Text> */}
                                            </Flex>
                                            <Text fontSize='xs' pb='2'>Owner: {room.owner}</Text>
                                            <Divider/>
                                        </Box>
                                    </Flex>
                                )
                            })
                        }
                        
                        <Divider mt='4'/>

                        <Text my='3' fontSize='lg' color='#00A884' fontWeight='medium'>Your Rooms</Text>
                        {userRooms?.length === 0 && <Text>Please Join Into A Room</Text>}
                        {userRooms?.map(room => {
                                return (
                                    <Flex gap='2' mb='2' key={room.id}>
                                        <Avatar name={room.name} size='sm'/>
                                        <Box w='full'>
                                            <Flex  alignItems='center' justifyContent='space-between'>
                                                <Text fontSize='sm'>{room.name}</Text>
                                                <Text fontSize='xs'>31/07/2022</Text>
                                            </Flex>
                                            <Text fontSize='xs' pb='2'>Last Message Goes Here</Text>
                                            <Divider/>
                                        </Box>
                                    </Flex>
                                )
                            })
                        }
                    </Box>
                )}
            </Container>
        </Box>
    )
}