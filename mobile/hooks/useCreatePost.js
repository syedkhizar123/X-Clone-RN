import { View, Text } from 'react-native'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Alert } from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as Linking from "expo-linking"
import { useApiClient } from '../utils/api'
export const useCreatePost = () => {

    const [content, setContent] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const api = useApiClient()
    const queryClient = useQueryClient()

    const createPostMutation = useMutation({
        mutationFn: async (postData) => {
            const formData = new FormData()

            if (postData.content) formData.append("content", postData.content)

            if (postData.imageUri) {
                const uriParts = postData.imageUri.split(".")
                const fileType = uriParts[uriParts.length - 1].toLowerCase()

                const mimeTypeMap = {
                    png: "image/png",
                    gif: "image/gif",
                    webp: "image/webp",
                    jpg: "image/jpg",
                    jpeg: "image/jpeg"
                }

                const mimeType = mimeTypeMap[fileType] || "image/jpeg"

                formData.append("image", {
                    uri: postData.imageUri,
                    name: `image.${fileType}`,
                    type: mimeType
                })
            }

            return api.post("/posts/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        },
        onSuccess: () => {
            setContent("")
            setSelectedImage(null)
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            Alert.alert("Success", "Post Created Successfully")
        },
        onError: (error) => {
            console.log("UPLOAD ERROR:", error.response?.data || error.message)
            Alert.alert("Error", "Failed to create post. Please try again")
        }
    })

    const handleImagePicker = async (useCamera = false) => {
        const permissionResult = useCamera
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.status !== "granted") {
            const source = useCamera ? "camera" : "photo library"
            Alert.alert("Permission Needed", `Please grant permission to access your ${source}`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Open Settings",
                        onPress: () => Linking.openSettings()
                    }
                ])
            return
        }

        const pickerOptions = {
            allowEditing: true,
            aspect: [16, 9],
            quality: 0.8
        }

        const result = useCamera
            ? await ImagePicker.launchCameraAsync()
            : await ImagePicker.launchImageLibraryAsync({
                ...pickerOptions,
                mediaTypes: ["images"]
            })

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri)
        }
    }

    const createPost = () => {
        if (!content.trim() && !selectedImage) {
            Alert.alert("Empty Post", "Please write something or add an image to post!")
            return
        }

        const postData = {
            content: content.trim()
        }

        if (selectedImage) postData.imageUri = selectedImage

        createPostMutation.mutate(postData)
    }

    return {
        content,
        setContent,
        selectedImage,
        isCreating: createPostMutation.isPending,
        pickImageFromGallery: () => handleImagePicker(false),
        takePhoto: () => handleImagePicker(true),
        removeImage: () => setSelectedImage(null),
        createPost

    }

}
