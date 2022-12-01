import axios from 'axios'

const Authorization = `Bearer ${process.env.NEXT_PUBLIC_BASE_API_KEY}`
const ContentType = "application/json"
const Accept = "application/json"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": ContentType,
        "Accept": Accept,
        Authorization: Authorization
    },
})

export const fetchCategoriesAxios = async () => api.get('/api/categories')

export const fetchArticlesAxios = async (queryString: string) => api.get(`/api/articles?${queryString}`)

export const fetchUserAxios = async (uid: number) => api.get(`api/users/${uid}?populate=*`)

export const signupUserAxios = async (d: FormData) => api.post(`api/auth/local`, d)

export const signinUserTextAxios = async (d: FormData) => api.post(`api/auth/local/register`, d)

export const signinImageAxios = async (uid: any, d: FormData) => api.put(`api/users/${uid}`, d)

export const writeBlogTextAxios = async (d: any) => api.post(`api/articles?populate=categories&users`, { data: d })

export const blogImageUpdateAxios = async (bid: any, d: string) => api.put(`api/articles/${bid}/?populate=imageurl`, { data: { imageurl: d } })
