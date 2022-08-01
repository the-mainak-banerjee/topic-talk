import { useToast } from "@chakra-ui/react"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../services/firebase"

export const useUser = () => {

    const toast = useToast()

    // Create a new user doc
    const createUser = async (docRef,data) => {
        try{
            await setDoc(doc(db,'users', `${docRef}`),data)
        }catch(error){
            toast(error)
        }
    }

    // Update a single user

    // const updateUser = async (docRef,data) => {
    //     try{
    //         await updateDoc(doc(db,'rooms', `${docRef}`), data)
    //     }catch(error){
    //         console.log(error)
    //     }
    // }


    return {
        createUser,
    }
}