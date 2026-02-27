import { Feather } from '@expo/vector-icons';
import { useState } from 'react'
import { View, Text, Alert, TouchableOpacity, ScrollView, Image, Modal } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { TextInput } from 'react-native';

const MessagesScreen = () => {

    const CONVERSATIONS = [
        {
            id: 1,
            user: {
                name: "James Doe",
                username: "jamesdoe",
                avatar:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                verified: false,
            },
            lastMessage: "Thanks for sharing that article! Really helpful insights.",
            time: "2h",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            messages: [
                {
                    id: 1,
                    text: "Hey! Did you see that new article about React Native performance?",
                    fromUser: false,
                    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
                    time: "4h",
                },
                {
                    id: 2,
                    text: "No, I haven't! Could you share the link?",
                    fromUser: true,
                    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
                    time: "4h",
                },
                {
                    id: 3,
                    text: "Thanks for sharing that article! Really helpful insights.",
                    fromUser: true,
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    time: "2h",
                },
            ],
        },
        {
            id: 2,
            user: {
                name: "Coffee Lover",
                username: "coffeelover",
                avatar:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                verified: false,
            },
            lastMessage: "See you at the meetup tomorrow! Don't forget to bring your laptop.",
            time: "2d",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            messages: [
                {
                    id: 1,
                    text: "Are you planning to attend the React meetup this weekend?",
                    fromUser: false,
                    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                    time: "3d",
                },
                {
                    id: 2,
                    text: "Yes! I've been looking forward to it. Should be great networking.",
                    fromUser: true,
                    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                    time: "3d",
                },
                {
                    id: 3,
                    text: "See you at the meetup tomorrow! Don't forget to bring your laptop.",
                    fromUser: false,
                    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                    time: "2d",
                },
            ],
        },
        {
            id: 3,
            user: {
                name: "Alex Johnson",
                username: "alexj",
                avatar:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                verified: false,
            },
            lastMessage: "Great collaboration on the project. The demo was impressive!",
            time: "3d",
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            messages: [
                {
                    id: 1,
                    text: "How's the progress on the mobile app project?",
                    fromUser: false,
                    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                    time: "4d",
                },
                {
                    id: 2,
                    text: "Going really well! Just finished the authentication flow. Want to see a demo?",
                    fromUser: true,
                    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                    time: "4d",
                },
                {
                    id: 3,
                    text: "Great collaboration on the project. The demo was impressive!",
                    fromUser: false,
                    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                    time: "3d",
                },
            ],
        },
        {
            id: 4,
            user: {
                name: "Design Studio",
                username: "designstudio",
                avatar:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                verified: true,
            },
            lastMessage: "The new designs look fantastic. When can we schedule a review?",
            time: "1w",
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            messages: [
                {
                    id: 1,
                    text: "We've finished the initial mockups for your app. They're ready for review!",
                    fromUser: false,
                    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                    time: "1w",
                },
                {
                    id: 2,
                    text: "Awesome! Can't wait to see them. The timeline works perfectly.",
                    fromUser: true,
                    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                    time: "1w",
                },
                {
                    id: 3,
                    text: "The new designs look fantastic. When can we schedule a review?",
                    fromUser: false,
                    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    time: "1w",
                },
                 {
                    id: 4,
                    text: "We've finished the initial mockups for your app. They're ready for review!",
                    fromUser: false,
                    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                    time: "1w",
                },
                {
                    id: 5,
                    text: "Awesome! Can't wait to see them. The timeline works perfectly.",
                    fromUser: true,
                    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                    time: "1w",
                },
                {
                    id: 6,
                    text: "The new designs look fantastic. When can we schedule a review?",
                    fromUser: false,
                    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    time: "1w",
                },
                 {
                    id: 7,
                    text: "We've finished the initial mockups for your app. They're ready for review!",
                    fromUser: false,
                    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                    time: "1w",
                },
                {
                    id: 8,
                    text: "Awesome! Can't wait to see them. The timeline works perfectly.",
                    fromUser: true,
                    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                    time: "1w",
                },
                {
                    id: 9,
                    text: "The new designs look fantastic. When can we schedule a review?",
                    fromUser: false,
                    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    time: "1w",
                },
            ],
        },
    ];

    const insets = useSafeAreaInsets()
    const [searchText, setSearchText] = useState("")
    const [conversationsList, setConversationsList] = useState(CONVERSATIONS)
    const [selectedConv, setSelectedConv] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [newMessage, setNewMessage] = useState("")

    const deleteConvo = (convoId) => {
        Alert.alert("Delete Conversation", "Are you sure you want to delete this conversation?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    setConversationsList((prev) => prev.filter((conv) => conv.id !== convoId))
                }
            }
        ])
    }

    const openConversation = (conversation) => {
        setSelectedConv(conversation)
        setIsChatOpen(true)
    }

    const closeConversation = () => {
        setSelectedConv(null)
        setIsChatOpen(false)
        setNewMessage("")
    }

    const sendMessage = () => {
        if (newMessage.trim() && selectedConv) {
            setConversationsList((prev) => prev.map((conv) =>
                conv.id === selectedConv.id ? { ...conv, lastMessage: newMessage, time: "now" }
                    : conv
            ))
        }
        setNewMessage("")
        Alert.alert("Message Sent!", `Your message has been sent to ${selectedConv.user.name}`)
    }
    return (
        <SafeAreaView className='flex-1 bg-white ' edges={["top"]}>

            {/* Header */}
            <View className='flex-row items-center justify-between px-4 py-3 border-b border-b-gray-100'>
                <Text className='text-xl font-bold text-gray-900'>Messages</Text>
                <TouchableOpacity>
                    <Feather name='edit' size={24} color='#1DA1F2' />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className='px-4 py-3 border-b border-gray-100'>
                <View className='flex-row items-center bg-gray-100 rounded-full px-4 py-3'>
                    <Feather name='search' size={20} color='#657786' />
                    <TextInput
                        placeholder='Search for people and groups'
                        className='flex-1 ml-3 text-base'
                        placeholderTextColor='#657786'
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
            </View>

            {/* Conversations List */}
            <ScrollView
                className='flex-1 '
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
            >
                {conversationsList.map((conversation) => (
                    <TouchableOpacity
                        key={conversation.id}
                        className='flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50'
                        onPress={() => openConversation(conversation)}
                        onLongPress={() => deleteConvo(conversation.id)}
                    >
                        <Image source={{ uri: conversation.user.avatar }} className='size-12 rounded-full mr-3' />
                        <View className='flex-1 '>
                            <View className='flex-row items-center justify-between mb-1'>
                                <View className='flex-row items-center gap-1'>
                                    <Text className='font-semibold text-gray-900'>{conversation.user.name}</Text>
                                    {conversation.user.verified && (
                                        <Feather name='check-circle' size={16} color='#1DA1F2' />
                                    )}
                                    <Text className='text-gray-500 text-sm '>@{conversation.user.username}</Text>
                                </View>
                                <Text className='text-gray-500 text-sm '>{conversation.time}</Text>
                            </View>
                            <Text className='text-gray-500 text-sm ' numberOfLines={1}>{conversation.lastMessage}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Quick Actions */}
            <View className='px-4 py-2 border-t border-gray-100 bg-gray-50'>
                <Text className='text=xs text-gray-500 text-center'>
                    Tap to open . Long press to delete
                </Text>
            </View>

            <Modal visible={isChatOpen} animationType='slide' presentationStyle='pageSheet'>
                {
                    selectedConv && (
                        
                        <SafeAreaView className='flex-1'>
                            {/* Chat Header */}
                            <View className='flex-row items-center px-4 py-3 border-b border-gray-100'>
                                <TouchableOpacity onPress={closeConversation} className='mr-3'>
                                    <Feather name='arrow-left' size={24} color='#1DA1F2' />
                                </TouchableOpacity>
                                <Image
                                    source={{ uri: selectedConv.user.avatar }}
                                    className='size-10 rounded-full mr-3'
                                />
                                <View className='flex-1'>
                                    <View className='flex-row items-center'>
                                        <Text className='font-semibold text-gray-900 mr-1'>
                                            {selectedConv.user.name}
                                        </Text>
                                        {selectedConv.user.verified && (
                                            <Feather name='check-circle' size={16} color='#1DA1F2' />
                                        )}
                                    </View>
                                    <Text className='text-gray-500 text-sm'>
                                        @{selectedConv.user.username}
                                    </Text>
                                </View>
                            </View>

                            {/* Messages Area */}
                            <ScrollView className='flex-1 px-4 py-4'>
                                <View className='mb-4'>
                                    <Text className='text-center text-gray-400 text-sm mb-4'>
                                        This is the beginning of your conversation with {selectedConv.user.name}
                                    </Text>

                                    {/* Messages */}
                                    {selectedConv.messages.map((message) => (
                                        <View key={message.id} className={`flex-row mb-3 ${message.fromUser ? 'justify-end' : ''}`}>
                                            {!message.fromUser && (
                                                <Image source={{ uri: selectedConv.user.avatar }} className='size-8 rounded-full mr-2' />
                                            )}
                                            <View className={`flex-1 ${message.fromUser ? 'items-end' : ''} `}>
                                                <View className={`rounded-2xl px-4 py-3 max-w-xs ${message.fromUser ? "bg-blue-500" : "bg-gray-100"}`}>
                                                    <Text className={message.fromUser ? "text-white" : "text-gray-900"}>
                                                        {message.text}
                                                    </Text>
                                                </View>
                                                <Text className='text-xs text-gray-400 mt-1'>{message.time}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>

                            {/* Message Input */}
                            <View className='flex-row items-center px-4 py-3 border-t border-gray-100'>
                                <View className='flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-3 mr-3'>
                                    <TextInput
                                        className='flex-1 text-base pb-2'
                                        placeholder='Start a message'
                                        placeholderTextColor='#657786'
                                        value={newMessage}
                                        onChangeText={setNewMessage}
                                        multiline
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={sendMessage}
                                    className={`size-10 rounded-full items-center justify-center ${newMessage.trim() ? "bg-blue-500" : "bg-gray-300"}`}
                                    disabled={!newMessage.trim()}
                                >
                                    <Feather name='send' size={20} color='white' />
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    )
                }
            </Modal>
        </SafeAreaView>
    )
}

export default MessagesScreen