import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useApiClient, userApi } from "../utils/api"


const useUserProfile = (username) => {

    const api = useApiClient()
    const queryClient = useQueryClient()

    const { data: userProfile, isLoading, error, refetch, isRefetching } = useQuery({
        queryKey: ["userProfile", username],
        queryFn: async () => {
            const response = await userApi.getUserProfile(api, username)
            return response
        },
        select: (response) => response.data.user
    })

    return {
        userProfile,
        isLoading,
        error,
        refetch,
        isRefetching
    }

}

export default useUserProfile



