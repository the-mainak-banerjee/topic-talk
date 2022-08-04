import { useEffect, useState } from "react"
import { useToast } from "@chakra-ui/react"
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../services/firebase"
import formatDate from '../utils/FormatDate'

export const useMsg = (roomDocId) => {
    const [allMsg, setAllMsg] = useState([])
    const toast = useToast()



    // Crete a new message

    const createMessage = async (messageDocId,data) => {
        try{
            await setDoc(doc(db,'rooms', `${roomDocId}`, 'messages', `${messageDocId}`),data)
        }catch(error){
            toast({
                title: 'Can not Send Message Now. Pleasr try again later.',
                status: 'error'
            })
            console.log(error)
        }
    }


     // Update a message of a room

     const updateMsg = async (messageDocId,data) => {
        try{
            await updateDoc(doc(db,'rooms', `${roomDocId}`, 'messages', `${messageDocId}`), data)
        }catch(error){
            console.log(error)
        }
    }

    


    // Delete a Mesage of a room

    const deleteMessage = async (messageDocId) => {
        try{
            await deleteDoc(doc(db,'rooms',`${roomDocId}` ,'messages', `${messageDocId}`))
            toast({
                title: 'Message deleted successfully',
                status: 'success',
                position: 'bottom-left'
            })
        }catch(error){
            toast({
                title: 'An error occurred. Pleasr try again later.',
                status: 'error',
                position: 'bottom-left'
            })
        }
    }


    //  Get messages from a room

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db,`rooms/${roomDocId}/messages`),orderBy('createdAt', 'asc')) , (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                createdAt: formatDate(doc.data().createdAt)
            }))
            setAllMsg(messages)
        })

        return () => unsub()
    }, [roomDocId])

    return {
        allMsg,
        createMessage,
        deleteMessage,
        updateMsg
    }
}


