import { useAuth } from "@clerk/clerk-expo"
import axios from "axios"

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL

export const createApiClient = (getToken) => {
    const api = axios.create({ baseURL: API_BASE_URL})

    api.interceptors.request.use(async (config) => {
        const token = await getToken()

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    })

    return api
}

export const useApiClient = () => {
    const { getToken } = useAuth()
    return createApiClient(getToken)
}

export const userApi = {
    syncUser: (api) => api.post("/users/sync"),
    getCurrentUser: (api) => api.get("/users/me"),
    updateProfile: (api) => api.put("/users/profile" , data)
}