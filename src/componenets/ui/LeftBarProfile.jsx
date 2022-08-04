import { Box, ButtonGroup, Container, Flex, Button, Input, Text } from '@chakra-ui/react'
import { updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsPencil } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useAuth, useRoom } from '../../contexts'
import { useUser } from '../../hooks'

export const LeftBarProfile = ({ setShowProfile }) => {

    const { user } = useAuth()
    const { userData, updateUser } = useUser(user?.uid) 
    const [showForm, setShowForm] = useState(false)
    const [formData,setFormData] = useState('')
    const navigate = useNavigate()
    const { setSelectedMessege } = useRoom()


    // Name change handler
    const handleNameChange = () => {
        const data = {
            name: formData
        }
        updateUser(data)
        updateProfile(user,{displayName: formData})
        setShowForm(false)
    }

    // Go to the starred message

    const showStarredMessage = (msg) => {
        navigate('/', {state: msg.room})
        setSelectedMessege(msg.id)
    }

  return (
    <Box position='absolute' top='0' width='full' height='full' backgroundColor='white'>
        <Container px='2' pt='10' backgroundColor='#00C884' height='12%' color='white'>
            <Flex gap='4' alignItems='center'>
                <AiOutlineArrowLeft cursor='pointer' onClick={() => setShowProfile(false)}/>
                <Text fontSize='lg' fontWeight='medium'>Profile</Text>
            </Flex>
        </Container>

        <Container backgroundColor='#f8f8f8' height='88%' p='0' overflowY='scroll'>
            <Box backgroundColor='white' pt='2' px='2' pb='4'>
                <Text fontSize='xs' color='#00A884'>Your Name</Text>
                {showForm 
                    ? (
                        <Flex mt='4' flexDirection='column' alignItems='center' gap='4'>
                            <Input type='text' autoFocus  value={formData} onChange={(e)=> setFormData(e.target.value)}/>
                            <ButtonGroup>
                                <Button size='sm' fontWeight='normal' colorScheme='green' onClick={handleNameChange}>Save</Button>
                                <Button size='sm' fontWeight='normal' colorScheme='red' onClick={() => setShowForm(false)}>Cancel</Button>
                            </ButtonGroup>
                        </Flex>
                    ) : (
                        <Flex mt='4' alignItems='center' justifyContent='space-between'>
                            <Text>{userData?.name}</Text>
                            <BsPencil cursor='pointer' onClick={() => setShowForm(true)}/>
                        </Flex>
                    )
                }
            </Box>

            <Box backgroundColor='white' py='2' mt='8'>
                <Text px='2' fontSize='xs' color='#00A884'>Starred Messages</Text>
                {userData?.starredMsgs?.length>0 
                ? (
                    <>
                        {userData?.starredMsgs?.map(item => {
                            return (
                                <Flex key={item.id} flexDirection='column' py='2' px='4' mb='1' borderBottom='1px' borderColor='#f4f4f4' width='full' position='relative' cursor='pointer' _hover={{backgroundColor: 'gray.200'}} onClick={() => showStarredMessage(item)}>
        
                                    <Text fontWeight='medium'>{item.sender.id === user?.uid ? 'Me' : item.sender.name}</Text>
        
                                    <Text>{item.content}</Text>

                                    <Text fontSize='xs' alignSelf='flex-end'>{item?.createdAt?.formatedMsgDate?.slice(4)} {item?.createdAt?.formatedMsgHour}:{item?.createdAt?.formatedMsgMins}</Text>
                                </Flex>
                            )
                        })
        
                        }
                    </>
                ) : (
                    <Text pl='2' mt='4' pb='4'>You have not starred any message yet.</Text>
                )
                }
            </Box>
        </Container>
    </Box>
  )
}

