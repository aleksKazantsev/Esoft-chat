import axios from 'axios'

export const API_URL = 'http://localhost:5000/api'

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

api.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

api.interceptors.response.use(config => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        if (originalRequest.url === '/refresh') document.location.replace('/login')
        try {
            const response = await api.patch('/refresh')
            localStorage.setItem('token', response.data.accessToken)
            return api.request(originalRequest)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
    throw error
})

export default api