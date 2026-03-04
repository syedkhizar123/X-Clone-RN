import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import PostsList from '../../components/PostsList'
import useUserProfile from '../../hooks/useUserProfile'
import dayjs from 'dayjs'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { usePost } from '../../hooks/usePosts'
import useFollow from '../../hooks/useFollow'
import { RefreshControl } from 'react-native'
import { useState } from 'react'
import FollowersModal from '../../components/FollowersModal'



const Username = () => {

    const { username } = useLocalSearchParams()
    const insets = useSafeAreaInsets
    const { currentUser } = useCurrentUser()
    const { userProfile, isLoading, error, refetch, isRefetching } = useUserProfile(username)
    const { posts } = usePost(username)
    const { followUnfollowUser } = useFollow()
    const [isFollowModalVisible, setIsFollowModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [selectedList, setSelectedList] = useState([])


    if (error) {
        return (
            <>
                <Stack.Screen options={{ headerShown: false }} />

                <View className='flex-1 items-center justify-center p-8'>
                    <Text className='text-gray-500 mb-4'> Failed to load {username}'s Profile</Text>
                    <TouchableOpacity className='bg-blue-500 px-4 py-2 rounded-lg' onPress={() => refetch()} >
                        <Text className='text-white font-semibold'> Retry </Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    if (isLoading) {
        return (
            <>
                <Stack.Screen options={{ headerShown: false }} />

                <View className='flex-1 justify-center items-center'>
                    <ActivityIndicator size='large' color='#1DA1F2' />
                </View>
            </>
        )
    }
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView className='flex-1 bg-white'>

                {/* 
                <Text>Profile {username}</Text> */}
                <View className='flex-row items-center justify-between px-4 py-3 border-b border-gray-100 '>
                    <View>
                        <Text className='text-xl font-bold text-gray-900'>
                            {userProfile[0].firstName} {userProfile[0].lastName}
                        </Text>
                        <Text className='text-gray-500 text-sm'>{posts.length} Posts </Text>
                    </View>
                    <TouchableOpacity onPress={() => router.back()} className='self-start rounded-full px-8 mx-3 py-3 border  border-gray-800 '>
                        <Text>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    className='flex-1'
                    contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefetching}
                            onRefresh={() => {
                                refetch()
                            }}
                        />
                    }
                >
                    <Image
                        className='h-48 w-full'
                        resizeMode='cover'
                        source={{ uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" }}
                    />

                    <View className='px-4 pb-4 border-b border-gray-100'>
                        <View className='flex-row justify-between items-end -mt-16 mb-4'>
                            <Image
                                source={{ uri: userProfile[0].profilePicture || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" }}
                                className='size-32 rounded-full border-4 border-white'
                            />
                            {
                                userProfile[0]._id !== currentUser._id && (

                                    userProfile[0].followers.some(user => user._id === currentUser._id) ? (
                                        <TouchableOpacity className='border border-gray-300 px-6 py-2 rounded-full bg-gray-200' onPress={() => { followUnfollowUser(userProfile[0].clerkId) }} >
                                            <Text className='font-semibold text-gray-5=700'>
                                                Unfollow
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View>
                                            <TouchableOpacity className='border border-blue-300 px-6 py-2 rounded-full bg-blue-600' onPress={() => { followUnfollowUser(userProfile[0].clerkId) }} >
                                                <Text className='font-semibold text-white'>
                                                    Follow
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                )
                            }
                        </View>

                        <View className='mb-4'>
                            <View className='flex-row items-center mb-1'>
                                <Text className='text-xl font-bold text-gray-900 mr-1'>
                                    {userProfile[0].firstName} {userProfile[0].lastName}
                                </Text>
                                <Feather name='check-circle' size={20} color='#1DA1F2' />
                            </View>

                            <Text className='text-gray-500 mb-2'>{userProfile[0].username}</Text>
                            <Text className='text-gray-900 mb-3'>{userProfile[0].bio}</Text>

                            <View className='flex-row items-center mb-2'>
                                <Feather name='map-pin' size={16} color='#657786' />
                                <Text className='text-gray-500 ml-2'>{userProfile[0].location}</Text>
                            </View>

                            <View className='flex-row items-center mb-2'>
                                <Feather name='calendar' size={16} color='#657786' />
                                <Text className='text-gray-500 ml-2'>Joined {dayjs(userProfile[0].createdAt).format("DD MMM YYYY")}</Text>
                            </View>

                            <View className='flex-row'>
                                <TouchableOpacity className='mr-6' onPress={() => {

                                    setIsFollowModalVisible(true)
                                    setSelectedList(userProfile[0].following)
                                    setModalTitle("Following")
                                }}>
                                    <Text className='text-gray-900'>
                                        <Text className='font-bold'>{userProfile[0].following.length}</Text>
                                        <Text className='text-gray-500'> Following</Text>
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='mr-6' onPress={() => {
                                    setIsFollowModalVisible(true)
                                    setSelectedList(userProfile[0].followers)
                                    setModalTitle("Followers")
                                }} >
                                    <Text className='text-gray-900'>
                                        <Text className='font-bold'>{userProfile[0].followers.length}</Text>
                                        <Text className='text-gray-500'> Followers</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <PostsList username={username} />
                </ScrollView>

                <FollowersModal
                    isVisible={isFollowModalVisible}
                    onClose={() => setIsFollowModalVisible(false)}
                    title={modalTitle}
                    usersList={selectedList}
                    userProfile={userProfile[0]}
                />
            </SafeAreaView>
        </>
    )
}

export default Username