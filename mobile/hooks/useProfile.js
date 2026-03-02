import { useState } from "react"
import { Alert } from "react-native"
import { useMutation, useMutationState , useQueryClient } from "@tanstack/react-query"
// import { useApiClient } from "../utils/api"
import { useApiClient , userApi } from "../utils/api"
import { useCurrentUser } from "./useCurrentUser"

const useProfile = () => {

    const api = useApiClient()
    const queryClient = useQueryClient()

    const [ isEditing , setIsEditing ] = useState(false)
    const [ formData , setFormData ] = useState({
        firstName: "",
        lastName: "",
        bio: "",
        location: ""
    })

    const { currentUser } = useCurrentUser()

    const updateProfileMutation = useMutation({
        mutationFn: (profileData) => userApi.updateProfile(api , profileData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"]})
            setIsEditing(false)
            Alert.alert("Success" , "Profile updated successfully!")
        },
        onError: (error) => {
            Alert.alert("Error" , error.response?.data?.error || "Failed to update profile")
        }
    })

    const openModal = () => {
        if(currentUser) {
            setFormData({
                firstName: currentUser.firstName || "",
                lastName: currentUser.lastName || "",
                bio: currentUser.bio || "",
                location: currentUser.location || ""
            })
        }

        setIsEditing(true)
    }

    const updateFormField = (field , value) => {
        setFormData((prev) => ({ ...prev , [field] : value}))
    }
    
    return {
        isEditing,
        formData,
        openModal,
        closeModal: () => setIsEditing(false),
        saveProfile: () => updateProfileMutation.mutate(formData),
        updateFormField,
        isUpdating: updateProfileMutation.isPending,
        refetch: () => queryClient.invalidateQueries({ queryKey: ["authUser"]})
    }
}

export default useProfile