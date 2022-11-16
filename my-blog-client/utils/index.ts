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