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