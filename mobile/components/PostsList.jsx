import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { usePost } from '../hooks/usePosts'
import PostCard from './PostCard'
import { useState } from 'react'
import CommentsModal from './CommentsModal'

const PostsList = () => {

    const { currentUser } = useCurrentUser()
    const { posts, isLoading, error, refetch, toggleLike, deletePost , checkIsLiked} = usePost();
    const [ selectedPostId , setSelectedPostId] = useState(null)

    const selectedPost = selectedPostId ? posts.find((post) => post._id === selectedPostId) : null


    if (isLoading) {
        return (
            <View className='p-8 items-center flex-col gap-2'>
                <ActivityIndicator size='large' color="#1DA1F2" />
                <Text text-gray-500 mt-2>Loading Posts... </Text>
            </View>
        )
    }

    if (error) {
        return (
            <View className='p-8 items-center'>
                <Text className='text-gray-500 mb-4'>Failed to load posts</Text>
                <TouchableOpacity className='bg-blue-500 px-4 py-2 rounded-lg' onPress={() => refetch()}>
                    <Text className='text-white font-semibold'>Retry</Text>
                </TouchableOpacity>
            </View>
        )
    }
    if (posts.length === 0 ) {
        return (
            <View className='p-8 items-center'>
                <Text className='text-gray-500'>No posts yet</Text>
            </View>
        )
    }
    return (
       <>
        {posts.map((post) => (
            <PostCard 
                key={post._id}
                post={post}
                onLike={toggleLike}
                onDelete={deletePost}
                onComment={(post) => setSelectedPostId(post._id)}
                currentUser={currentUser}
                isLiked={checkIsLiked(post.likes ,  currentUser)}
            />
        ))}

        <CommentsModal selectedPost={selectedPost} onClose={() => setSelectedPostId(null)} />
       </>
    )
}

export default PostsList