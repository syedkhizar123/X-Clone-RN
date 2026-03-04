import { View, Text, Modal, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { router } from 'expo-router'

const FollowersModal = ({ isVisible, onClose, usersList, title, userProfile }) => {

    const { currentUser } = useCurrentUser()
    return (
        <Modal visible={isVisible} animationType='slide' presentationStyle='pageSheet'>
            <View className="flex-row items-center justify-between px-4 py-5 border-b border-gray-100">
                {/* <TouchableOpacity onPress={() => console.log(currentUser._id , userProfile._id)}> */}
                <TouchableOpacity onPress={onClose}>
                    <Text className='text-blue-500 text-lg'>
                        Close
                    </Text>
                </TouchableOpacity>
                <Text className='text-lg font-semibold'> {title} </Text>
                <View className='w-12  ' />
            </View>

            {
                usersList && (
                    <ScrollView className='flex-1'>
                        {usersList.map((user) => (
                            <View key={user._id} className='flex-row px-6 py-3 border-b border-gray-100 justify-between ' >
                                <View className='flex-row gap-3 items-center '>
                                    <TouchableOpacity onPress={() => { onClose() , router.push(`/profile/${user.username}`) } }>
                                        <Image source={{ uri: user.profilePicture }} className="size-12 rounded-full" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { onClose() , router.push(`/profile/${user.username}`) } }>
                                        <Text className='font-semibold text-gray-900'>{user.firstName} {user.lastName}</Text>
                                    </TouchableOpacity>
                                </View>
                                

                                {
                                    currentUser.following.includes(user._id)  ? (
                                        currentUser._id === userProfile._id && title === "Following" ? (
                                            null
                                        ) : (
                                            <View className='border border-gray-200 rounded-full px-4 py-2 flex items-center justify-center'>
                                                <Text className='text-base text-gray-900'>Following</Text>
                                            </View>
                                        )
                                    ) : (
                                        user._id !== currentUser._id ?
                                            <TouchableOpacity className='border border-gray-200 rounded-full bg-blue-500 px-6  flex items-center justify-center'>
                                                <Text className='text-base text-white'>Follow</Text>
                                            </TouchableOpacity> :
                                            <View className='border border-gray-200 rounded-full px-6 flex items-center justify-center'>
                                                <Text className='text-base text-gray-900'>You</Text>
                                            </View>
                                    )
                                }
                            </View>
                        ))}

                    </ScrollView>
                )

            }

        </Modal>
    )
}

export default FollowersModal