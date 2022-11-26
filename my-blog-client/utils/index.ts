import axios from "axios"
import { serialize } from "next-mdx-remote/serialize"
import { IArticle } from "../types"

export const formatDate = (dateString: string) => {
    const date = new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return date
}

export const makeCategory = (slug: string): string => {
    if(typeof slug === 'string'){
        return slug.split('-').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')
    }

    return ''
}

export const debounce = (fn: (query: string) => void, timeout = 1000) => {
    let timer: NodeJS.Timeout

    const debounced = (...args: any) => {
        clearTimeout(timer)
        
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, timeout)
    }

    return debounced
}

export const serializeMarkdown = async (item: IArticle) => {
    const body = await serialize(item.attributes.Body as string)

    return {
        ...item,
        attributes: {
            ...item.attributes,
            Body: body
        }
    }
}

export const fetchUserFromJWTToken = async (jwt: string) => {
    const jwtObj = JSON.parse(atob(jwt.split('.')[1]))
    const { data } = await axios.get(`http://localhost:1337/api/users/${jwtObj.id}?populate=*`)
    const { avatarurl, email, username, id, about, articles } = data
    return { avatarurl, email, username, id, about, articles }
}

export const isJWTIsValid = () => {
    const jwt = localStorage.getItem('jwt')
    
    try {
        const jwtObj = JSON.parse(atob(jwt?.split('.')[1]))
        if(typeof jwtObj.id === "number"){
            return true
        } else {
            localStorage.removeItem('jwt')
            return false
        }
    } catch (e) {
        localStorage.removeItem('jwt')
        return false
    }
}

export const checkEmail = (email: string) => {
    const e = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    return e.test(email)
}

export const checkText = (str: string, min: number, max: number) => {
    return str.length >= min && str.length <= max
}