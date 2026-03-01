import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { useApiClient } from "../utils/api"


export const useNotification = () => {
    const api = useApiClient()
    const queryClient = useQueryClient()

    const { data: notificationsData, isLoading, error, refetch, isRefetching } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => api.get("/notifications"),
        select: (res) => res.data.notifications
    })


    // const deleteNotificationMutation = useMutation({
    //     mutationFn: (notificationId) => api.delete(`/notifications/${notificationId}`),
    //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] })
    // })
    const deleteNotificationMutation = useMutation({
        mutationFn: async (notificationId) => {
            console.log("Deleting:", notificationId)
            const res = await api.delete(`/notifications/${notificationId}`)
            console.log("Delete response:", res.data)
            return res.data
        },
        onSuccess: () => {
            console.log("Invalidating notifications")
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
        },
        onError: (err) => {
            console.log("DELETE ERROR:", err.response?.data || err.message)
        }
    })

    const deleteNotification = (notificationId) => {
        deleteNotificationMutation.mutate(notificationId)
    }

    return {
        notifications: notificationsData || [],
        isLoading,
        error,
        refetch,
        isRefetching,
        deleteNotification,
        isDeletingNotification: deleteNotificationMutation.isPending
    }
}