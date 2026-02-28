import { View, Text, TouchableOpacity } from 'react-native'
import { useSignOut } from "@/hooks/useSignOut"
import { Feather } from '@expo/vector-icons'

export const SignOutButton = () => {

    const { handleSignOut } = useSignOut()
  return (
    <View>
      <TouchableOpacity onPress={() => handleSignOut()}>
        <Feather name='log-out' size={24} color='#cf3838' />
      </TouchableOpacity>
    </View>
  )
}
