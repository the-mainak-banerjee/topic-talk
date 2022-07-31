import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  InputRightElement,
  Text,
  FormHelperText
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link as ReachLink } from "react-router-dom"
import { useAuth } from "../../contexts";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail)

export const UnAuthenticatedCard = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
      fullName: '',
      email: '',
      password: ''
  })
  const { signUp, loading } = useAuth()

  const isValidName = formData.fullName.trim().length > 2
  const isValidEmail =formData.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

  const isValidPassword = formData.password.length > 6


  const handleSignup = (e) => {
      e.preventDefault()
      signUp(formData.fullName, formData.email, formData.password)
  }

  const handleShowClick = () => setShowPassword(!showPassword);


  return (
    <Flex
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading>Topic-Talk</Heading>
        <Text fontSize='lg' textAlign='center' px='4' w='70%'>Connect And Start Chatting with People With Different Interests</Text>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor= "whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input 
                  type="text" 
                  placeholder="full name" 
                  isInvalid={!isValidName && formData.fullName}
                  errorBorderColor='red.300'
                  onChange={(e) => setFormData(prevState =>({...prevState, fullName:e.target.value}))}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CMdEmail color="gray.300" />}
                  />
                  <Input 
                  type="email" 
                  placeholder="email address" 
                  isInvalid={!isValidEmail && formData.email}
                  errorBorderColor='red.300'
                  onChange={(e) => setFormData(prevState =>({...prevState, email:e.target.value}))}/>
                </InputGroup>
                <FormHelperText>
                  {formData.email && !isValidEmail && <Text color='red.500'>Email is Invalid</Text>}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    isInvalid={!isValidPassword && formData.password }
                    errorBorderColor='red.300'
                    onChange={(e) => setFormData(prevState =>({...prevState, password:e.target.value}))}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>
                  {formData.password && !isValidPassword && <Text color='red.500'>Password Should be more than 6 character</Text>}
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="blue"
                width="full"
                disabled={!isValidPassword || !isValidEmail}
                isLoading={loading}
                loadingText='Signing Up...'
                onClick={handleSignup}
              >
                Signup
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already Have An Account?{" "}
        <Link as={ReachLink} to='/login' color='blue.500' href="#">
          Log In
        </Link>
      </Box>
    </Flex>
  );
};


