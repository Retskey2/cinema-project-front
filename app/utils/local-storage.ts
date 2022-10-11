import { json } from "stream/consumers"

export const getStoreLocal = (name: string) => {
    if(typeof localStorage !== 'undefined') {
        const ls = localStorage.getItem(name)
        return ls ? JSON.parse(ls) : null
    }
    return null
}