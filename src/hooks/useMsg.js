import { useEffect, useState } from "react"
import { useToast } from "@chakra-ui/react"
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore"
import { db } from "../services/firebase"

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
        }
    }

    //  Get messages from a room

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db,`rooms/${roomDocId}/messages`),orderBy('createdAt', 'asc')) , (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setAllMsg(messages)
        })

        return () => unsub()
    }, [roomDocId])

    return {
        allMsg,
        createMessage,
    }
}


