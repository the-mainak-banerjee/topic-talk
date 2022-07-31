import React from 'react'
import { UnAuthenticatedCard, AuthenticatedUi } from '../../componenets'
import { useAuth } from '../../contexts'


export const Home = () => {
  
  const { userTocken } = useAuth()

  return (
    <>
      {userTocken ? (
        <AuthenticatedUi/>
      ) : (
       <UnAuthenticatedCard/>
    )}
    </>
  )
}
