import { useToast } from "@chakra-ui/react"
import { doc,  onSnapshot,  setDoc, updateDoc, } from "firebase/firestore"
import {  useEffect, useState } from "react"
// import { useRoom } from "../contexts"
import { db } from "../services/firebase"
// import formatDate from "../utils/FormatDate"


export const useUser = (userId) => {

    const toast = useToast()

    const [userData, setUserData] = useState()
    // const [userMessages,setUserMessages] = useState(null)
    // const  allRooms  = useRoom()


    // Create a new user doc
    const createUser = async (docRef,data) => {
        try{
            await setDoc(doc(db,'users', `${docRef}`),data)
        }catch(error){
            toast(error)
        }
    }

    // Update a single user

    const updateUser = async (data) => {
        try{
            await updateDoc(doc(db,'users', `${userId}`), data)
        }catch(error){
            console.log(error)
        }
    }


    // Get Currently signed in user data

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'users', `${userId}`), (doc) => {
            
            setUserData(doc.data())
            
            // const userArr = []
            // doc.forEach(item => {
            //     userArr.push({...item.data(), 
            //         id:item.id, 
            //         dateCreated: formatDate(item.data().createdAt),
            //     })
            // })
            // setUserData(userArr)
        })

        return () => {
            unsub()
        }
    },[userId])


    // Get User Messages
    // useEffect(() => {
    //     let unsub;
    //     for(let i=0; i<allRooms?.length ; i++) {
    //         unsub = onSnapshot(query(collection(db,`rooms/${allRooms[i].id}/messages`),where('sender.id', '==', 'userId') , (querySnapshot) => {
    //            const messages = querySnapshot.docs.map((doc) => ({
    //                ...doc.data(),
    //                id: doc.id,
    //                createdAt: formatDate(doc.data().createdAt)
    //            }))
    //            setUserMessages(messages)
    //        }))
    //     }

    //     // return () => unsub()
    // }, [allRooms,userId])

    return {
        createUser,
        updateUser,
        userData
    }
}