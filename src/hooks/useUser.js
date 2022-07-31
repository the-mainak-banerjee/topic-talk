import { useToast } from "@chakra-ui/react"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../services/firebase"

export const useUser = () => {

    const toast = useToast()

    const createUser = async (docRef,data) => {
        try{
            await setDoc(doc(db,'users', `${docRef}`),data)
        }catch(error){
            toast(error)
        }
    }


    return {
        createUser
    }
}