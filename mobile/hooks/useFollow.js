import { Alert } from "react-native"
import { useApiClient, userApi} from "../utils/api"
import { useMutation } from "@tanstack/react-query"


const useFollow = () => {
    
    const api = useApiClient()

    const followUnfollowUserMutation = useMutation({
        mutationFn: async (targetUserId) => await userApi.followUser(api , targetUserId),
        onSuccess: () => {
            console.log("Success")
        },
        onError: (err) => {
            Alert.alert("Error" , "Failed to follow user")
            console.log(err)
        }
    })

    const followUnfollowUser = (targetUserId) => {
        followUnfollowUserMutation.mutate(targetUserId)   
    }

    return {
        followUnfollowUser,
        isFollowing: followUnfollowUserMutation.isPending
    }
}

export default useFollow