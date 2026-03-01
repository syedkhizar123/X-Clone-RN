import { Feather } from '@expo/vector-icons';
import { View, Text, Alert, Image } from 'react-native'

const NotificationCard = ({ notification, onDelete }) => {

    const getNotificationText = () => {
        const name = `${notification.from.firstName} ${notification.from.lastName}`
        switch (notification.type) {
            case "like":
                return `${name} liked your post.`
            case "comment":
                return `${name} commented on your post.`
            case "follow":
                return `${name} started following you.`
            default:
                return ""
        }
    }

    const getNotificationIcon = () => {
        switch (notification.type) {
            case "like":
                return <Feather name='heart' size={20} color='#E0245E' />
            case "comment":
                return <Feather name='message-circle' size={20} color='#1DA1F2' />
            case "follow":
                return <Feather name='user-plus' size={20} color='#17BF63' />
            default:
                return <Feather name='bell' size={20} color='#657786' />
        }
    }

    const handleDelete = () => {
        Alert.alert("Delete Notification" , "Are you sure you want to delete this notification?" , 
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style:"destructive",
                    onPress: () => onDelete(notification._id)
                }
            ]
        )
    }
    return (
        <View className='border-b border-gray-100 bg-white'>
            <View className='flex-row p-4'>
                <View className='relative mr-3'>
                    <Image source={{ uri: notification.from.profilePicture}} className='size-12 rounded-full'/>
                    <View className='absolute -bottom-1 -right-1 size-6 bg-white items-center justify-center'>
                        {getNotificationIcon()}
                    </View>
                </View>

            </View>
        </View>
    )
}

export default NotificationCard