import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth'
import { useToast } from '@chakra-ui/react'
import { useUser } from "../hooks";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

let autoLogoutTimer;

const AuthContext = createContext()

const AuthContextProider = ( { children }) => {

    const localTocken = localStorage.getItem('TTuserid')

    const [loading,setLoading] = useState(false)
    const [user,setUser] = useState(null)
    const [userTocken,setUserTocken] = useState(localTocken)
    const { createUser } = useUser()
    const navigate = useNavigate()
    const toast = useToast()


    const logOut = async () => {
        await signOut(auth)
        setUserTocken(null)
        localStorage.removeItem('TTuserid')
        navigate('/login', { replace: true})  
        if(autoLogoutTimer){
            clearTimeout(autoLogoutTimer)
        }
    }



    const signUp = async (fullName,email,password) => {
        setLoading(true)

        try{
            const userCredentials = await createUserWithEmailAndPassword(auth,email,password).catch((error) => 
                console.log(error)
            );

            await updateProfile(auth.currentUser, {displayName: fullName})
            setUserTocken(userCredentials.user.accessToken)
            localStorage.setItem('TTuserid', userCredentials.user.accessToken)
            autoLogoutTimer = setTimeout(logOut,3600000)


            createUser(userCredentials.user.uid, {
                userId: userCredentials.user.uid,
                name: fullName,
                email: email,
                rooms:[],
                dateCreated: Date.now()
            })

        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                toast({
                    title: 'Email Already Exists.Please Use A Different Email',
                    status: 'error'
                })
            }else{
                // toast({
                //     title: error.message,
                //     status: 'error'
                // })
                console.log(error)
            }
        }finally{
            setLoading(false)
        }
    }


    const logIn = async (email,password) => {
        setLoading(true)

        try{
            const userCredentials = await signInWithEmailAndPassword(auth,email,password)
            navigate('/', {replace: true})
            setLoading(false)
            setUserTocken(userCredentials.user.accessToken)
            localStorage.setItem('TTuserid', JSON.stringify(userCredentials.user.accessToken))
            autoLogoutTimer = setTimeout(logOut,3600000)

        }catch(error){
            if(error.code === 'auth/user-not-found'){
                toast({
                    title: 'Invalid Login Credenials',
                    status: 'error'
                })
            }else if(error.code === 'auth/wrong-password'){
                toast({
                    title: 'You entered wrong password.',
                    status: 'error'
                })
            }else{
                toast({
                    title: 'An error occured.',
                    status: 'error'
                })
            }
        }finally {
            setLoading(false)
        }
    }


    
    // Get Currently Signedin User

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUser(currentUser);
            }else {
                setUser('')
            }
        });
        return () => {
          unsubscribe();
        };
    },[]);


    return (
        <AuthContext.Provider
            value = {{ loading, signUp, logIn, logOut, user, userTocken}}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { AuthContextProider , useAuth }