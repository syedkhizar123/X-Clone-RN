import { useState } from "react"
import { useSSO } from "@clerk/clerk-expo"
import { Alert } from "react-native"

export const useSocialAuth = () => {

    const [ isLoading , setIsLaoding ] = useState(false)
    const { startSSOFlow } = useSSO()


    const handleSocialAuth = async (strategy) => {
        setIsLaoding(true)
        try {
            const { createdSessionId , setActive} = await startSSOFlow({ strategy })
            if(createdSessionId && setActive){
                await setActive({ session: createdSessionId})
            }
        } catch (error) {
            console.log("Error in the social auth" , error)
            const provider = startegy === "oauth_google" ? "Google" : "Apple" 
            Alert.alert("Error" , `Failed to sign in with ${provider}`)  
        } finally {
            setIsLaoding(false)
        }
    }

    return { isLoading , handleSocialAuth}

}