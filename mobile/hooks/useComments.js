import { useState } from "react"
import { useMutation , useQueryClient } from "@tanstack/react-query"
import { Alert } from "react-native"
import { useApiClient , commentApi } from "../utils/api"

export const useComments = () => {

    const [ commentText , setCommentText ] = useState("")
    const api = useApiClient()
    const queryClient = useQueryClient()

    const createCommentMutation = useMutation({
        mutationFn: async({ postId , content}) => {
            const response = await commentApi.createComment(api , postId , content)
            return response.data
        },
        onSuccess: () => {
            setCommentText("")
            queryClient.invalidateQueries({ queryKey: ["posts"]})
        },
        onError: () => {
            Alert.alert("Error" , "Failed to post comment. Please try again")
        }
    })

    const deleteCommentMutation = useMutation({
        mutationFn: async({commentId}) => {
            const response = await commentApi.deleteComment(api , commentId)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"]})
        },
        onError: () => {
            Alert.alert("Error" , "Failed to delete comment")
        }
    })
    const createComment = (postId) => {
        if(!commentText.trim()){
            Alert.alert("Empty Content" , "Please write something to comment")
            return
        }
        createCommentMutation.mutate({ postId , content: commentText.trim()})
    }

    const deleteComment = (commentId) => {
        deleteCommentMutation.mutate({ commentId })
    }

    return {
        commentText,
        setCommentText,
        createComment,
        isCreatingComment: createCommentMutation.isPending,
        deleteComment
    }

}