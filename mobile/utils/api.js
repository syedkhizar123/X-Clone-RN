import { useAuth } from "@clerk/clerk-expo"
import axios from "axios"

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL

// export const createApiClient = (getToken) => {
//     const api = axios.create({ baseURL: API_BASE_URL })

//     api.interceptors.request.use(async (config) => {
//         const token = await getToken()

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }

//         return config
//     })

//     return api
// }

export const createApiClient = (getToken) => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    },
  });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return api;
};

export const useApiClient = () => {
    const { getToken } = useAuth()
    return createApiClient(getToken)
}

export const userApi = {
    syncUser: (api) => api.post("/users/sync"),
    getCurrentUser: (api) => api.get("/users/me"),
    updateProfile: (api, data) => api.put("/users/profile", data),
    getUserProfile: (api , username) => api.get(`/users/profile/${username}`),
    followUser: (api , targetUserId) => api.post(`/users/follow/${targetUserId}`)
}

export const postApi = {
    createPost: (api, data) => api.post("/posts/create", data),
    getPosts: (api) => api.get("/posts"),
    getUserPosts: (api, username) => api.get(`/posts/user/${username}`),
    getPost: (api, postId) => api.get(`/posts/${postId}`),
    likePost: (api, postId) => api.post(`/posts/${postId}/like`),
    deletePost: (api, postId) => api.delete(`/posts/delete/${postId}`)
}

export const commentApi = {
    createComment: (api, postId, content) => api.post(`/comments/post/${postId}`, { content }),
    deleteComment: (api , commentId) => api.delete(`/comments/${commentId}`)
}