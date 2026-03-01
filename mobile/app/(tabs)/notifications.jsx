import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNotification } from '../../hooks/useNotification'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import NoNotifications from '@/components/NoNotifications'

const NotificationsScreen = () => {

    const { notifications, isLoading, error, refetch, isRefetching, deleteNotification } = useNotification()
    const insets = useSafeAreaInsets()

    if (error) {
        return (
            <View className='flex-1 items-center justify-center p-8'>
                <Text className='text-gray-500 mb-4'> Failed to load Notifications</Text>
                <TouchableOpacity className='bg-blue-500 px-4 py-2 rounded-lg' onPress={() => refetch()} >
                    <Text className='text-white font-semibold'> Retry </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView className='flex-1 bg-white' edges={["top"]}>

            {/* Header */}
            <View className='flex-row items-center justify-between px-4 py-3 border-b border-gray-100'>
                <Text className="text-xl font-bold text-gray-900">Notifications</Text>
                <TouchableOpacity>
                    <Feather name='settings' size={24} color="#657786" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView
                className='flex-1'
                contentContainerStyle={{ paddingBottom: 100 + insets.bottom , flexGrow: 1}}
                showsVerticalScrollIndicator={false}
            >
                {isLoading ? (
                    <View className='flex-1 items-center justify-center p-8'>
                        <ActivityIndicator size='large' color='#1DA1F2' />
                        <Text className='text-gray-500 mt-4'>Loading Notifications... </Text>
                    </View>
                ) : notifications.length === 0 ? (
                   <NoNotifications />
                ) : (
                   <View>
                    <Text>Hello </Text>
                   </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default NotificationsScreen