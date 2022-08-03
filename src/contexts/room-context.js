import { useToast } from "@chakra-ui/react"
import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../services/firebase"
import { v4 as uuid} from 'uuid'
import { useAuth } from "./auth-context"

const RoomContext = createContext()

const RoomContextProvider = ({ children }) => {

    const [loading,setLoading] = useState(false)
    const [updating,setUpdating] = useState(false)
    const [allRooms, setAllRooms] = useState([])
    const [userRooms, setUserRooms] = useState([])
    const [suggestedRooms,setSuggestedRooms] = useState([])
    const [selectedMessege,setSelectedMessege] = useState(null)
    const toast = useToast()
    const { user } = useAuth()

    // console.log(allRooms)

    // Create a new room

    const createRooms = async (data) => {
        setLoading(true)

        try{
            await setDoc(doc(db,'rooms', `${uuid()}`),data)
        }catch(error){
            toast({
                title: 'Can not create room. Pleasr try again later.',
                status: 'error'
            })
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    // Update a room
    const updateRoom = async (docRef,data,msg) => {
        setUpdating(true)
        try{
            await updateDoc(doc(db,'rooms', `${docRef}`), data)
            toast({
                title: msg,
                status: 'success',
                position: 'bottom-left'
            })
        }catch(error){
            toast({
                title: 'An error occurred. Pleasr try again later.',
                status: 'error',
                position: 'bottom-left'
            })
        }finally{
            setUpdating(false)
        }
    }


    // Delete A Room
    const deleteRoom = async (docRef) => {
        try{
            await deleteDoc(doc(db,'rooms',`${docRef}`))
            toast({
                title: 'Room deleted successfully',
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



    //  Get all rooms data

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'rooms'), (doc) => {
            const roomArr = []
            doc.forEach(item => {
                roomArr.push({...item.data(), id:item.id})
            })
            setAllRooms(roomArr)
        })

        return () => {
            unsub()
        }
    },[])


    // Set User Rooms

    useEffect(() => {

        const uRooms = allRooms.filter(room => {
            return (
                room?.members?.some(item => item.id === user.uid)
            )
        })
        
        setUserRooms(uRooms)

        const sRooms = allRooms.filter(room => {
            return (
                !room?.members?.some(item => item.id === user.uid)
            )
        })
        setSuggestedRooms(sRooms) 
    },[allRooms,user])


    return(
        <RoomContext.Provider 
         value = {{createRooms,updateRoom, deleteRoom, allRooms, userRooms, suggestedRooms, loading, updating, selectedMessege,setSelectedMessege}}
        >
            { children }
        </RoomContext.Provider>
    )
}

const useRoom = () => useContext(RoomContext)

export { useRoom, RoomContextProvider}