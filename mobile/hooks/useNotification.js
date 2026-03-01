import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { useApiClient } from "../utils/api"


export const useNotification = () => {
    const api = useApiClient()
    const queryClient = useQueryClient()

    const { data: notificationsData, isLoading, error, refetch, isRefetching } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            const res = await api.get("/notifications")
            console.log("Notifications API:", res.data)
            return res.data.notifications || res.data || []
        },
        select: (res) => res.data.notifications
    })


    const deleteNotificationMutation = useMutation({
        mutationFn: (notificationId) => api.delete(`/notifications/${notificationId}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] })
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