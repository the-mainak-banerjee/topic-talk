import { useState } from "react";
import {
  Flex,
  Heading,
  SlideFade,
  Text,
  useDisclosure,
  Image
} from "@chakra-ui/react";
import { Login } from "../ui/auth/Login";
import { Signup } from "../ui/auth/Signup";





export const UnAuthenticatedCard = () => {

  const [showLogin,setShowLogin] = useState(false)
  const { isOpen, onToggle } = useDisclosure()
  
 

  return (
    <Flex
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      gap='2'
      backgroundColor='#f8f8f8'
    >
        <Image
          src='../../../assets/homepageimg.png'
          boxSize='100px'
          objectFit='cover'
        />
        <Heading>Topic-Talk</Heading>
        <Text fontSize='lg' textAlign='center' px='4' mb='4' w={{base:'90%',md:'30%'}}>Connect And Start Chatting with People With Different Interests</Text>
  
          {showLogin
            ?(
                <SlideFade in={isOpen}>
                  <Login
                    setShowLogin={setShowLogin}
                    onToggle={onToggle}
                  />
                </SlideFade>
            ) : (
                <Signup
                  onToggle={onToggle}
                  setShowLogin = {setShowLogin}
                />
            )
          }
       
    </Flex>
  );
};


