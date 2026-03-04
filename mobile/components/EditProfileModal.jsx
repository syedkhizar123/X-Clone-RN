
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, Image } from 'react-native'

const EditProfileModal = ({ formData, isUpdating, isVisible, onClose, saveProfile, updateFormField }) => {

    const handleSave = () => {
        saveProfile()
        onClose()
    }
    return (
        <Modal visible={isVisible} animationType='slide' presentationStyle='pageSheet'>
            <View className='flex-row items-center justify-between px-4 py-3 border-b border-gray-100'>
                <TouchableOpacity onPress={onClose}>
                    <Text className='text-blue-500 text-lg'>Cancel</Text>
                </TouchableOpacity>

                <Text className='text-lg font-semibold'>Edit Profile</Text>

                <TouchableOpacity
                    onPress={handleSave}
                    disabled={isUpdating}
                    className={`${isUpdating ? "opacity-50" : ""}`}
                >
                    {
                        isUpdating ? (
                            <ActivityIndicator size='small' color='#1DA1F2' />
                        ) : (
                            <Text className='text-blue-500 text-lg font-semibold'>Save</Text>
                        )
                    }
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-4 py-6">
                <View className="space-y-4">
                    <View className='flex-row '>
                        <View>
                            <Text className="text-gray-500 text-sm mb-1"> Profile Image </Text>
                            <Image source={{ uri: formData.profilePicture }} className='size-20 rounded-full mb-4' />
                        </View>
                        <View className='ml-10'>
                            <Text className="text-gray-500 text-sm mb-1 "> Banner Image </Text>
                            <Image source={{ uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" }} resizeMode='stretch' className='h-20 w-40 rounded-md mb-4' />
                        </View>
                    </View>

                    <View>
                        <Text className="text-gray-500 text-sm mb-1">First Name</Text>
                        <TextInput
                            className="border border-gray-200 rounded-lg p-3 text-base mb-4"
                            value={formData.firstName}
                            onChangeText={(text) => updateFormField("firstName", text)}
                            placeholder="Your first name"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-500 text-sm mb-1">Last Name</Text>
                        <TextInput
                            className="border border-gray-200 rounded-lg px-3 py-3 text-base mb-4"
                            value={formData.lastName}
                            onChangeText={(text) => updateFormField("lastName", text)}
                            placeholder="Your last name"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-500 text-sm mb-1">Bio</Text>
                        <TextInput
                            className="border border-gray-200 rounded-lg px-3 py-3 text-base mb-4"
                            value={formData.bio}
                            onChangeText={(text) => updateFormField("bio", text)}
                            placeholder="Tell us about yourself"
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-500 text-sm mb-1">Location</Text>
                        <TextInput
                            className="border border-gray-200 rounded-lg px-3 py-3 text-base mb-4"
                            value={formData.location}
                            onChangeText={(text) => updateFormField("location", text)}
                            placeholder="Where are you located?"
                        />
                    </View>
                </View>
            </ScrollView>
        </Modal>
    )
}

export default EditProfileModal