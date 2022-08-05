import { Avatar, Button, Flex, Text, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { NavBar } from '../../componenets'
import { useRoom } from '../../contexts'

const InvitePage = () => {
    
    const [invitedRoom, setInvitedRoom] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const { allRooms } = useRoom()

    useEffect(() => {
        setInvitedRoom(allRooms.find(item => item.id === params.id))
    }, [allRooms, params])


    const handleJoinAction = () => {
        navigate('/', {state: invitedRoom, replace: true})
    }

  return (
    <>
        <NavBar/>
        <Flex width='80vw' height='85vh' mx='auto' my='-4' backgroundColor='#F8F8F8' boxShadow='md' flexDirection='column' gap='2' alignItems='center' pt='20'>

            {invitedRoom 
                ? (
                    <>
                        <Avatar name={invitedRoom?.name} size='2xl'/>
                        <Text fontSize='2xl' fontWeight='medium'>{invitedRoom?.name}</Text>
                        <Text>Topic-Talk Room Invite</Text>
                        <Button onClick={handleJoinAction} mt='4' colorScheme='green' fontWeight='medium' size='lg'> Join Room </Button>
                        <Image
                            src='../../../assets/homepageimg.png'
                            boxSize='200px'
                            objectFit='cover'
                            mt='2'
                        />
                    </>
                ): (
                    <>
                        <Image
                            src='../../../assets/loading.png'
                            boxSize='200px'
                            objectFit='cover'
                            mt='20'
                        />
                        <Text fontSize='xl' >Loading...</Text>
                    </>
                )
            }
        </Flex>
    </>
  )
}

export default InvitePage