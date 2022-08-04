import { Flex, Text, Image, Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../componenets'

const FourOFour = () => {

    const navigate = useNavigate()

    const clickHandler = () => {
        navigate('/', {replace: true})
    }
    

  return (
    <>
        <NavBar/>
        <Flex width='80vw' height='85vh' mx='auto' my='-4' backgroundColor='#F8F8F8' boxShadow='md' flexDirection='column' gap='2' alignItems='center' pt='20'>

        <Image
            src='../../../assets/fourOfour.png'
            boxSize='200px'
            objectFit='cover'
            mt='20'
        />
            <Text fontSize='xl'>Oops!! You Searched For A Wrong URL...</Text>
            <Button colorScheme='green' fontWeight='normal' onClick={clickHandler}>Back To Home</Button>
        </Flex>
    </>
  )
}

export default FourOFour
