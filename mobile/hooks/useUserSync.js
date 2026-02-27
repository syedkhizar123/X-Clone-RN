import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useApiClient , userApi } from "../utils/api";

export const useUserSync = () => {
    const { isSignedIn } = useAuth()
    const api = useApiClient()

    const syncUserMutation = useMutation({
        mutationFn: () => userApi.syncUser(api),
        onSuccess: (response) => console.log("User synced successfully" , response.data),
        onError: (error) => console.log("User sync failed" , error)
    })

    useEffect(() => {
        if(isSignedIn && !syncUserMutation.data){
            syncUserMutation.mutateAsync()
        }
    } , [isSignedIn ])

    return null
}