import { Button } from '@chakra-ui/react'
import React from 'react'
import { UnAuthenticatedCard } from '../../componenets/home/UnAuthenticatedCard'
import { useAuth } from '../../contexts/auth-context'

export const Home = () => {
  const { userTocken, logOut } = useAuth()

  const logOutHandler = () => {
    logOut()
  }
  return (
    <>
      {userTocken ? (
        <Button onClick={logOutHandler}>Logout</Button>
      ) : (
       <UnAuthenticatedCard/>
    )}
    </>
  )
}
