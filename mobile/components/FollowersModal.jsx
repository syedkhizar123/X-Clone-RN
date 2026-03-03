import { View, Text, Modal, ScrollView, Image , TouchableOpacity } from 'react-native'

const FollowersModal = ({ isVisible, onClose, user, title }) => {
    return (
        <Modal visible={isVisible} animationType='slide' presentationStyle='pageSheet'>
            <View className="flex-row items-center justify-between px-4 py-5 border-b border-gray-100">
                <TouchableOpacity onPress={onClose}>
                    <Text className='text-blue-500 text-lg'>
                        Close
                    </Text>
                </TouchableOpacity>
                <Text className='text-lg font-semibold'> {title} </Text>
                <View className='w-12  ' />
            </View>

            {
                user && (
                    <ScrollView className='flex-1'>
                        {user.map((user) => (
                            <View key={user._id} className='flex-row px-6 py-3 border-b border-gray-100 justify-between' >
                                <View className='flex-row gap-5'>
                                    <Image source={{ uri: user.profilePicture }} className="size-12 rounded-full" />
                                    <Text className='font-semibold text-gray-900'>{user.firstName} {user.lastName}</Text>
                                </View>
                            </View>
                        ))}

                    </ScrollView>
                )

            }

        </Modal>
    )
}

export default FollowersModal